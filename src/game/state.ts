import Dexie, { type Table } from 'dexie';
import { createMachine, createActor } from 'xstate';
import { z } from 'zod';
import { adaptiveStages } from './stages';

export interface Metrics { left:number;right:number;opposed:number;actions:number;early:number;inspections:number;hints:number;repeated:number;waits:number;color:number;sound:number;inventory:number;lastAction:string; }
export interface Progress {step:number;completed:boolean;inspected:number[];secret:boolean;sequence:number[];itemsTaken:string[];seed:number;variant:string;waitAt:number|null;balance:number[];}
export interface SaveData {version:1;stage:number;position:{x:number;y:number};progress:Record<number,Progress>;inventory:string[];evidence:{stage:number;step:number;text:string}[];logs:number[];metrics:Metrics;playTime:number;endings:number[];savedAt:number;}
export interface Settings {sound:boolean;music:boolean;contrast:boolean;reduced:boolean;largeText:boolean;slow:boolean;showHotspots:boolean;language:'ko'|'en';}
const SAVE_KEY='deceptive-guide-save-v1';
const settingsKey='deceptive-guide-settings-v1';
class GameDB extends Dexie { saves!:Table<{id:string;data:SaveData}>; constructor(){super('DeceptiveGuide');this.version(1).stores({saves:'id'});} }
const db=new GameDB();
export const initialMetrics:Metrics={left:0,right:0,opposed:0,actions:0,early:0,inspections:0,hints:0,repeated:0,waits:0,color:0,sound:0,inventory:0,lastAction:''};
export function director(stage:number,metrics:Metrics):{seed:number;variant:string}{
 const seed=((stage*73856093)^(metrics.actions*19349663)^(metrics.inspections*83492791))>>>0;
 const variant=!adaptiveStages.includes(stage)?'original':metrics.early>metrics.waits+2?'impatient':metrics.inspections<metrics.actions/2?'overlooked':metrics.left>=metrics.right?'left-bait':'right-bait';
 return {seed,variant};
}
export function newProgress(stage:number,metrics:Metrics):Progress{return {step:0,completed:false,inspected:[],secret:false,sequence:[],itemsTaken:[],...director(stage,metrics),waitAt:null,balance:[]};}
export function newGame():SaveData{return {version:1,stage:1,position:{x:42,y:86},progress:{1:newProgress(1,initialMetrics)},inventory:['정비 공구','정비 수첩','황동 조각'],evidence:[],logs:[],metrics:{...initialMetrics},playTime:0,endings:[],savedAt:Date.now()};}
const progressSchema=z.object({step:z.number().int().min(0).max(5),completed:z.boolean(),inspected:z.array(z.number()),secret:z.boolean(),sequence:z.array(z.number()),itemsTaken:z.array(z.string()),seed:z.number(),variant:z.string(),waitAt:z.number().nullable(),balance:z.array(z.number())});
const saveSchema=z.object({version:z.literal(1),stage:z.number().int().min(1).max(50),position:z.object({x:z.number(),y:z.number()}),progress:z.record(z.string(),progressSchema),inventory:z.array(z.string()),evidence:z.array(z.object({stage:z.number(),step:z.number(),text:z.string()})),logs:z.array(z.number()),metrics:z.object({left:z.number(),right:z.number(),opposed:z.number(),actions:z.number(),early:z.number(),inspections:z.number(),hints:z.number(),repeated:z.number(),waits:z.number(),color:z.number(),sound:z.number(),inventory:z.number(),lastAction:z.string()}),playTime:z.number(),endings:z.array(z.number()),savedAt:z.number()});
export function loadGame():SaveData{try{const raw=localStorage.getItem(SAVE_KEY);if(raw){const result=saveSchema.safeParse(JSON.parse(raw));if(result.success&&result.data.progress[result.data.stage])return result.data as SaveData;}}catch{}return newGame();}
export async function persistGame(data:SaveData){const record={...data,savedAt:Date.now()};let localSaved=false;try{localStorage.setItem(SAVE_KEY,JSON.stringify(record));localSaved=true;}catch{}try{await db.saves.put({id:'autosave',data:record});return true;}catch{return localSaved;}}
export async function restoreBackup():Promise<SaveData|null>{try{const stored=await db.saves.get('autosave');if(!stored)return null;const parsed=saveSchema.safeParse(stored.data);return parsed.success?parsed.data as SaveData:null;}catch{return null;}}
export function loadSettings():Settings{const base:Settings={sound:true,music:false,contrast:false,reduced:false,largeText:false,slow:false,showHotspots:false,language:'ko'};try{return {...base,...JSON.parse(localStorage.getItem(settingsKey)||'{}')};}catch{return base;}}
export function saveSettings(settings:Settings){try{localStorage.setItem(settingsKey,JSON.stringify(settings));}catch{}}
export function formatTime(seconds:number){return `${String(Math.floor(seconds/3600)).padStart(2,'0')}:${String(Math.floor(seconds%3600/60)).padStart(2,'0')}`;}
export const characterMachine=createMachine({id:'pin',initial:'idle',states:{idle:{on:{WALK:'walking',INSPECT:'inspecting',FAIL:'confused',SUCCESS:'victory'}},walking:{on:{STOP:'idle',INSPECT:'inspecting',FAIL:'confused',SUCCESS:'victory'},after:{1100:'idle'}},inspecting:{on:{WALK:'walking',FAIL:'confused',SUCCESS:'victory'},after:{1800:'idle'}},confused:{on:{WALK:'walking',SUCCESS:'victory'},after:{1400:'idle'}},victory:{on:{WALK:'walking'},after:{2000:'idle'}}}});
export const pinActor=createActor(characterMachine).start();
let audio:AudioContext|null=null;
export function playTone(type:'click'|'success'|'fail'|'step',enabled:boolean){if(!enabled)return;try{audio??=new AudioContext();if(audio.state==='suspended')void audio.resume();const tones=type==='success'?[440,554,660]:type==='fail'?[180,130]:type==='step'?[240]:[620];tones.forEach((f,index)=>{const o=audio!.createOscillator(),g=audio!.createGain(),at=audio!.currentTime+index*.10;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.035,at);g.gain.exponentialRampToValueAtTime(.001,at+.16);o.connect(g);g.connect(audio!.destination);o.start(at);o.stop(at+.18);});}catch{}}
export function startAmbience(){try{audio??=new AudioContext();void audio.resume();const oscillators=[65.41,98,130.81].map((frequency,index)=>{const o=audio!.createOscillator();const g=audio!.createGain();o.type='sine';o.frequency.value=frequency;g.gain.value=.012/(index+1);o.connect(g);g.connect(audio!.destination);o.start();return o;});return ()=>oscillators.forEach(o=>o.stop());}catch{return ()=>{};}}
