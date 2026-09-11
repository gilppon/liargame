import { Application, extend, useTick } from '@pixi/react';
import { Graphics } from 'pixi.js';
import { useRef } from 'react';
extend({Graphics});
function Motes(){const ref=useRef<Graphics>(null);const time=useRef(0);useTick(ticker=>{time.current+=ticker.deltaTime;const g=ref.current;if(!g)return;g.clear();for(let i=0;i<30;i++){const x=(i*173.3+Math.sin(time.current*.004+i)*35)%1400;const y=(i*79.7-time.current*.07+50000)%650;g.circle(x,y,i%3===0?1.6:.8).fill({color:0xffe6b1,alpha:.16+Math.sin(time.current*.016+i)*.12});}});return <pixiGraphics ref={ref} draw={()=>{}}/>;}
export default function Ambient(){return <div className="ambient-canvas" aria-hidden="true"><Application width={1400} height={650} backgroundAlpha={0} preference="webgl" resolution={1}><Motes/></Application></div>;}
