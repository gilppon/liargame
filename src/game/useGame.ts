import { useCallback, useEffect, useRef, useState } from 'react';
import { stages, type Puzzle } from './stages';
import { loadGame, newGame, newProgress, persistGame, pinActor, playTone, type SaveData, type Settings } from './state';
export interface Dialogue {speaker:'TUTO-9'|'PIN-04'|'SYSTEM';text:string;tone?:'success'|'fail'|'clue';}
export function getPuzzles(data:SaveData){const stage=stages[data.stage-1];const p=data.progress[data.stage];if(data.stage===48&&p.seed%2===1)return [stage.puzzles[1],stage.puzzles[0],stage.puzzles[2]];return stage.puzzles;}
export function safePhase(slow:boolean){const p=(Date.now()%5000)/5000;return p>(slow?.20:.36)&&p<(slow?.92:.76);}
export function useGame(settings:Settings){
 const [data,setData]=useState<SaveData>(loadGame);
 const [dialogue,setDialogue]=useState<Dialogue>(()=>({speaker:'TUTO-9',text:stages[data.stage-1].puzzles[Math.min(data.progress[data.stage].step,stages[data.stage-1].puzzles.length-1)].guide}));
 const [selectedItem,setSelectedItem]=useState<string|null>(null);
 const [toast,setToast]=useState('');
 const [pose,setPose]=useState('idle');
 const [saved,setSaved]=useState(true);
 const [hintLevel,setHintLevel]=useState(0);
 const [ending,setEnding]=useState<number|null>(null);
 const stateRef=useRef(data); stateRef.current=data;
 const dialogueAt=useRef(Date.now());
 const stage=stages[data.stage-1], progress=data.progress[data.stage], puzzles=getPuzzles(data), puzzle=puzzles[Math.min(progress.step,puzzles.length-1)];
 const notify=useCallback((message:string)=>{setToast(message);},[]);
 useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(''),3500);return ()=>clearTimeout(timer);},[toast]);
 useEffect(()=>{const sub=pinActor.subscribe(s=>setPose(String(s.value)));return ()=>sub.unsubscribe();},[]);
 useEffect(()=>{setSaved(false);const timer=setTimeout(()=>{void persistGame(data).then(setSaved);},250);return ()=>clearTimeout(timer);},[data]);
 useEffect(()=>{const timer=setInterval(()=>setData(d=>({...d,playTime:d.playTime+15})),15000);return ()=>clearInterval(timer);},[]);
 useEffect(()=>{const save=()=>void persistGame(stateRef.current);window.addEventListener('pagehide',save);return()=>window.removeEventListener('pagehide',save);},[]);
 useEffect(()=>{const timer=setTimeout(()=>{const img=new Image();img.src=`/images/region-${Math.min(10,stage.regionId+1)}.jpg`;},2500);return ()=>clearTimeout(timer);},[stage.regionId]);
 const say=(d:Dialogue)=>{setDialogue(d);dialogueAt.current=Date.now();};
 const move=(x:number,y=86)=>{setData(d=>({...d,position:{x:Math.max(8,Math.min(93,x)),y:Math.max(78,Math.min(94,y))}}));pinActor.send({type:'WALK'});};
 const success=(d:SaveData)=>{
  const p=d.progress[d.stage];p.step++;p.sequence=[];p.balance=[];p.waitAt=null;p.completed=p.step>=getPuzzles(d).length;
  return d;
 };
 const celebrate=(complete:boolean,next?:Puzzle)=>{playTone('success',settings.sound);pinActor.send({type:'SUCCESS'});setHintLevel(0);setSelectedItem(null);say({speaker:'PIN-04',tone:'success',text:complete?'삐—링! 잠금장치가 풀렸다. 이제 빛이 들어오는 열린 출구로 이동할 수 있다.':`장치가 반응했다. 다음은 ${next?.name||'연결된 장치'}을 살펴보자.`});};
 useEffect(()=>{if(!progress.waitAt||progress.completed)return;const currentPuzzle=puzzle;const timer=setInterval(()=>{if(Date.now()-progress.waitAt!>=(currentPuzzle.seconds||5)*1000){const updated=success(structuredClone(stateRef.current));setData(updated);celebrate(updated.progress[updated.stage].completed,getPuzzles(updated)[updated.progress[updated.stage].step]);}},150);return ()=>clearInterval(timer);},[progress.waitAt,data.stage,progress.step]);
 const inspect=()=>{
  pinActor.send({type:'INSPECT'});playTone('click',settings.sound);move(31,86);
  const d=structuredClone(data),p=d.progress[d.stage];
  d.position={x:31,y:86};
  d.metrics.inspections++;if(/파동|소리|메아리/.test(puzzle.clue))d.metrics.sound++;if(/파란|빨간|색/.test(puzzle.clue))d.metrics.color++;
  if(!p.inspected.includes(p.step)){p.inspected.push(p.step);d.evidence.push({stage:d.stage,step:p.step,text:puzzle.clue});}
  setData(d);say({speaker:'PIN-04',text:puzzle.clue,tone:'clue'});
 };
 const collect=(secret=false)=>{
  const d=structuredClone(data),p=d.progress[d.stage];move(secret?16:46,88);d.position={x:secret?16:46,y:88};
  if(secret){if(p.secret){notify('이 방의 기억 조각은 이미 수집했습니다.');return;}p.secret=true;d.logs.push(d.stage);setData(d);notify(`숨겨진 기억 조각 발견 · ${d.logs.length} / 50`);say({speaker:'PIN-04',tone:'clue',text:`기억 기록 #${String(d.stage).padStart(2,'0')} — “안내는 선택을 대신하기 위해 만들어진 것이 아니다.” 작은 기록을 정비 수첩에 보관했다.`});}
  else if(puzzle.item){if(p.itemsTaken.includes(puzzle.item)){notify('이미 인벤토리에 보관한 아이템입니다.');return;}p.itemsTaken.push(puzzle.item);if(!d.inventory.includes(puzzle.item))d.inventory.push(puzzle.item);setData(d);setSelectedItem(puzzle.item);notify(`${puzzle.item} 획득 · 장면 속 대상에 사용하세요.`);}
  playTone('success',settings.sound);pinActor.send({type:'INSPECT'});
 };
 const action=(index:number)=>{
  if(progress.completed){notify('문이 열려 있습니다. 오른쪽 출구로 이동하세요.');return;}
  const d=structuredClone(data),p=d.progress[d.stage];const actionId=`${d.stage}:${p.step}:${index}`;
  d.metrics.actions++;if(index===0)d.metrics.left++;else d.metrics.right++;if(d.metrics.lastAction===actionId)d.metrics.repeated++;d.metrics.lastAction=actionId;if(Date.now()-dialogueAt.current<1700)d.metrics.early++;
  const label=puzzle.options[index]||'';
  d.position={x:/왼쪽|1번 승강장|선로 1/.test(label)?22:/오른쪽|2번 승강장/.test(label)?82:62+Math.min(Math.max(index,0),3)*4,y:86};pinActor.send({type:'INSPECT'});
  let correct=false,failed=false;
  if(puzzle.kind==='balance'){
   if(index===-1){correct=p.balance.reduce((sum,n)=>sum+(puzzle.weights?.[n]||0),0)===puzzle.answer[0];failed=!correct;}
   else {p.balance=p.balance.includes(index)?p.balance.filter(n=>n!==index):[...p.balance,index];playTone('click',settings.sound);setData(d);return;}
  }else if(puzzle.kind==='wait'){
   if(p.waitAt){d.metrics.repeated++;say({speaker:'TUTO-9',tone:'fail',text:'다시 처음부터 작동하네요? 분명 당신이 너무 서두른 탓일 거예요.'});}else {d.metrics.waits++;say({speaker:'PIN-04',tone:'clue',text:'밸브가 돌아가기 시작했다. 압력계의 반응을 지켜보자.'});}p.waitAt=Date.now();setData(d);playTone('click',settings.sound);return;
  }else if(puzzle.kind==='timing'){correct=safePhase(settings.slow);failed=!correct;}
  else if(puzzle.kind==='sequence'){
   if(index===puzzle.answer[p.sequence.length]){p.sequence.push(index);if(p.sequence.length===puzzle.answer.length)correct=true;else{setData(d);playTone('click',settings.sound);say({speaker:'PIN-04',tone:'clue',text:`장치 ${p.sequence.length} / ${puzzle.answer.length} 연결. 다음 순서를 이어가자.`});return;}}
   else{failed=true;p.sequence=[];}
  }else if(puzzle.kind==='item'){
   if(selectedItem!==puzzle.item||!d.inventory.includes(puzzle.item!)){notify(`먼저 장면에서 도구를 찾고 인벤토리에서 선택하세요.`);say({speaker:'PIN-04',text:'삐… 맨손으로는 작동하지 않는다. 도구의 모양과 장치의 홈을 비교해 보자.',tone:'clue'});return;}
   correct=index===puzzle.answer[0];failed=!correct;
  }else{correct=index===puzzle.answer[0];failed=!correct;}
  if(correct){d.metrics.opposed++;const updated=success(d);setData(updated);celebrate(updated.progress[updated.stage].completed,getPuzzles(updated)[updated.progress[updated.stage].step]);}
  else if(failed){p.sequence=[];p.balance=[];setData(d);pinActor.send({type:'FAIL'});playTone('fail',settings.sound);say({speaker:'TUTO-9',tone:'fail',text:puzzle.kind==='timing'?'어머, 박자가 어긋났네요. 다음 주기에 다시 해 보세요. 제 말보다는… 아니, 제 말을 잘 들으세요!':'이런! 장치가 원래대로 돌아왔네요. 제가 아니라 누른 쪽의 문제일 거예요. 다시 해 보시겠어요?'});notify('장치가 초기화되었습니다. 발견한 단서와 아이템은 유지됩니다.');}
 };
 const enter=(id:number)=>{
  if(id<1||id>50)return;const d=structuredClone(data);d.stage=id;d.position={x:37,y:86};if(!d.progress[id])d.progress[id]=newProgress(id,d.metrics);setData(d);setHintLevel(0);setSelectedItem(null);setEnding(null);const ps=getPuzzles(d),p=d.progress[id];say({speaker:'TUTO-9',text:p.completed?'아, 다시 오셨군요. 열린 출구는 저쪽이에요. 이번에는 정말입니다.':ps[Math.min(p.step,ps.length-1)].guide});pinActor.send({type:'WALK'});playTone('step',settings.sound);
 };
 const exit=()=>{if(!progress.completed){move(80,85);say({speaker:'PIN-04',text:'문이 굳게 잠겨 있다. 장치와 연결된 전선을 먼저 살펴보자.',tone:'clue'});return;}if(data.stage===50){setEnding(-1);return;}enter(data.stage+1);};
 const guide=()=>{playTone('click',settings.sound);const truth=data.stage>=31&&progress.seed%3===0&&progress.step>0;const text=truth?`이번에는 ${puzzle.options[puzzle.answer[0]]} 쪽을 살펴보세요. 하지만 환경을 조사하는 건 시간 낭비랍니다!`:puzzle.guide;const tail=progress.variant==='impatient'?' 빨리요, 기다릴 필요 없어요!':progress.variant==='left-bait'?' 왼쪽을 좋아하셨죠?':progress.variant==='right-bait'?' 늘 오른쪽을 고르셨잖아요.':progress.variant==='overlooked'?' 구석은 볼 필요 없어요.':'';say({speaker:'TUTO-9',text:text+tail});};
 const hint=()=>{setHintLevel(n=>Math.min(3,n+1));setData(d=>({...d,metrics:{...d.metrics,hints:d.metrics.hints+1}}));};
 const selectItem=(item:string)=>{setSelectedItem(v=>v===item?null:item);setData(d=>({...d,metrics:{...d.metrics,inventory:d.metrics.inventory+1}}));playTone('click',settings.sound);};
 const finish=(id:number)=>{if(id===3&&data.logs.length<10){notify('관리자 경로에는 서로 다른 기억 기록 10개가 필요합니다. 지역 지도로 돌아가 수집할 수 있습니다.');return;}setData(d=>({...d,endings:[...new Set([...d.endings,id])]}));setEnding(id);playTone('success',settings.sound);};
 const reset=()=>{const fresh=newGame();setData(fresh);setEnding(null);setSelectedItem(null);setHintLevel(0);say({speaker:'TUTO-9',text:stages[0].puzzles[0].guide});};
 return {data,setData,stage,progress,puzzle,puzzles,dialogue,selectedItem,toast,pose,saved,hintLevel,ending,setEnding,notify,move,inspect,collect,action,enter,exit,guide,hint,selectItem,finish,reset,setDialogue,save:async()=>{const ok=await persistGame(data);setSaved(ok);notify(ok?'현재 여정을 저장했습니다.':'저장 공간을 확인해 주세요.');}};
}
export type Game=ReturnType<typeof useGame>;
