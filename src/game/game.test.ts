import { describe, expect, it, beforeEach, vi } from 'vitest';
import { stages, stageSchema, validateStages, endings, adaptiveStages } from './stages';
import { newGame, newProgress, director, initialMetrics, loadGame, persistGame, characterMachine } from './state';
import { getPuzzles } from './useGame';

describe('50 connected places',()=>{
 it('has at least 65 validated puzzles and exactly 50 stages',()=>{const result=validateStages();expect(result.valid).toBe(true);expect(result.errors).toEqual([]);expect(result.stages).toBe(50);expect(result.puzzles).toBeGreaterThanOrEqual(65);});
 it.each(stages)('stage $stageId: complete, recoverable, translated, reachable',stage=>{
  expect(stageSchema.safeParse(stage).success).toBe(true);
  expect(stage.environmentClues.length).toBe(stage.puzzles.length);
  expect(stage.recoveryState).toBe('same-puzzle-evidence-preserved');
  expect(stage.translations.en.title.length).toBeGreaterThan(0);
  expect(stage.hotspots.every(h=>h.x>=8&&h.x<=93)).toBe(true);
  expect(stage.nextStage).toBe(stage.stageId===50?null:stage.stageId+1);
  stage.puzzles.forEach(p=>{
   if(p.kind==='balance'){let sums=new Set([0]);for(const w of p.weights||[])sums=new Set([...sums,...[...sums].map(n=>n+w)]);expect(sums.has(p.answer[0])).toBe(true);}
   else expect(p.answer.every(n=>n>=0&&n<p.options.length)).toBe(true);
   if(p.item)expect(stage.inventoryItems).toContain(p.item);
   if(p.kind==='wait')expect(p.seconds).toBeGreaterThan(0);
  });
 });
 it('traverses all 50 stages without a cycle',()=>{let id:number|null=1;const seen=new Set<number>();while(id!==null){expect(seen.has(id)).toBe(false);seen.add(id);id=stages[id-1].nextStage;}expect(seen.size).toBe(50);expect(endings).toHaveLength(4);});
});
describe('deterministic director',()=>{
 it.each(adaptiveStages)('fixes stage %i at entry',id=>{const first=newProgress(id,initialMetrics);expect(first).toEqual(newProgress(id,initialMetrics));const restored=JSON.parse(JSON.stringify(first));expect(restored.seed).toBe(first.seed);expect(restored.variant).toBe(first.variant);});
 it('responds to haste without random answers',()=>{const fast={...initialMetrics,early:12,waits:0};expect(director(25,fast).variant).toBe('impatient');expect(director(25,fast)).toEqual(director(25,fast));});
 it('retains selected variants after metrics change',()=>{const game=newGame();game.stage=48;game.progress[48]=newProgress(48,initialMetrics);const seed=game.progress[48].seed;const order=getPuzzles(game).map(p=>p.name);game.metrics.early+=30;game.metrics.left+=15;expect(game.progress[48].seed).toBe(seed);expect(getPuzzles(game).map(p=>p.name)).toEqual(order);});
});
describe('save and recovery',()=>{
 beforeEach(()=>{const store=new Map<string,string>();vi.stubGlobal('localStorage',{getItem:(k:string)=>store.get(k)||null,setItem:(k:string,v:string)=>store.set(k,v),removeItem:(k:string)=>store.delete(k)});});
 it('recovers a corrupt save safely',()=>{localStorage.setItem('deceptive-guide-save-v1','{broken');expect(loadGame().stage).toBe(1);});
 it('saves puzzle sequence, items, character position and metrics',async()=>{const data=newGame();data.stage=14;data.progress[14]=newProgress(14,data.metrics);data.progress[14].sequence=[1,3];data.position={x:62,y:87};data.inventory.push('말굽 자석');data.metrics.inspections=12;expect(await persistGame(data)).toBe(true);const read=loadGame();expect(read.progress[14].sequence).toEqual([1,3]);expect(read.position).toEqual({x:62,y:87});expect(read.inventory).toContain('말굽 자석');expect(read.metrics.inspections).toBe(12);});
 it('starts fresh with a recoverable idle character',()=>{expect(characterMachine.config.initial).toBe('idle');expect(newGame().progress[1].completed).toBe(false);expect(newGame().inventory).toContain('정비 공구');});
});
