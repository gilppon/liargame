import { useId } from 'react';

export function Pin({ pose='idle', className='' }:{pose?:string;className?:string}){
 const id=useId().replace(/:/g,'');
 return <svg className={`pin-art pose-${pose} ${className}`} viewBox="0 0 150 190" fill="none" role="img" aria-label="PIN-04, 황동 랜턴 수리 로봇">
  <defs><linearGradient id={`${id}brass`} x1="30" y1="45" x2="119" y2="134" gradientUnits="userSpaceOnUse"><stop stopColor="#efcf82"/><stop offset=".45" stopColor="#b38b49"/><stop offset="1" stopColor="#665030"/></linearGradient><radialGradient id={`${id}eye`}><stop stopColor="#c4fff0"/><stop offset=".38" stopColor="#77e1ce"/><stop offset=".72" stopColor="#298f84"/><stop offset="1" stopColor="#144c46"/></radialGradient><linearGradient id={`${id}cap`}><stop stopColor="#e4c485"/><stop offset="1" stopColor="#8b6b39"/></linearGradient></defs>
  <ellipse cx="76" cy="178" rx="47" ry="7" fill="#0b1611" opacity=".38"/>
  <g className="pin-leg leg-left"><path d="M56 132L53 140L62 145L51 151L60 157L52 166" stroke="#2b322b" strokeWidth="8"/><path d="M56 132L53 140L62 145L51 151L60 157L52 166" stroke="#9c9b77" strokeWidth="3"/><path d="M52 165Q41 163 38 173L60 174L61 168Z" fill="#766d4e" stroke="#29362c" strokeWidth="3"/></g>
  <g className="pin-leg leg-right"><path d="M92 133L97 141L87 148L100 153L91 160L98 167" stroke="#2b322b" strokeWidth="8"/><path d="M92 133L97 141L87 148L100 153L91 160L98 167" stroke="#b8ae88" strokeWidth="3"/><path d="M94 166Q108 163 112 174L91 174Z" fill="#807355" stroke="#29362c" strokeWidth="3"/></g>
  <g className="pin-body"><path d="M115 70L126 55L133 61L125 86L129 114L115 121" fill="#556657" stroke="#26372f" strokeWidth="3"/><path d="M124 58L128 42L137 36L141 45L135 52L132 70" fill="#a5a58c" stroke="#2a392f" strokeWidth="3"/>
  <path d="M32 109L21 121L19 136M22 121L31 138" stroke="#242f27" strokeWidth="8" strokeLinecap="round"/><path d="M32 108L22 120L20 134M23 122L30 136" stroke="#b9a269" strokeWidth="4" strokeLinecap="round"/>
  <path d="M111 108L126 118L128 128M126 118L137 116" stroke="#273329" strokeWidth="8" strokeLinecap="round"/><path d="M111 108L126 118L128 128M126 118L137 116" stroke="#b9a269" strokeWidth="4" strokeLinecap="round"/>
  <path d="M50 51Q44 18 69 17Q87 17 92 47" stroke="#27352c" strokeWidth="10"/><path d="M50 51Q46 22 68 21Q84 20 89 47" stroke="#b69558" strokeWidth="5"/>
  <path d="M35 59L48 44L88 41L111 55L119 121Q108 142 56 138L32 124Z" fill={`url(#${id}brass)`} stroke="#263329" strokeWidth="4"/>
  <path d="M33 63L37 53L65 43L97 46L112 57L110 65L63 64Z" fill={`url(#${id}cap)`} stroke="#354032" strokeWidth="3"/>
  <path d="M47 66L44 113M104 67L110 120" stroke="#715e37" strokeWidth="3"/>
  <ellipse cx="77" cy="94" rx="31" ry="27" fill="#423e2c" stroke="#d7b575" strokeWidth="4"/><ellipse cx="79" cy="94" rx="23" ry="21" fill={`url(#${id}eye)`} stroke="#243c31" strokeWidth="4"/><ellipse className="pin-eye" cx="82" cy="92" rx="10" ry="13" fill="#b0fce3" opacity=".8"/><ellipse cx="73" cy="86" rx="5" ry="4" fill="#eefff2"/>
  <path d="M35 119Q64 129 114 119L116 128Q86 148 35 131Z" fill="#9e4e38" stroke="#423f2c" strokeWidth="3"/><path className="scarf" d="M36 123L16 130L24 139L8 155L30 148L45 130" fill="#b75d44" stroke="#483c29" strokeWidth="2.5"/>
  <path d="M49 52L57 49M96 57L100 59M41 112L43 117M97 114L101 109" stroke="#f3d594" strokeWidth="2" strokeLinecap="round"/>
  {[ [40,72],[106,73],[48,119],[107,119] ].map(([cx,cy])=><circle key={`${cx}${cy}`} cx={cx} cy={cy} r="2" fill="#3f4632"/>)}
  <path d="M57 131L85 134" stroke="#dd9670" strokeWidth="2"/>
  </g></svg>;
}
export function Tuto({pose='idle',className=''}:{pose?:string;className?:string}){
 const id=useId().replace(/:/g,'');
 return <svg className={`tuto-art pose-${pose} ${className}`} viewBox="0 0 190 230" fill="none" role="img" aria-label="TUTO-9, 외바퀴 안내 로봇">
 <defs><linearGradient id={`${id}head`} x1="37" y1="37" x2="131" y2="110" gradientUnits="userSpaceOnUse"><stop stopColor="#e8c76d"/><stop offset="1" stopColor="#a27a36"/></linearGradient><linearGradient id={`${id}body`}><stop stopColor="#708d73"/><stop offset="1" stopColor="#365b50"/></linearGradient></defs>
 <ellipse cx="89" cy="218" rx="41" ry="7" fill="#08150f" opacity=".35"/>
 <g className="tuto-wheel"><circle cx="89" cy="196" r="22" fill="#303d32" stroke="#172c25" strokeWidth="5"/><circle cx="89" cy="196" r="13" fill="#8d8a61" stroke="#a7a077" strokeWidth="3"/><path d="M76 196H102M89 183V209M80 187L98 205M80 205L98 187" stroke="#415445" strokeWidth="3"/><circle cx="89" cy="196" r="5" fill="#aa965e"/></g>
 <path d="M85 160V185H97V161" fill="#8c9873" stroke="#263b2e" strokeWidth="3"/>
 <g className="tuto-body"><path d="M112 112L123 97L152 103L143 127L133 129L137 155L120 159" fill="#718675" stroke="#263d30" strokeWidth="3"/><path d="M126 106L135 78L156 81L168 93L151 104Z" fill="#bd974b" stroke="#394533" strokeWidth="3"/><path d="M138 90L155 92M150 87L155 92L149 97" stroke="#594f33" strokeWidth="3"/>
 <path d="M62 120L54 143L58 170Q87 184 119 168L119 126L105 116" fill={`url(#${id}body)`} stroke="#273e30" strokeWidth="4"/>
 <path d="M62 137L55 148L43 153L44 168L53 174" stroke="#344a37" strokeWidth="10"/><path d="M62 137L55 148L44 154L44 166" stroke="#aaa278" strokeWidth="5"/>
 <path d="M41 162Q32 158 31 166L34 177L42 181L50 176L49 165Z" fill="#dedec0" stroke="#475344" strokeWidth="2"/>
 <path d="M115 134L137 132L144 116" stroke="#263d31" strokeWidth="11" strokeLinecap="round"/><path d="M115 134L137 132L145 115" stroke="#a9aa80" strokeWidth="6" strokeLinecap="round"/>
 <g className="pointing-hand"><path d="M140 118L137 108L144 103L154 103L175 91Q181 91 179 98L160 112L163 118L154 125L144 123Z" fill="#eae5ca" stroke="#475247" strokeWidth="2.5"/><path d="M145 112L152 114M149 107L155 109" stroke="#9caa8e" strokeWidth="2"/></g>
 <path d="M79 101V121H97V101" fill="#949e73" stroke="#324432" strokeWidth="3"/>
 <path d="M33 45L115 37L137 62L127 103L43 113L29 94Z" fill={`url(#${id}head)`} stroke="#34432f" strokeWidth="4"/>
 <path d="M38 50L112 43L130 63L122 95L47 105L36 91Z" fill="#d1b362" stroke="#f0d286" strokeWidth="1.5"/>
 <path d="M46 56L62 52M98 46L108 45M120 87L118 94" stroke="#8e753c" strokeWidth="2"/>
 <path d="M54 77L64 84L77 63" stroke="#40584a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
 <path d="M90 65C90 50 115 52 113 65C112 71 101 73 103 80" stroke="#40584a" strokeWidth="5" strokeLinecap="round"/><circle cx="104" cy="88" r="3" fill="#40584a"/>
 <path d="M72 100L86 96L95 103L91 111L77 112Z" fill="#536452" stroke="#344432" strokeWidth="2"/><path d="M79 100L85 108M84 99L90 106" stroke="#a9b196" strokeWidth="2"/>
 <path d="M62 119L80 124L99 114L107 129L90 132L68 134Z" fill="#d3af50" stroke="#364936" strokeWidth="2.5"/><path d="M68 121L75 132M77 123L84 130M98 118L103 127" stroke="#435442" strokeWidth="4"/><circle cx="86" cy="125" r="4" fill="#a98c42"/>
 <rect x="71" y="143" width="34" height="19" rx="3" fill="#364f40" stroke="#97a17b" strokeWidth="2"/><path d="M78 150H98M78 156H91" stroke="#a0ad86" strokeWidth="2"/>
 </g></svg>;
}
export function ItemArt({name,className=''}:{name:string;className?:string}){
 const type=/공구|집게/.test(name)?'tool':/수첩|기록|지우개/.test(name)?'book':/자석|U자/.test(name)?'magnet':/인장/.test(name)?'seal':/우산/.test(name)?'umbrella':/연결선/.test(name)?'wire':/핀|조각|금속/.test(name)?'gear':'key';
 return <svg viewBox="0 0 64 64" className={`item-art ${className}`} fill="none" aria-hidden="true"><ellipse cx="32" cy="54" rx="18" ry="4" fill="#000" opacity=".2"/>{type==='tool'?<><path d="M45 9L37 13L36 22L19 40L13 39L8 45L12 52L19 55L25 49L24 43L43 25L50 23L55 15L47 19L42 16Z" fill="#a5b8a4" stroke="#3a5043" strokeWidth="2.5"/><path d="M23 38L31 31" stroke="#e2dcc0" strokeWidth="3"/></>:type==='book'?<><path d="M15 10L46 8L50 49L19 54Z" fill="#8a7150" stroke="#433d2e" strokeWidth="3"/><path d="M21 12L44 11L47 45L24 48Z" fill="#c2ac79"/><path d="M28 22L40 20M29 28L39 26M30 34L42 32" stroke="#766746" strokeWidth="2"/><path d="M19 11L24 51" stroke="#ab7050" strokeWidth="4"/></>:type==='magnet'?<><path d="M16 16V36C16 56 48 56 48 36V16H36V36C36 42 28 42 28 36V16Z" fill="#aa5c45" stroke="#4f4d38" strokeWidth="3"/><path d="M16 16H28V25H16ZM36 16H48V25H36Z" fill="#b1ba9b"/></>:type==='seal'?<><path d="M32 8L50 20V43L32 54L13 42V20Z" fill={name.includes('유리')?'#71baa9':name.includes('철')?'#9da99a':'#c0a05d'} stroke="#6d704f" strokeWidth="3"/><path d="M32 19L41 26V37L32 43L23 37V26Z" stroke="#e0dfac" strokeWidth="2"/></>:type==='umbrella'?<><path d="M20 10L38 43L43 41L27 6Z" fill="#799b83" stroke="#374f40" strokeWidth="3"/><path d="M39 42L43 50Q49 57 54 50" stroke="#c2a36b" strokeWidth="4"/></>:type==='wire'?<path d="M14 17C51-7 55 45 31 44C9 44 14 22 33 25C50 29 32 55 51 52" stroke="#b99455" strokeWidth="6"/>:type==='gear'?<><path d="M26 9H38L40 17L48 16L54 27L48 33L52 41L43 50L35 46L28 54L17 49L18 40L10 35L13 23L22 22Z" fill="#b49452" stroke="#63593c" strokeWidth="3"/><circle cx="32" cy="32" r="10" fill="#343e30" stroke="#d8b970" strokeWidth="3"/></>:<><circle cx="23" cy="22" r="11" stroke="#c3a566" strokeWidth="7"/><path d="M31 30L50 49M41 40L47 34M46 46L52 40" stroke="#c3a566" strokeWidth="7"/></>}</svg>;
}
