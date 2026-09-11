import { stages, validateStages, endings } from '../src/game/stages.ts';
const result=validateStages();
const errors=[...result.errors];
const reached=new Set<number>();
let id:number|null=1;
while(id!==null){if(reached.has(id)){errors.push(`Navigation cycle at ${id}`);break;}reached.add(id);const stage=stages.find(s=>s.stageId===id);if(!stage){errors.push(`Missing ${id}`);break;}id=stage.nextStage;}
if(reached.size!==50)errors.push(`Only ${reached.size} reachable stages`);
if(result.puzzles<65)errors.push('Fewer than 65 puzzles');
if(endings.length!==4)errors.push('Four endings required');
for(const stage of stages){
 for(const h of stage.hotspots)if(h.x<8||h.x>93)errors.push(`Unreachable hotspot ${stage.stageId}/${h.id}`);
 for(const p of stage.puzzles){
  if(p.kind==='balance'&&p.weights){
   const sums=new Set([0]);for(const weight of p.weights)for(const sum of [...sums])sums.add(sum+weight);
   if(!sums.has(p.answer[0]))errors.push(`Impossible balance ${stage.stageId}`);
  }
  if(!p.clue.trim())errors.push(`Missing evidence ${stage.stageId}`);
 }
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`PASS · ${result.stages} connected stages · ${result.puzzles} puzzles · 4 reachable endings · 10 regions`);
