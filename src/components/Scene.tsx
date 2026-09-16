import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, Check, ChevronRight, Circle, DoorOpen, Eye, Footprints, Hand, Lightbulb, LockKeyhole, MapPin, MousePointer2, RotateCcw, Triangle, Waves, Wrench, X } from 'lucide-react';
import { Pin, Tuto, ItemArt } from './Characters';
import { type Game } from '../game/useGame';
import { type Settings } from '../game/state';
import { playBlip, playGlitchShock } from '../game/audio';
import { uiTranslations, localizeOption, localizeDialogue } from '../game/i18n';
import './scene-props.css';

const Ambient=lazy(()=>import('./Ambient'));
class AmbientFallback extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?null:this.props.children;}}

export function Scene({game:g,settings,onHints,onToggleHotspots}:{game:Game;settings:Settings;onHints:()=>void;onToggleHotspots:()=>void}){
 const [tick,setTick]=useState(Date.now());
 const [showClue,setShowClue]=useState(false);
 const [facing,setFacing]=useState(false);
 const [oldX,setOldX]=useState(g.data.position.x);
 const [screenFx,setScreenFx]=useState<'shake'|'glitch'|null>(null);
 const [displayedLength,setDisplayedLength]=useState(0);

 const lang = settings.language;
 const t = uiTranslations[lang] || uiTranslations.ko;
 const p = g.puzzle;

 // 가이드 및 독백 대사 다국어화
 const fullText = localizeDialogue(g.dialogue.text, lang);
 const isTyping = displayedLength < fullText.length;

 useEffect(()=>{if(p.kind!=='timing'&&p.kind!=='wait')return;const interval=setInterval(()=>setTick(Date.now()),100);return()=>clearInterval(interval);},[p.kind]);
 useEffect(()=>{setShowClue(false);},[g.data.stage,g.progress.step]);
 useEffect(()=>{if(g.data.position.x!==oldX){setFacing(g.data.position.x<oldX);setOldX(g.data.position.x);}},[g.data.position.x,oldX]);

 // 1. 타이프라이터 텍스트 & 블립 사운드 제어
 useEffect(()=>{setDisplayedLength(0);},[fullText]);
 useEffect(()=>{
  if(displayedLength>=fullText.length)return;
  const timer=setTimeout(()=>{
   const nextLen=displayedLength+1;
   setDisplayedLength(nextLen);
   const char=fullText[nextLen-1];
   if(char&&!/\s/.test(char)&&(nextLen%2===1||/[.!?]/.test(char))){
    playBlip(g.dialogue.speaker,g.dialogue.tone,settings.sound);
   }
  },28);
  return ()=>clearTimeout(timer);
 },[displayedLength,fullText,g.dialogue.speaker,g.dialogue.tone,settings.sound]);

 // 2. 화면 흔들림(Screen Shake) & 글리치(Glitch) 제어
 useEffect(()=>{
  if(g.progress.completed){
   setScreenFx('glitch');
   if(!settings.reduced)playGlitchShock(settings.sound);
   const timer=setTimeout(()=>setScreenFx(null),400);
   return ()=>clearTimeout(timer);
  }
 },[g.progress.completed,settings.reduced,settings.sound]);

 useEffect(()=>{
  if(g.dialogue.tone==='fail'){
   setScreenFx('shake');
   const timer=setTimeout(()=>setScreenFx(null),350);
   return ()=>clearTimeout(timer);
  }
 },[g.dialogue.tone,g.dialogue.text]);

 const skipOrNext=()=>{
  if(isTyping){
   setDisplayedLength(fullText.length);
  }else{
   if(g.progress.completed)g.exit();
   else g.guide();
  }
 };

 const phase=tick%5000/5000,safe=phase>(settings.slow?.2:.36)&&phase<(settings.slow?.92:.76);
 const waitProgress=g.progress.waitAt?Math.min(100,(tick-g.progress.waitAt)/((p.seconds||5)*10)):0;
 const reveal=settings.showHotspots;
 const routePuzzle=p.kind==='choice'&&p.options.every(name=>/통로|골목|승강장|선로 [1-5]|얼음|쌓인 길|메아리|왼쪽 문|가운데 문|오른쪽 문|그림자 쪽|나침반 방향/.test(name));
 const isLever=/레버/.test(g.stage.title)||/승강기 균형추|배수 펌프|권양기/.test(p.name);
 const guideX=Math.max(17,Math.min(82,g.data.position.x+(g.progress.variant==='left-bait'?-14:13)));
 const indices=p.options.map((_,i)=>i);if(g.progress.variant==='right-bait'||g.progress.variant==='overlooked')indices.reverse();
 const machineSymbols=p.kind==='sequence'?p.options.map((_,i)=>String(i+1)):p.options.map((name,i)=>/왼쪽/.test(name)?'←':/오른쪽/.test(name)?'→':/UP/.test(name)?'↑':/DOWN/.test(name)?'↓':String(i+1));

 const stageDisplayTitle = lang === 'ko' ? g.stage.title : lang === 'en' ? g.stage.translations.en.title : g.stage.title;

 return <div className={`scene-shell ${reveal?'reveal-hotspots':''} ${g.progress.completed?'scene-complete':''} ${screenFx==='shake'?'screen-shake':screenFx==='glitch'?'screen-glitch':''}`}>
 <div className={`scene region-${g.stage.regionId}`} role="region" aria-label={`${stageDisplayTitle}. ${t.clickToMove}`} tabIndex={0}
 onClick={e=>{const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;if(y>57)g.move(x,Math.max(80,y));}}
 onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key===' '){e.preventDefault();onToggleHotspots();return;}const shifts:Record<string,number>={ArrowLeft:-6,ArrowRight:6};if(e.key in shifts){e.preventDefault();g.move(g.data.position.x+shifts[e.key]);}if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();g.move(g.data.position.x,g.data.position.y+(e.key==='ArrowUp'?-3:3));}}}>
 <img className="scene-background" key={g.stage.regionId} src={g.stage.backgroundBundle} alt={`${stageDisplayTitle}`} fetchPriority="high" draggable={false}/>
 <div className="scene-grain"/>
 {!settings.reduced&&<AmbientFallback><Suspense fallback={null}><Ambient/></Suspense></AmbientFallback>}
 <div className="scene-vignette"/>
 <div className="scene-top-left"><span className="location-tag"><MapPin size={12}/>{t.regionTag(g.stage.regionId, stageDisplayTitle)}</span><div className="objective"><span className="objective-symbol"><span/></span><div><span className="overline">{t.currentObjective}</span><p>{g.progress.completed?t.moveToNext:g.data.stage===1?t.findExitStage1:localizeOption(p.name, lang)}</p>{g.puzzles.length>1&&<div className="step-dots">{g.puzzles.map((_,i)=><span key={i} className={i<g.progress.step?'done':i===g.progress.step?'active':''}/>)}</div>}</div></div></div>
 <button className="scene-hint" onClick={e=>{e.stopPropagation();onHints();}} title={t.hintTooltip}><Lightbulb size={18}/><span>{t.hint}</span><kbd>H</kbd></button>
 {g.data.stage===1&&<svg className={`wiring ${showClue||reveal?'wiring-visible':''}`} viewBox="0 0 1400 620" preserveAspectRatio="none" aria-hidden="true"><path d="M890 386V291Q890 279 903 279H1015V137" stroke="#b65b48"/><path d="M949 386V335Q949 324 962 324H1156Q1170 324 1170 341V403" stroke="#76b9bd"/><circle cx="1015" cy="137" r="5" fill="#b65b48"/><circle cx="1170" cy="403" r="5" fill="#76b9bd"/></svg>}
 <button className="world-hotspot clue-hotspot" onClick={e=>{e.stopPropagation();g.inspect();setShowClue(true);}} aria-label={`${t.inspectNearby}: ${localizeOption(p.name, lang)}`}><span className="hotspot-ring"><Eye size={18}/></span><span className="hotspot-label">{t.inspectNearby} <kbd>E</kbd></span></button>
 <button className={`exit-hotspot ${g.progress.completed?'unlocked':''}`} style={routePuzzle&&g.progress.completed?{left:`${p.answer[0]===0?20:p.answer[0]===p.options.length-1?81:50}%`}:undefined} onClick={e=>{e.stopPropagation();g.exit();}} aria-label={g.progress.completed?t.nextStage:t.lockedExit}><span className="exit-ring">{g.progress.completed?<DoorOpen size={22}/>:<LockKeyhole size={18}/>}</span><span className="hotspot-label">{g.progress.completed?t.nextStage:t.lockedExit} <ArrowRight size={13}/></span></button>
 {showClue&&<div className="clue-popover" onClick={e=>e.stopPropagation()}><div className="clue-head"><span><Eye size={14}/> {t.pinObservation}</span><button onClick={()=>setShowClue(false)} aria-label={t.closeObservation}><X size={16}/></button></div><p>{localizeDialogue(p.clue, lang)}</p><small><Check size={12}/> {t.recordedInJournal}</small></div>}
 {routePuzzle&&!g.progress.completed&&<div className="route-options">{indices.map((index,order)=><button className={`route-sign route-sign-${order}`} style={{left:`${indices.length===2?20+order*61:12+order*76/(indices.length-1)}%`}} key={index} onClick={e=>{e.stopPropagation();g.action(index);}} aria-label={localizeOption(p.options[index], lang)}><svg viewBox="0 0 120 110" aria-hidden="true"><path d="M56 32L53 104L67 105L65 31" fill="#7b7b51" stroke="#344631" strokeWidth="3"/><path d={order===0?'M9 17L27 3L111 7L109 44L26 43Z':'M10 5L92 3L112 24L94 43L8 44Z'} fill="#b69d60" stroke="#3e4a32" strokeWidth="3"/><path d="M31 11L83 10M29 35L91 36" stroke="#d6c58a" strokeWidth="1.5"/><circle cx="37" cy="24" r="2" fill="#4f5b36"/><circle cx="79" cy="24" r="2" fill="#4f5b36"/></svg><span className="route-sign-label">{localizeOption(p.options[index], lang)}</span><span className="route-sign-arrow">{order===0?'←':order===indices.length-1?'→':'↑'}</span></button>)}</div>}
 <div className={`world-machine ${routePuzzle&&!g.progress.completed?'route-machine':''} machine-${p.kind} ${g.progress.completed?'machine-solved':''} ${p.options.length>3?'machine-wide':''}`} onClick={e=>e.stopPropagation()}>
 <div className="machine-top"><i/><span>{g.progress.completed?'CIRCUIT CONNECTED':`UNIT ${String(g.data.stage).padStart(2,'0')} — ${String(g.progress.step+1).padStart(2,'0')}`}</span><i/></div>
 {g.progress.completed?<div className="machine-done"><Check size={30}/><span>{t.circuitConnected}</span></div>:<>
 {(p.kind==='timing'||p.kind==='wait')&&<div className={`cycle-display ${safe&&p.kind==='timing'?'safe':''}`}><Waves size={14}/><span>{p.kind==='wait'?g.progress.waitAt?t.pressureReacting(Math.max(0,(p.seconds||5)-Math.floor((tick-g.progress.waitAt)/1000))):t.pressureWaiting:safe?t.platformConnected:t.machineMoving}</span><div className="cycle-meter"><i style={{width:`${p.kind==='wait'?waitProgress:phase*100}%`}}/></div></div>}
 {p.kind==='sequence'&&<div className="sequence-lights">{p.answer.map((_,i)=><span key={i} className={i<g.progress.sequence.length?'lit':''}/>)}</div>}
 {p.kind==='balance'&&<div className="balance-display">{g.progress.balance.reduce((n,j)=>n+(p.weights?.[j]||0),0)} <small>kg</small> <span> / {t.counterweight} {p.answer[0]} kg</span></div>}
 <div className="machine-controls">{indices.filter(n=>p.kind!=='wait'||n===0).map(index=><button key={`${g.data.stage}-${g.progress.step}-${index}`} className={`machine-button knob-${index} ${g.progress.balance.includes(index)&&p.kind==='balance'?'pressed':''}`} onClick={()=>g.action(index)} aria-label={`${g.selectedItem&&p.kind==='item'?g.selectedItem+' 사용: ':''}${localizeOption(p.options[index], lang)}`} title={localizeOption(p.options[index], lang)}><span className={`knob ${isLever?'lever-control':''}`}>{isLever?<svg viewBox="0 0 40 55" className="lever-art" aria-hidden="true"><rect x="10" y="29" width="21" height="20" rx="5" fill="#374a32" stroke="#acb18a" strokeWidth="2"/><circle cx="20" cy="39" r="6" fill="#849878" stroke="#263e2d" strokeWidth="2"/><path d="M20 39L28 10" stroke="#293c2b" strokeWidth="8" strokeLinecap="round"/><path d="M20 38L28 10" stroke="#b7bd8d" strokeWidth="4" strokeLinecap="round"/><rect x="16" y="5" width="23" height="11" rx="5" fill={index===0?'#c56c4b':index===1?'#71b6aa':'#cbb269'} stroke="#3f4930" strokeWidth="2"/></svg>:p.kind==='timing'?<Footprints size={21}/>:p.kind==='item'?<Wrench size={20}/>:p.kind==='wait'?<RotateCcw size={20}/>:g.data.stage===1?index===0?<Triangle size={18}/>:<Circle size={18}/>:machineSymbols[index]}</span><span className="knob-label">{g.data.stage===1?index===0?t.redButton:t.blueButton:localizeOption(p.options[index], lang)}</span></button>)}</div>
 {p.kind==='balance'&&<button className="balance-verify" onClick={()=>g.action(-1)}>{t.verifyBalance} <ChevronRight size={12}/></button>}
 <div className="machine-bottom"><i/><span>◈</span><i/></div></>}
 </div>
 {p.item&&!g.progress.itemsTaken.includes(p.item)&&!g.progress.completed&&<button className="ground-item" onClick={e=>{e.stopPropagation();g.collect();}} aria-label={`${localizeOption(p.item, lang)}`}><ItemArt name={p.item}/><span className="hotspot-label"><Hand size={12}/>{localizeOption(p.item, lang)}</span><span className="item-spark">✧</span></button>}
 {!g.progress.secret&&<button className="memory-fragment" onClick={e=>{e.stopPropagation();g.collect(true);}} aria-label={t.fadedMemory}><svg viewBox="0 0 54 42"><path d="M6 12L36 3L48 26L14 39Z" fill="#baa477" stroke="#5a644c" strokeWidth="2"/><path d="M15 16L33 11M18 22L37 17M20 28L33 24" stroke="#697052" strokeWidth="2"/><circle cx="38" cy="27" r="5" fill="#8ba98a"/></svg><span className="hotspot-label">{t.fadedMemory}</span><span className="memory-glint">✧</span></button>}
 <div className={`pin-character ${facing?'facing-left':''}`} style={{left:`${g.data.position.x}%`,top:`${g.data.position.y}%`}}><Pin pose={g.pose}/><span className="character-name">PIN-04</span>{g.pose==='confused'&&<span className="emotion">?</span>}</div>
 <button className={`tuto-character ${g.progress.completed?'tuto-surprised':''}`} style={{left:`${guideX}%`}} onClick={e=>{e.stopPropagation();g.guide();}} aria-label="TUTO-9"><Tuto pose={g.progress.completed?'confused':g.pose==='walking'?'walking':'idle'}/><span className="character-name">TUTO-9</span><span className="guide-speech-dot">···</span></button>
 <div className="scene-bottom-left"><MousePointer2 size={13}/><span>{t.clickToMove}</span><i/><button onClick={e=>{e.stopPropagation();onToggleHotspots();}}><Eye size={13}/><span>{reveal?t.hideTargets:t.showTargets}</span><kbd>Space</kbd></button></div>
 <div className="scene-bottom-right"><span className="live-dot"/>{g.progress.completed?t.unlocked:t.exploring}</div>
 </div>
 <div className={`dialogue dialogue-${g.dialogue.tone||'normal'}`} aria-live="polite" onClick={skipOrNext} style={{cursor:'pointer'}} title={isTyping?t.showAllText:t.next}>
 <div className="dialogue-portrait">{g.dialogue.speaker==='TUTO-9'?<Tuto/>:<Pin/>}</div>
 <div className="dialogue-content">
 <div className="dialogue-speaker">
 <strong>{g.dialogue.speaker}</strong>
 <span>{g.dialogue.speaker==='TUTO-9'?t.friendlyGuide:t.repairLog}</span>
 {g.dialogue.speaker==='TUTO-9'?<span className="trust-badge"><span/> {t.unverifiedTrust}</span>:g.dialogue.tone==='success'?<span className="success-badge"><Check size={12}/> {t.newPathFound}</span>:<span className="success-badge"><Eye size={12}/> {t.observedFact}</span>}
 {isTyping&&<span className="dialogue-skip-hint">{t.clickToSkip}</span>}
 </div>
 <p>
 {fullText.slice(0,displayedLength)}
 {isTyping&&<span className="typing-cursor">▍</span>}
 </p>
 </div>
 <button className="dialogue-next" onClick={e=>{e.stopPropagation();skipOrNext();}} aria-label={g.progress.completed?t.nextStage:t.next}>
 <ChevronRight size={23}/>
 </button>
 </div>
 <div className="chapter-progress" aria-label={`Region Progress ${g.data.stage%5||5} / 5`}>{Array.from({length:5},(_,i)=><span key={i} className={i<(g.data.stage-1)%5?'complete':i===(g.data.stage-1)%5?'current':''}/>)}</div>
 </div>;
}
