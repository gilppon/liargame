import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDownToLine, ArrowLeft, ArrowRight, Award, BookOpen, Check, CheckCheck, ChevronRight, CircleHelp, Clock3, Compass, Download, Expand, Eye, Flag, FolderOpen, Globe2, Keyboard, Lightbulb, LockKeyhole, Map, MapPin, MoreHorizontal, PackageOpen, Play, RotateCcw, Save, Search, Settings2, ShieldCheck, Sparkles, Volume2, VolumeX, Wrench, X } from 'lucide-react';
import { Scene } from './components/Scene';
import { ItemArt, Pin, Tuto } from './components/Characters';
import { PersonalityModal } from './components/PersonalityModal';
import { FakeCrashModal } from './components/FakeCrashModal';
import { initMetaConsole } from './game/metaConsole';
import { englishEndings, englishRegionSubtitles, japaneseEndings, japaneseRegions, uiTranslations, localizeOption, localizeDialogue } from './game/i18n';
import { unlockAchievement } from './game/desktop';
import { useGame } from './game/useGame';
import { formatTime, loadSettings, restoreBackup, saveSettings, startAmbience, type Settings } from './game/state';
import { endings, regions, stages, validateStages } from './game/stages';

type Panel='journal'|'map'|'settings'|'hint'|'help'|'inventory'|'save'|null;

function Modal({title,eyebrow,children,onClose,wide=false}:{title:string;eyebrow:string;children:ReactNode;onClose:()=>void;wide?:boolean}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null;
    const old=document.body.style.overflow;
    document.body.style.overflow='hidden';
    ref.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return()=>{document.body.style.overflow=old;previous?.focus();};
  },[]);
  return (
    <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className={`modal ${wide?'modal-wide':''}`} ref={ref} role="dialog" aria-modal="true" aria-label={title} onKeyDown={e=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){const nodes=ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a,input,select,[tabindex="0"]');if(!nodes?.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}}>
        <div className="modal-header">
          <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
          <button className="icon-button modal-close" onClick={onClose} aria-label="닫기"><X size={21}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Toggle({label,description,checked,onChange}:{label:string;description:string;checked:boolean;onChange:()=>void}){
  return (
    <button className="setting-toggle" role="switch" aria-checked={checked} onClick={onChange}>
      <span><strong>{label}</strong><small>{description}</small></span>
      <span className={`toggle ${checked?'on':''}`}><i/></span>
    </button>
  );
}

export default function App(){
  const [settings,setSettings]=useState<Settings>(loadSettings);
  const g=useGame(settings);
  const [panel,setPanel]=useState<Panel>(null);
  const [showPersonality,setShowPersonality]=useState(false);
  const [fakeCrash,setFakeCrash]=useState(false);
  const [journalTab,setJournalTab]=useState<'evidence'|'memories'>('evidence');
  const [journalSearch,setJournalSearch]=useState('');
  const [confirmReset,setConfirmReset]=useState(false);
  const [downloading,setDownloading]=useState(0);
  const [isFullscreen,setFullscreen]=useState(false);
  const inventoryRef=useRef<HTMLDivElement>(null);

  const lang=settings.language;
  const ko=lang==='ko';
  const ja=lang==='ja';
  const t=uiTranslations[lang]||uiTranslations.ko;

  const region=regions[g.stage.regionId-1];
  const completeCount=Object.values(g.data.progress).filter(p=>p.completed).length;
  const maxStage=Math.max(...Object.keys(g.data.progress).map(Number));
  const close=()=>setPanel(null);
  const setting=<K extends keyof Settings>(key:K,value:Settings[K])=>setSettings(s=>({...s,[key]:value}));

  useEffect(()=>{saveSettings(settings);},[settings]);
  useEffect(()=>{if(settings.music)return startAmbience();},[settings.music]);
  useEffect(()=>{if('serviceWorker' in navigator)void navigator.serviceWorker.register('/sw.js').catch(()=>{});},[]);
  useEffect(()=>{
    const handler=()=>setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange',handler);
    return()=>document.removeEventListener('fullscreenchange',handler);
  },[]);

  useEffect(()=>{
    initMetaConsole(g, () => setFakeCrash(true));
  },[g]);

  useEffect(()=>{
    const baseTitle=ja?`偽りのチュートリアル · STAGE ${String(g.data.stage).padStart(2,'0')}`:ko?`거짓말하는 튜토리얼 · STAGE ${String(g.data.stage).padStart(2,'0')}`:`Deceptive Guide · STAGE ${String(g.data.stage).padStart(2,'0')}`;
    if(g.progress.completed){
      document.title=ja?`🔓 出口開放！ (TUTO-9: 「どうやって解いたんだ……？」)`:ko?`🔓 출구 개방! (TUTO-9: "어떻게 풀었지...?")`:`🔓 Unlocked! (TUTO-9: "How...?")`;
    }else if(g.dialogue.tone==='fail'){
      document.title=ja?`💥 誤作動！ (TUTO-9: 「ほら、ボクの言った通りにすればよかったのに！」)`:ko?`💥 오작동! (TUTO-9: "거봐요, 내 말 들으랬죠?")`:`💥 Failed! (TUTO-9: "Told you so!")`;
    }else if(g.dialogue.speaker==='TUTO-9'){
      document.title=ja?`${baseTitle} · [TUTO-9: 「ボクを信じて……」]`:ko?`${baseTitle} · [TUTO-9: "날 믿어요..."]`:`${baseTitle} · [TUTO-9: "Trust me..."]`;
    }else{
      document.title=baseTitle;
    }
  },[g.data.stage,g.progress.completed,g.dialogue.tone,g.dialogue.speaker,ko,ja]);

  useEffect(()=>{
    const handleVisibility=()=>{
      if(document.hidden){
        document.title=ja?'👀 どこへ行くんですか？ ガイドが待っていますよ……':ko?'👀 어디 가요? 가이드가 기다립니다...':'👀 Where are you going?';
      }
    };
    document.addEventListener('visibilitychange',handleVisibility);
    return()=>document.removeEventListener('visibilitychange',handleVisibility);
  },[ko,ja]);

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if((e.target as HTMLElement)?.matches('input,textarea,select')||e.ctrlKey||e.metaKey||e.altKey)return;
      if(e.key==='Escape'){close();return;}
      if(panel||g.ending!==null)return;
      const k=e.key.toLowerCase();
      if(k==='h'){g.hint();setPanel('hint');}
      if(k==='j')setPanel('journal');
      if(k==='m')setPanel('map');
      if(k==='i')setPanel('inventory');
      if(k==='e')g.inspect();
      if(k===' '&&e.target===document.body){e.preventDefault();setting('showHotspots',!settings.showHotspots);}
      if(k==='?'||k==='F1'){e.preventDefault();setPanel('help');}
    };
    window.addEventListener('keydown',onKey);
    return()=>window.removeEventListener('keydown',onKey);
  },[g,panel,settings.showHotspots]);

  const fullscreen=async()=>{
    try{
      if(document.fullscreenElement)await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    }catch{
      g.notify('이 브라우저에서는 전체 화면을 지원하지 않습니다.');
    }
  };

  const downloadRegion=async(all=false)=>{
    if(!('caches' in window)){g.notify('이 브라우저에서는 오프라인 저장을 지원하지 않습니다.');return;}
    setDownloading(1);
    try{
      const cache=await caches.open('deceptive-guide-v1');
      const urls=all?regions.map((_,i)=>`/images/region-${i+1}.jpg`):[g.stage.backgroundBundle];
      await cache.addAll(['/','/index.html','/manifest.webmanifest','/icon.svg']);
      for(let i=0;i<urls.length;i++){
        await cache.add(urls[i]);
        setDownloading(Math.round((i+1)/urls.length*100));
      }
      g.notify(all?'10개 지역의 오프라인 다운로드가 완료되었습니다.':'현재 지역을 오프라인에서 플레이할 수 있습니다.');
    }catch{
      g.notify('다운로드를 완료하지 못했습니다. 연결 상태와 저장 공간을 확인하세요.');
    }finally{
      setDownloading(0);
    }
  };

  const openHint=()=>{g.hint();setPanel('hint');};

  return (
    <div className={`app ${settings.contrast?'high-contrast':''} ${settings.reduced?'reduced-motion':''} ${settings.largeText?'large-text':''}`}>
      <header className="site-header">
        <a className="brand" href="#adventure" onClick={e=>{e.preventDefault();close();}} aria-label="거짓말하는 튜토리얼 홈">
          <span className="brand-mark"><Compass size={26} strokeWidth={1.4}/></span>
          <span><strong>{ja?'偽りのチュートリアル':ko?'거짓말하는 튜토리얼':'DECEPTIVE GUIDE'}<span className="brand-period">.</span></strong><small>{ja?'DECEPTIVE GUIDE · 偽りの案内人':'DECEPTIVE GUIDE'}</small></span>
        </a>
        <nav className="main-nav" aria-label="게임 메뉴">
          <button className={panel===null?'active':''} onClick={close}><Compass size={17}/>{t.adventure}<span className="nav-active-dot"/></button>
          <button className={panel==='journal'?'active':''} onClick={()=>setPanel('journal')}><BookOpen size={17}/>{t.journal}{g.data.evidence.length>0&&<span className="nav-count">{g.data.evidence.length}</span>}</button>
          <button className={panel==='map'?'active':''} onClick={()=>setPanel('map')}><Map size={17}/>{t.worldMap}</button>
        </nav>
        <div className="header-actions">
          <button className="save-indicator" onClick={()=>setPanel('save')}>
            <span className={g.saved?'saved-dot':'saving-dot'}/><span>{g.saved?t.saved:t.saving}</span>
          </button>
          <button className="icon-button lang-toggle-btn" onClick={()=>setting('language',lang==='ko'?'ja':lang==='ja'?'en':'ko')} title={ja?'言語切替 (現在: 日本語)':ko?'언어 전환 (현재: 한국어)':'Language (Current: English)'} style={{fontSize:'11px',fontWeight:'bold',padding:'0 8px',minWidth:'36px'}}>
            {lang.toUpperCase()}
          </button>
          <span className="header-divider"/>
          <button className="icon-button" onClick={()=>setting('sound',!settings.sound)} aria-label={settings.sound?'효과음 끄기':'효과음 켜기'} title={settings.sound?'효과음 끄기':'효과음 켜기'}>
            {settings.sound?<Volume2 size={19}/>:<VolumeX size={19}/>}
          </button>
          <button className={`icon-button ${panel==='settings'?'selected':''}`} onClick={()=>setPanel('settings')} aria-label="설정">
            <Settings2 size={19}/>
          </button>
        </div>
      </header>

      <main id="adventure" className="main-content">
        <section className="stage-heading">
          <div className="stage-heading-left">
            <span className="chapter-number">{String(g.stage.regionId).padStart(2,'0')}</span>
            <div>
              <div className="breadcrumb">
                <span>CHAPTER {String(g.stage.regionId).padStart(2,'0')}</span>
                <span className="breadcrumb-line"/>
                <span>{ja?japaneseRegions[g.stage.regionId-1].name:ko?region.name:region.en}</span>
              </div>
              <h1>{ko?g.stage.title:g.stage.translations.en.title}</h1>
            </div>
          </div>
          <div className="stage-heading-right">
            <span className="stage-pill"><span className="tiny-diamond"/>{t.stage} <strong>{String(g.data.stage).padStart(2,'0')}</strong><span>/ 50</span></span>
            <button className="icon-button" onClick={fullscreen} title={isFullscreen?'전체 화면 종료':'전체 화면'} aria-label="전체 화면 전환"><Expand size={18}/></button>
            <button className="icon-button desktop-help" onClick={()=>setPanel('help')} title="플레이 방법" aria-label="플레이 방법"><CircleHelp size={18}/></button>
          </div>
        </section>

        <Scene game={g} settings={settings} onHints={openHint} onToggleHotspots={()=>setting('showHotspots',!settings.showHotspots)}/>

        <section className={`inventory-bar ${g.selectedItem?'has-selection':''}`} aria-label="인벤토리">
          <button className="inventory-title" onClick={()=>setPanel('inventory')}>
            <span className="inventory-title-icon"><PackageOpen size={20}/></span>
            <span><strong>{t.inventory}</strong><small>{g.data.inventory.length}{ja?'個のアイテム':ko?'개의 소지품':' items'}</small></span>
            <kbd>I</kbd>
          </button>
          <div className="inventory-items" ref={inventoryRef}>
            {Array.from({length:Math.max(7,g.data.inventory.length)},(_,index)=>{
              const item=g.data.inventory[index];
              const localizedItem = item ? localizeOption(item, lang) : '';
              return item?(
                <button key={index} className={`inventory-slot ${g.selectedItem===item?'selected':''}`} onClick={()=>{if(item==='정비 수첩'){setPanel('journal');return;}g.selectItem(item);}} title={`${localizedItem} · ${ja?'クリックして選択':ko?'클릭해서 선택':'Click to select'}`} aria-label={`${localizedItem} ${g.selectedItem===item?(ja?'選択中':ko?'선택됨':'Selected'):(ja?'選択':ko?'선택':'Select')}`} aria-pressed={g.selectedItem===item}>
                  <span className="slot-number">{index+1}</span>
                  <ItemArt name={item}/>
                  <span className="item-tooltip">{localizedItem}</span>
                  {g.selectedItem===item&&<span className="selected-check"><Check size={10}/></span>}
                </button>
              ):(
                <div className="inventory-slot empty" key={index}><span className="slot-number">{index+1}</span><span className="empty-cross">+</span></div>
              );
            })}
          </div>
          <button className="inventory-more icon-button" onClick={()=>setPanel('inventory')} aria-label={t.viewAllItems}><MoreHorizontal size={20}/></button>
          <div className="memory-counter">
            <span className="memory-icon"><Sparkles size={19}/></span>
            <span><small>{t.memories}</small><strong>{String(g.data.logs.length).padStart(2,'0')} <span>/ 50</span></strong></span>
          </div>
        </section>

        <div className="under-inventory">
          {g.selectedItem?(
            <span className="selected-item-note"><Wrench size={13}/><strong>{localizeOption(g.selectedItem, lang)}</strong> {ja?'選択中 · 場面内の対象をクリックして使用してください。':ko?'선택됨 · 장면 속 대상에 클릭해 사용하세요.':'selected · Click target in scene.'}<button onClick={()=>g.selectItem(g.selectedItem!)}><X size={12}/> {ja?'解除':ko?'선택 해제':'Deselect'}</button></span>
          ):(
            <span><MouseHint/>{ja?'アイテムを選択したあと場面内のオブジェクトに使用してください。':ko?'아이템을 선택한 뒤 장면 속 사물에 사용하세요.':'Select an item and click an object in the scene.'}</span>
          )}
          <span className="inventory-capacity">{ja?'所持品は自動で保管されます':ko?'소지품은 자동으로 보관됩니다':'Items auto-stowed'} <ShieldCheck size={12}/></span>
        </div>

        <footer className="game-footer">
          <span className="footer-motto"><span className="tiny-diamond"/>{t.motto}</span>
          <div>
            <span><Clock3 size={13}/>{formatTime(g.data.playTime)}</span>
            <span className="footer-dot">·</span>
            <button onClick={()=>setPanel('help')}><Keyboard size={15}/>{t.controls}</button>
            <span className="footer-dot">·</span>
            <span className="version-label">v.1.0 <span className="offline-dot"/> LOCAL SAVE</span>
          </div>
        </footer>
      </main>

      {g.toast&&<div className="toast" role="status"><CheckCheck size={17}/>{g.toast}</div>}

      {panel==='journal'&&(
        <Modal title={t.journal} eyebrow="PIN-04 · FIELD NOTES" onClose={close} wide>
          <div className="modal-description">{ja?'ガイドの言葉ではなく、自ら発見した事実を記録する。':ko?'가이드의 말이 아닌, 직접 발견한 사실을 기록합니다.':'Records facts discovered firsthand, not the guide\'s words.'}</div>
          <div className="journal-toolbar">
            <div className="tab-group">
              <button className={journalTab==='evidence'?'active':''} onClick={()=>setJournalTab('evidence')}>{ja?'観察記録':ko?'관찰 기록':'Evidence'} <span>{g.data.evidence.length}</span></button>
              <button className={journalTab==='memories'?'active':''} onClick={()=>setJournalTab('memories')}>{t.memories} <span>{g.data.logs.length}</span></button>
            </div>
            <button className="secondary-button" onClick={()=>setShowPersonality(true)} style={{padding:'6px 11px',fontSize:'10px',gap:'5px'}} title={t.getPersonalityReport}><Award size={13}/> {t.personalityReport}</button>
            <label className="search-field"><Search size={15}/><input value={journalSearch} onChange={e=>setJournalSearch(e.target.value)} placeholder={ja?'記録検索':ko?'기록 검색':'Search'}/></label>
          </div>
          <div className="journal-entries">
            {journalTab==='evidence'?(g.data.evidence.length===0?(
              <div className="empty-state">
                <BookOpen size={35}/>
                <h3>{ja?'まだ開かれていない物語':ko?'아직 펼치지 않은 이야기':'Unexplored Story'}</h3>
                <p>{ja?'場面内の瞳マークの調査ポイントをクリックしてください。<br/>発見した証拠がここに蓄積されます。':ko?'장면 속 눈 모양의 조사 지점을 클릭하세요.<br/>발견한 증거가 이곳에 차곡차곡 쌓입니다.':'Click the eye inspection points in the scene.'}</p>
                <button className="primary-button" onClick={()=>{close();g.inspect();}}>{ja?'最初の装置を調べる':ko?'첫 번째 장치 조사하기':'Inspect First Object'} <Eye size={16}/></button>
              </div>
            ):(
              g.data.evidence.filter(e=>(localizeDialogue(e.text, lang)+(ko?stages[e.stage-1].title:stages[e.stage-1].translations.en.title)).includes(journalSearch)).slice().reverse().map(e=>(
                <article className="journal-entry" key={`${e.stage}-${e.step}`}>
                  <span className="entry-number">{String(e.stage).padStart(2,'0')}</span>
                  <div>
                    <div className="entry-meta">CHAPTER {stages[e.stage-1].regionId} <span>·</span> {ja?'直接観察した証拠':ko?'직접 관찰한 증거':'Direct Evidence'} <Check size={12}/></div>
                    <h3>{ko?stages[e.stage-1].title:stages[e.stage-1].translations.en.title}</h3>
                    <p>{localizeDialogue(e.text, lang)}</p>
                    <button onClick={()=>{g.enter(e.stage);close();}}>{ja?'この場所へ戻る':ko?'이 장소로 돌아가기':'Return to Stage'} <ArrowRight size={13}/></button>
                  </div>
                </article>
              ))
            )):(
              <>
                <div className="memory-explanation">
                  <Sparkles size={18}/>
                  <p>{ja?'異なる場所の記憶10個を集めると、最後の中央案内塔で管理者ルートを解読できます。':ko?'서로 다른 장소의 기억 10개를 모으면 마지막 안내탑에서 관리자 경로를 해독할 수 있습니다.':'Collect 10 memories across locations to decode the administrator path.'} <strong>{g.data.logs.length} / 10</strong></p>
                </div>
                {g.data.logs.length===0?(
                  <div className="empty-state"><Sparkles size={34}/><h3>{ja?'床の小さな物語を探してみよう':ko?'바닥의 작은 이야기를 찾아보세요':'Search the ground'}</h3><p>{ja?'すべての場面には色褪せた記憶の欠片が一つずつ隠されています。':ko?'모든 장면에는 빛바랜 기억 조각이 하나씩 숨겨져 있습니다.':'Faded memories are hidden in every scene.'}</p></div>
                ):(
                  g.data.logs.filter(id=>(ko?stages[id-1].title:stages[id-1].translations.en.title).includes(journalSearch)).map(id=>(
                    <article className="journal-entry" key={id}>
                      <span className="entry-number"><Sparkles size={22}/></span>
                      <div><div className="entry-meta">MEMORY {String(id).padStart(2,'0')}</div><h3>{ko?stages[id-1].title:stages[id-1].translations.en.title}</h3><p>{ja?'「案内とは、選択の代行のために作られたものではない。」':ko?'“안내는 선택을 대신하기 위해 만들어진 것이 아니다.”':'Guidance was not made to replace choice.'}</p><button onClick={()=>{g.enter(id);close();}}>{ja?'記録を発見した場所':ko?'기록을 발견한 장소':'Discovered Location'} <ArrowRight size={13}/></button></div>
                    </article>
                  ))
                )}
              </>
            )}
          </div>
        </Modal>
      )}

      {panel==='map'&&(
        <Modal title={ja?'十の地域、一つの旅路':ko?'열 개의 지역, 하나의 여정':'Ten Regions, One Journey'} eyebrow="THE WORLD OF DECEPTIVE GUIDE" onClose={close} wide>
          <div className="map-summary"><span>{ja?'見つけた道はいつでも再び歩くことができます。':ko?'발견한 길은 언제든 다시 걸을 수 있습니다.':'Walk rediscovered paths at any time.'}</span><span><Flag size={14}/><strong>{completeCount}</strong> / 50 {t.completed}</span></div>
          <div className="region-grid">
            {regions.map((r,index)=>{
              const start=index*5+1,unlocked=start<=maxStage;
              return (
                <article className={`region-card ${unlocked?'':'region-locked'} ${g.stage.regionId===index+1?'current-region':''}`} key={r.name}>
                  <div className="region-card-image" style={{backgroundImage:`url(/images/region-${index+1}.jpg)`}}>
                    <span className="region-index">{String(index+1).padStart(2,'0')}</span>
                    {!unlocked&&<LockKeyhole className="region-lock" size={24}/>}
                    {g.stage.regionId===index+1&&<span className="current-location"><MapPin size={11}/> {t.currentLocation}</span>}
                  </div>
                  <div className="region-card-content">
                    <h3>{ja?japaneseRegions[index].name:ko?r.name:r.en}</h3>
                    <p>{ja?japaneseRegions[index].subtitle:ko?r.subtitle:(englishRegionSubtitles[index]||r.subtitle)}</p>
                    <div className="stage-buttons">
                      {Array.from({length:5},(_,n)=>start+n).map(id=>(
                        <button key={id} disabled={id>maxStage} className={id===g.data.stage?'current':g.data.progress[id]?.completed?'finished':''} onClick={()=>{g.enter(id);close();}} title={ko?stages[id-1].title:stages[id-1].translations.en.title}>
                          {g.data.progress[id]?.completed?<Check size={13}/>:String(id).padStart(2,'0')}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Modal>
      )}

      {panel==='hint'&&(
        <Modal title={ja?'整備記録をめくる':ko?'정비 기록을 펼치다':'Unfold Field Notes'} eyebrow="AN HONEST HINT · NOT FROM TUTO-9" onClose={close}>
          <div className="hint-stage"><Lightbulb size={20}/><span>{ko?g.stage.title:g.stage.translations.en.title}<small>{localizeOption(g.puzzle.name, lang)}</small></span><span className="hint-level">{Math.max(1,g.hintLevel)} / 3</span></div>
          <p className="modal-description">{ja?'PIN-04が残した整備記録です。一歩ずつ、自ら発見する余地を残しています。':ko?'PIN-04가 남긴 정비 기록입니다. 한 번에 한 걸음씩, 직접 발견할 여지를 남겨 둡니다.':'Field notes left by PIN-04.'}</p>
          <div className="hint-cards">
            {[1,2,3].map(level=>(
              <div className={`hint-card ${g.hintLevel>=level?'revealed':''}`} key={level}>
                <span className="hint-number">0{level}</span>
                <div>
                  <h3>{level===1?(ja?'周辺を観察する':ko?'주변을 관찰하기':'Observe Surroundings'):level===2?(ja?'異なる証拠を比較する':ko?'서로 다른 증거 비교하기':'Compare Different Clues'):(ja?'仕組みの原理を見つける':ko?'행동의 원리 찾기':'Discover Mechanism')}</h3>
                  <p>{g.hintLevel<level?(ja?'まだ開かれていない整備記録':ko?'아직 열지 않은 정비 기록':'Unrevealed record'):level===1?`「${localizeOption(g.puzzle.name, lang)}」 ${ja?'周囲の摩耗痕、配線、動きを調査しよう。':ko?'주변의 마모 자국, 연결선, 움직임을 조사해 보자. 눈 모양 조사 지점에서 기록을 얻을 수 있다.':'Inspect wear marks and motions nearby.'}`:level===2?(ja?'TUTO-9の案内と直接観察した記録を比較しよう。':ko?'TUTO-9의 안내와 직접 조사한 기록을 나란히 비교하자. 라벨보다 실제로 이어진 연결과 반복되는 현상이 중요하다.':'Compare advice with observed facts.'):g.puzzle.kind==='item'?(ja?'床から道具を拾い所持品から選択しよう。':ko?'바닥에서 도구를 주운 뒤 인벤토리에서 선택하자. 도구의 형태와 장치의 홈이 맞는 대상에 사용한다.':'Pick up tools and select them.'):g.puzzle.kind==='wait'?(ja?'一度作動させたら手を離し圧力を待とう。':ko?'한 번 작동한 후에는 손을 떼고 압력 반응을 지켜보자. 재작동하면 기다린 시간이 초기화된다.':'Wait without touching again.'):g.puzzle.kind==='timing'?(ja?'周期表示が明るい間に移動しよう。':ko?'주기 표시에서 발판이 연결되었다는 문구가 나타나는 동안 이동한다. 설정에서 안전 구간을 넓힐 수 있다.':'Move during safe window.'):g.puzzle.kind==='sequence'?(ja?'検証した物理的な順序通りに入力しよう。':ko?'정비 일지에 기록한 물리적 흐름의 처음부터 차례대로 입력하자. 잘못 누르면 처음부터 다시 시작한다.':'Input in verified sequence.'):g.puzzle.kind==='balance'?(ja?'基準の重りと合計が同じになるよう箱を載せよう。':ko?'상자는 각각 한 번씩 올릴 수 있다. 기준 추와 무게의 합이 같아지면 저울 확인을 누르자.':'Balance the weights.'):(ja?'実際の配線と一致する対象を作動させよう。':ko?'조사 기록에서 잠금장치로 실제 이어지는 대상, 또는 흔적과 일치하는 대상을 작동하자. 안내와 무조건 반대로 행동할 필요는 없다.':'Act upon actual wirings.')}</p>
                </div>
                {g.hintLevel<level&&<LockKeyhole size={15}/>}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <span>{ja?'ヒントを使用しても進行にペナルティはありません。':ko?'힌트 사용은 진행을 막지 않습니다.':'Hints will not prevent progression.'}</span>
            {g.hintLevel<3?<button className="primary-button" onClick={g.hint}>{ja?'次の記録を見る':ko?'다음 기록 펼치기':'Next Hint'} <ChevronRight size={16}/></button>:<button className="primary-button" onClick={()=>{g.inspect();close();}}>{ja?'場面を再調査する':ko?'장면을 다시 조사하기':'Inspect Scene'} <Eye size={16}/></button>}
          </div>
        </Modal>
      )}

      {panel==='inventory'&&(
        <Modal title={ja?'小さなロボットの所持品':ko?'작은 로봇의 소지품':'Tiny Robot\'s Pouch'} eyebrow="PIN-04 · TOOL POUCH" onClose={close}>
          <p className="modal-description">{ja?'道具を選択して場面内のオブジェクトをクリックしてください。':ko?'도구를 선택하고 장면 속 사물을 클릭해 사용하세요. 사용한 도구의 흔적도 단서가 됩니다.':'Select a tool and click an object.'}</p>
          <div className="inventory-grid">
            {g.data.inventory.map((item,index)=>(
              <button key={item} className={g.selectedItem===item?'selected':''} onClick={()=>{if(item==='정비 수첩'){setPanel('journal');return;}g.selectItem(item);close();}}>
                <span className="inventory-item-index">{String(index+1).padStart(2,'0')}</span>
                <ItemArt name={item}/>
                <strong>{localizeOption(item, lang)}</strong>
                <small>{g.selectedItem===item?(ja?'選択中':ko?'선택됨':'Selected'):(ja?'選択して使用':ko?'선택하여 사용':'Select')}</small>
              </button>
            ))}
          </div>
          <div className="item-tip"><Wrench size={17}/><p>{ja?'アイテム名を過信せず、形状と摩耗の痕跡を観察しましょう。':ko?'아이템 이름을 믿기 어렵다면, 형태와 사용 흔적을 관찰하세요.':'Observe the tool\'s shape rather than its label.'}</p></div>
        </Modal>
      )}

      {panel==='settings'&&(
        <Modal title={ja?'あなたに合わせた冒険':ko?'당신에게 맞는 모험':'Settings & Accessibility'} eyebrow="SETTINGS & ACCESSIBILITY" onClose={close}>
          <div className="settings-scroll">
            <h3 className="settings-section-title">{ja?'音と画面':ko?'소리와 화면':'Audio & Visual'}</h3>
            <Toggle label={ja?'効果音':ko?'효과음':'Sound Effects'} description={ja?'電子音と機械の反応音':ko?'작은 전자음과 장치의 반응':'Beeps and mechanical interactions'} checked={settings.sound} onChange={()=>setting('sound',!settings.sound)}/>
            <Toggle label={ja?'空間の響き':ko?'공간의 소리':'Ambience'} description={ja?'静かな機械の共鳴音':ko?'낮고 잔잔한 기계의 공명':'Subtle resonance of the machinery'} checked={settings.music} onChange={()=>setting('music',!settings.music)}/>
            <Toggle label={ja?'高コントラスト':ko?'고대비 · 색상 보조':'High Contrast'} description={ja?'明確な輪郭と文字':ko?'선명한 윤곽과 글자 · 색상은 기호와 함께 표시':'Crisp borders and symbols'} checked={settings.contrast} onChange={()=>setting('contrast',!settings.contrast)}/>
            <Toggle label={ja?'大きな文字':ko?'큰 글자':'Large Text'} description={ja?'対話と整備記録を読みやすく':ko?'대화와 정비 기록을 더 편하게 읽기':'Comfortable font size'} checked={settings.largeText} onChange={()=>setting('largeText',!settings.largeText)}/>
            <Toggle label={ja?'演出軽減':ko?'움직임 줄이기':'Reduced Motion'} description={ja?'画面の揺れとグリッチ効果をオフ':ko?'장식 애니메이션과 입자 효과 끄기':'Disable shake and glitch'} checked={settings.reduced} onChange={()=>setting('reduced',!settings.reduced)}/>
            
            <h3 className="settings-section-title">{ja?'アクセシビリティ':ko?'플레이 접근성':'Gameplay Accessibility'}</h3>
            <Toggle label={ja?'緩やかな機械周期':ko?'여유로운 기계 주기':'Gentle Machine Cycles'} description={ja?'タイミングパズルの安全区間を拡大':ko?'타이밍 퍼즐의 안전 구간 넓히기':'Wider safe window for timing'} checked={settings.slow} onChange={()=>setting('slow',!settings.slow)}/>
            <Toggle label={ja?'調査対象を常時表示':ko?'조사 대상 항상 표시':'Always Show Hotspots'} description={ja?'すべての調査ポイントにラベル表示':ko?'모든 조사 지점과 아이템에 이름 표시':'Reveal all inspectable objects'} checked={settings.showHotspots} onChange={()=>setting('showHotspots',!settings.showHotspots)}/>
            
            <label className="language-setting">
              <span><Globe2 size={17}/> {t.language}</span>
              <select value={settings.language} onChange={e=>setting('language',e.target.value as 'ko'|'en'|'ja')}>
                <option value="ko">한국어 (Korean)</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="en">English (Global)</option>
              </select>
            </label>

            <h3 className="settings-section-title">{ja?'オフラインプレイ':ko?'오프라인 플레이':'Offline Play'}</h3>
            <p className="settings-note">{ja?'現在の進行状況は自動保存されます。':ko?'현재 장면은 자동 보관됩니다. 전체 지역을 다운로드하면 네트워크 없이 여정을 이어갈 수 있습니다.':'Current progress is saved locally.'}</p>
            <div className="offline-buttons">
              <button className="secondary-button" disabled={downloading>0} onClick={()=>void downloadRegion(false)}><ArrowDownToLine size={16}/>{ja?'現在の地域':ko?'현재 지역':'Current Region'}</button>
              <button className="secondary-button" disabled={downloading>0} onClick={()=>void downloadRegion(true)}><Download size={16}/>{downloading?`${ja?'保存中':ko?'저장 중':'Downloading'} ${downloading}%`:(ja?'全10地域ダウンロード':ko?'전체 10개 지역 다운로드':'Download All 10 Regions')}</button>
            </div>

            <div className="reset-section">
              {confirmReset?(
                <>
                  <p>{ja?'すべての進行記録を初期化して最初の部屋からやり直しますか？':ko?'모든 진행 기록을 지우고 첫 교육실에서 시작할까요?':'Reset all progress and start fresh from Stage 1?'}</p>
                  <div>
                    <button className="danger-button" onClick={()=>{g.reset();setConfirmReset(false);close();}}>{ja?'新しい冒険を開始':ko?'새 모험 시작':'Reset Adventure'}</button>
                    <button className="secondary-button" onClick={()=>setConfirmReset(false)}>{ja?'キャンセル':ko?'취소':'Cancel'}</button>
                  </div>
                </>
              ):(
                <button className="text-button" onClick={()=>setConfirmReset(true)}><RotateCcw size={14}/>{t.restartFromBeginning}</button>
              )}
            </div>

            {import.meta.env.DEV&&(
              <div className="dev-tools">
                <strong>Development · Stage Selector</strong>
                <select aria-label="Development Stage Selector" value={g.data.stage} onChange={e=>{g.enter(Number(e.target.value));close();}}>
                  {stages.map(s=><option key={s.stageId} value={s.stageId}>{s.stageId}. {s.title}</option>)}
                </select>
                <code>{JSON.stringify(validateStages())}</code>
              </div>
            )}
          </div>
        </Modal>
      )}

      {panel==='save'&&(
        <Modal title={ja?'旅路は記憶される':ko?'여정은 기억됩니다':'Journey is Saved'} eyebrow="SAVE & CONTINUE" onClose={close}>
          <div className="save-card">
            <img src={g.stage.backgroundBundle} alt="현재 지역"/>
            <div>
              <span className="eyebrow">AUTOSAVE · LOCAL</span>
              <h3>{ko?g.stage.title:g.stage.translations.en.title}</h3>
              <p>{ja?japaneseRegions[g.stage.regionId-1].name:ko?region.name:region.en} · {t.stage} {g.data.stage} / 50</p>
              <span><Clock3 size={13}/>{formatTime(g.data.playTime)} <span>·</span><Sparkles size={13}/>{g.data.logs.length} {t.memories}</span>
            </div>
            <ShieldCheck size={27}/>
          </div>
          <p className="modal-description">{ja?'進行状況やパズルの状態はこの端末に自動保存されます。':ko?'이동, 발견한 단서, 퍼즐 상태와 가이드의 행동 변형은 이 기기에 자동으로 저장됩니다. 다른 브라우저와는 공유되지 않습니다.':'Progress is automatically saved to this device locally.'}</p>
          <div className="save-actions">
            <button className="primary-button" onClick={()=>{void g.save();close();}}><Save size={16}/>{t.saveNow}</button>
            <button className="secondary-button" onClick={async()=>{
              const backup=await restoreBackup();
              if(backup){
                g.setData(backup);
                g.setDialogue({speaker:'PIN-04',tone:'clue',text:ja?'保存した位置に戻った。残された整備記録を再び確認しよう。':ko?'저장한 위치로 돌아왔다. 남겨 둔 정비 기록을 다시 확인하자.':'Returned to the saved checkpoint.'});
                g.notify(ja?'最後のセーブデータを読み込みました。':ko?'마지막 저장 기록을 불러왔습니다.':'Loaded latest save checkpoint.');
                close();
              }else{
                g.notify(ja?'この端末に復元できるバックアップがありません。':ko?'이 기기에 불러올 백업 기록이 없습니다.':'No backup save found.');
              }
            }}><FolderOpen size={16}/>{t.loadBackup}</button>
          </div>
        </Modal>
      )}

      {panel==='help'&&(
        <Modal title={ja?'小さな一歩から':ko?'작은 발걸음부터':'First Steps'} eyebrow="HOW TO PLAY" onClose={close}>
          <div className="help-characters">
            <Pin/><span>{ja?'観察し。':ko?'관찰하고.':'Observe.'}<br/>{ja?'疑い。':ko?'의심하고.':'Doubt.'}<br/><em>{ja?'自ら選べ。':ko?'스스로 선택하세요.':'Choose for yourself.'}</em></span><Tuto/>
          </div>
          <div className="controls-list">
            {[
              [ja?'移動':ko?'이동':'Move',ja?'床クリック / 方向キー':ko?'장면의 바닥 클릭 / 방향키':'Click floor / Arrow keys'],
              [ja?'調べる':ko?'상호작용':'Interact',ja?'対象クリック / Tab → Enter':ko?'물체 클릭 / Tab → Enter':'Click / Tab → Enter'],
              [ja?'周辺調査':ko?'주변 조사':'Inspect',ja?'Eキー · 記録は日誌へ':ko?'E · 조사 기록은 일지에 보관':'E key'],
              [ja?'対象表示':ko?'조사 대상 표시':'Hotspots',ja?'Spaceキー':ko?'Space · 바닥에 포커스가 없을 때':'Space key'],
              [ja?'所持品':ko?'인벤토리':'Inventory',ja?'Iキー':ko?'I · 아이템 선택 후 대상 클릭':'I key'],
              [ja?'日誌 / 地図':ko?'정비 일지 / 지도':'Journal / Map','J / M'],
              [ja?'ヒント':ko?'정비 기록 힌트':'Honest Hint',ja?'Hキー · 最大3段階':ko?'H · 최대 3단계':'H key'],
              [ja?'閉じる':ko?'화면 닫기':'Close','Esc']
            ].map(([label,key])=>(
              <div key={label}><span>{label}</span><kbd>{key}</kbd></div>
            ))}
          </div>
          <p className="help-note"><Lightbulb size={17}/>{ja?'ガイドの言葉は公式のヒントではありません。失敗しても大丈夫。観察した事実や所持品は失われません。':ko?'가이드의 말은 공식 힌트가 아닙니다. 실패해도 괜찮아요. 관찰한 사실과 소지품은 사라지지 않습니다.':'The guide\'s words are not genuine hints. Failures are safe.'}</p>
          <button className="primary-button help-start" onClick={close}>{ja?'冒険に戻る':ko?'모험으로 돌아가기':'Return to Adventure'} <Play size={15}/></button>
        </Modal>
      )}

      {g.ending!==null&&(
        <Modal
          title={g.ending===-1?(ja?'最後の選択は、あなたのもの':ko?'마지막 선택은, 당신의 것':'The Final Choice is Yours'):(ja?japaneseEndings[g.ending].title:ko?endings[g.ending].title:englishEndings[g.ending].title)}
          eyebrow={g.ending===-1?'THE FINAL TUTORIAL':(ja?japaneseEndings[g.ending].subtitle:ko?endings[g.ending].subtitle:englishEndings[g.ending].subtitle)}
          onClose={()=>g.setEnding(null)}
          wide
        >
          {g.ending===-1?(
            <>
              <p className="ending-intro">{ja?'案内は終わった。配線と記憶が示す真実を頼りに、PIN-04が自ら道を選択する。':ko?'안내는 끝났다. 전선과 기억이 가리키는 진실을 따라, PIN-04가 직접 길을 선택한다.':'Guidance is over. Guided only by wires and memories, PIN-04 chooses the final path.'}</p>
              <div className="ending-choices">
                {endings.map((e,index)=>(
                  <button key={e.title} onClick={()=>{
                    g.finish(index);
                    const achs=['ENDING_COMPLIANCE','ENDING_SHUTDOWN','ENDING_TOGETHER','ENDING_ADMIN'] as const;
                    unlockAchievement(achs[index],g.notify);
                  }} className={index===2?'truth-choice':''}>
                    <span className="ending-choice-number">0{index+1}</span>
                    <div>
                      <h3>{ja?['TUTO-9を信じて順応する','TUTO-9を完全に停止する','欺瞞モジュールのみ分離する','街の案内システムを解放する'][index]:ko?['TUTO-9를 믿고 순응한다','TUTO-9를 완전히 종료한다','거짓말 모듈만 제거한다','도시의 안내 시스템을 해방한다'][index]:['Trust TUTO-9 and Comply','Shut Down TUTO-9 Completely','Decouple Deception Module Only','Liberate the City Guidance System'][index]}</h3>
                      <p>{ja?['推奨出口 · 教習室へ戻る接続','禁止出口 · 主電源の完全遮断','保守通路 · ガラス印章でモジュール分離',`隠された管理者ポート · 記憶 ${g.data.logs.length} / 10個`][index]:ko?['추천 출구 · 교육실로 돌아가는 연결','금지 출구 · 주 전원 차단','유지보수 통로 · 유리 인장으로 모듈 분리',`숨겨진 관리자 접점 · 기억 ${g.data.logs.length} / 10개`][index]:['Recommended Exit · Loop back to tutorial','Forbidden Exit · Main power severed','Maintenance Vent · Decouple module with glass seal',`Hidden Admin Port · ${g.data.logs.length} / 10 Memories`][index]}</p>
                    </div>
                    {index===3&&g.data.logs.length<10?<LockKeyhole size={19}/>:<ArrowRight size={19}/>}
                  </button>
                ))}
              </div>
            </>
          ):(
            <>
              <div className={`ending-art ending-${g.ending}`} style={{backgroundImage:`url(/images/region-${g.ending===0?1:g.ending===1?9:4}.jpg)`}}>
                <Pin pose="victory"/>
                {g.ending!==1&&<Tuto pose="idle"/>}
                <span>{g.ending===3?'EVERY PATH IS YOURS':g.ending===2?'TOGETHER, WITHOUT A MAP':g.ending===1?'A QUIET GOODBYE':'WELCOME BACK, PIN-04'}</span>
              </div>
              <p className="ending-text">{ja?japaneseEndings[g.ending].text:ko?endings[g.ending].text:englishEndings[g.ending].text}</p>
              <div className="ending-footer">
                <span><Flag size={15}/>{ja?`到達したエンディング ${g.data.endings.length} / 4`:ko?`발견한 엔딩 ${g.data.endings.length} / 4`:`Endings Found: ${g.data.endings.length} / 4`}</span>
                <button className="primary-button" onClick={()=>setShowPersonality(true)} style={{background:'#d5b775',color:'#1b261b'}}><Award size={15}/> {t.getPersonalityReport}</button>
                <button className="secondary-button" onClick={()=>g.setEnding(-1)}>{ja?'他の分岐を見る':ko?'다른 연결 살펴보기':'Explore Other Paths'} <ArrowLeft size={15}/></button>
                <button className="primary-button" onClick={()=>{g.setEnding(null);setPanel('map');}}>{ja?'旅路を振り返る':ko?'여정 돌아보기':'View World Map'} <BookOpen size={15}/></button>
              </div>
            </>
          )}
        </Modal>
      )}

      {showPersonality&&<PersonalityModal data={g.data} settings={settings} onClose={()=>setShowPersonality(false)} onNotify={g.notify}/>}
      {fakeCrash&&<FakeCrashModal settings={settings} onRecover={()=>{setFakeCrash(false);g.setDialogue({speaker:'TUTO-9',tone:'fail',text:ja?'えっ……今のは何でもありません！ システム点検だっただけですよ！ ボクの言葉だけを信じてください！':ko?'어... 방금 아무 일도 없었습니다! 가이드 시스템 점검일 뿐이었어요! 제 말만 믿으세요!':'Uh... nothing happened! Trust me!'});g.notify(ja?'ガイドコアが緊急再起動されました。':ko?'가이드 코어가 긴급 재부팅되었습니다.':'Guide Core Rebooted.');}}/>}
    </div>
  );
}

function MouseHint(){
  return (
    <svg width="13" height="14" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <rect x="3" y="1" width="8" height="13" rx="4" stroke="currentColor"/>
      <path d="M7 2V6M3 6H11" stroke="currentColor"/>
    </svg>
  );
}
