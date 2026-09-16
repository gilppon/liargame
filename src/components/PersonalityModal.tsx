import { useEffect, useRef, useState } from 'react';
import { Award, Check, Copy, Download, Share2, Sparkles, X } from 'lucide-react';
import { analyzePersonality, type PersonalityResult } from '../game/personality';
import { type SaveData, type Settings } from '../game/state';
import { playInteract } from '../game/audio';

export function PersonalityModal({
  data,
  settings,
  onClose,
  onNotify
}: {
  data: SaveData;
  settings: Settings;
  onClose: () => void;
  onNotify: (msg: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const p: PersonalityResult = analyzePersonality(data);

  const lang = settings.language;
  const isKo = lang === 'ko';
  const isJa = lang === 'ja';

  const title = isJa ? p.titleJa : isKo ? p.title : p.titleEn;
  const tagline = isJa ? p.taglineJa : isKo ? p.tagline : p.tagline;
  const description = isJa ? p.descriptionJa : isKo ? p.description : p.description;
  const tutoComment = isJa ? p.tutoCommentJa : isKo ? p.tutoComment : p.tutoComment;
  const pinComment = isJa ? p.pinCommentJa : isKo ? p.pinComment : p.pinComment;
  const stampText = isJa ? p.stampTextJa : isKo ? p.stampText : p.stampText;
  const highlights = (isJa && p.highlightsJa) ? p.highlightsJa : p.highlights;

  useEffect(() => {
    playInteract('switch', settings.sound);
  }, [settings.sound]);

  // 1. 클립보드 텍스트 복사 (X, 디스코드 등에 최적화된 포맷)
  const copyToClipboard = async () => {
    let text = '';
    if (isJa) {
      text = `📜 [Deceptive Guide · 偽りのチュートリアル]
━━━━━━━━━━━━━━━━━━━━━━━━
🏷️ 私の探索者傾向: 【${p.titleJa}】 (Grade: ${p.grade})
💬 ${p.taglineJa}

📊 行動分析データ:
• 懐疑指数: ${p.stats.skepticism}%
• 性急さ: ${p.stats.impatience}%
• 探求欲: ${p.stats.curiosity}%
• 執念と根気: ${p.stats.tenacity}%

🤖 ガイド(TUTO-9)の評価:
${p.tutoCommentJa}
━━━━━━━━━━━━━━━━━━━━━━━━
🕹️ あなたもガイドの嘘を見破れますか？
#DeceptiveGuide #偽りのチュートリアル #インディーゲーム`;
    } else if (!isKo) {
      text = `📜 [Deceptive Guide · Civic Behavior Report]
━━━━━━━━━━━━━━━━━━━━━━━━
🏷️ Explorer Archetype: 【${p.titleEn}】 (Grade: ${p.grade})
💬 ${p.tagline}

📊 Behavioral Analytics:
• Skepticism: ${p.stats.skepticism}%
• Impatience: ${p.stats.impatience}%
• Curiosity: ${p.stats.curiosity}%
• Tenacity: ${p.stats.tenacity}%

🤖 Guide (TUTO-9) Assessment:
${p.tutoComment}
━━━━━━━━━━━━━━━━━━━━━━━━
🕹️ Can you see through the guide's deception?
#DeceptiveGuide #IndieGame #Steam`;
    } else {
      text = `📜 [거짓말하는 튜토리얼 · Deceptive Guide]
━━━━━━━━━━━━━━━━━━━━━━━━
🏷️ 나의 탐험가 성향: 【${p.title}】 (Grade: ${p.grade})
💬 ${p.tagline}

📊 행동 분석 지표:
• 의심 지수: ${p.stats.skepticism}%
• 성급함: ${p.stats.impatience}%
• 탐구욕: ${p.stats.curiosity}%
• 뚝심과 집념: ${p.stats.tenacity}%

🤖 가이드(TUTO-9)의 평가:
${p.tutoComment}
━━━━━━━━━━━━━━━━━━━━━━━━
🕹️ 당신도 가이드의 거짓말을 간파할 수 있나요?
#거짓말하는튜토리얼 #DeceptiveGuide #인디게임`;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onNotify(isJa ? '診断書がクリップボードにコピーされました！ SNSに共有しましょう。' : isKo ? '성향 진단서가 클립보드에 복사되었습니다! SNS에 공유해 보세요.' : 'Report copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onNotify(isJa ? 'コピーに失敗しました。' : isKo ? '클립보드 복사에 실패했습니다.' : 'Failed to copy.');
    }
  };

  // 2. 순수 Canvas API를 활용한 무의존성 PNG 이미지 다운로드
  const downloadCardImage = () => {
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 540;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 배경
      const grad = ctx.createLinearGradient(0, 0, 800, 540);
      grad.addColorStop(0, '#1a221b');
      grad.addColorStop(1, '#111714');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 800, 540);

      // 테두리
      ctx.strokeStyle = '#d5b775';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, 760, 500);

      ctx.strokeStyle = '#425139';
      ctx.lineWidth = 1;
      ctx.strokeRect(26, 26, 748, 488);

      // 상단 헤더
      ctx.fillStyle = '#8e9c80';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('CIVIC BEHAVIOR CLASSIFICATION REPORT // PIN-04 & TUTO-9', 45, 58);

      ctx.fillStyle = '#d5b775';
      ctx.font = 'bold 28px serif';
      ctx.fillText(`【 ${title} 】`, 45, 100);

      ctx.fillStyle = '#a1b294';
      ctx.font = '13px sans-serif';
      ctx.fillText(tagline, 45, 130);

      // 본문 설명
      ctx.fillStyle = '#d8dbcb';
      ctx.font = '14px sans-serif';
      const words = description.split(' ');
      let line = '';
      let y = 175;
      for (const w of words) {
        const testLine = line + w + ' ';
        if (ctx.measureText(testLine).width > 480) {
          ctx.fillText(line, 45, y);
          line = w + ' ';
          y += 24;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 45, y);

      // 스탯 게이지 (우측)
      const statsList = [
        { label: isJa ? '懐疑指数 (Skepticism)' : isKo ? '의심 지수 (Skepticism)' : 'Skepticism', val: p.stats.skepticism, color: '#d97f62' },
        { label: isJa ? '性急さ (Impatience)' : isKo ? '성급함 (Impatience)' : 'Impatience', val: p.stats.impatience, color: '#e0c479' },
        { label: isJa ? '探求欲 (Curiosity)' : isKo ? '탐구욕 (Curiosity)' : 'Curiosity', val: p.stats.curiosity, color: '#76b9bd' },
        { label: isJa ? '執念 (Tenacity)' : isKo ? '뚝심 (Tenacity)' : 'Tenacity', val: p.stats.tenacity, color: '#97bd76' }
      ];

      statsList.forEach((st, idx) => {
        const sy = 80 + idx * 48;
        ctx.fillStyle = '#b0baa2';
        ctx.font = '11px sans-serif';
        ctx.fillText(`${st.label}: ${st.val}%`, 540, sy);

        ctx.fillStyle = '#222f25';
        ctx.fillRect(540, sy + 6, 210, 8);

        ctx.fillStyle = st.color;
        ctx.fillRect(540, sy + 6, (210 * st.val) / 100, 8);
      });

      // TUTO-9 코멘트 박스
      ctx.fillStyle = '#1e2920';
      ctx.fillRect(45, 290, 710, 80);
      ctx.strokeStyle = '#3e4e3a';
      ctx.strokeRect(45, 290, 710, 80);

      ctx.fillStyle = '#e8c76d';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(isJa ? '🤖 TUTO-9の総合評価' : isKo ? '🤖 TUTO-9의 종합 평점' : '🤖 TUTO-9 Assessment', 65, 316);

      ctx.fillStyle = '#c7d0bb';
      ctx.font = 'italic 13px sans-serif';
      ctx.fillText(tutoComment, 65, 345);

      // 하단 등급 도장 (스탬프)
      ctx.save();
      ctx.translate(650, 435);
      ctx.rotate(-0.15);
      ctx.strokeStyle = p.stampColor === 'danger' ? '#e64c38' : p.stampColor === 'gold' ? '#e2c56f' : '#4fa86c';
      ctx.lineWidth = 4;
      ctx.strokeRect(-80, -25, 160, 50);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(stampText, 0, 7);
      ctx.restore();

      // 하단 워터마크
      ctx.fillStyle = '#657458';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`STAGE ${data.stage} / 50 COMPLETED · DECEPTIVE GUIDE`, 45, 485);

      const link = document.createElement('a');
      link.download = `deceptive-guide-personality-${p.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      onNotify(isJa ? '診断書画像が保存されました！' : isKo ? '진단서 이미지가 저장되었습니다!' : 'Report image downloaded!');
    } catch {
      onNotify(isJa ? '画像の保存に失敗しました。' : isKo ? '이미지 저장에 실패했습니다.' : 'Failed to save image.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal modal-wide personality-modal" ref={cardRef} role="dialog" aria-modal="true" aria-label={isJa ? '探索者傾向診断書' : isKo ? '플레이어 성향 진단서' : 'Personality Report'}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">{isJa ? 'CIVIC BEHAVIOR REPORT · 機械都市整備局判定' : isKo ? 'CIVIC BEHAVIOR REPORT · 기계도시 정비국 판정' : 'CIVIC BEHAVIOR REPORT · BUREAU OF MAINTENANCE'}</span>
            <h2>{isJa ? '探索者傾向診断書' : isKo ? '플레이어 성향 진단서' : 'Personality Report'}</h2>
          </div>
          <button className="icon-button modal-close" onClick={onClose} aria-label={isJa ? '閉じる' : isKo ? '닫기' : 'Close'}>
            <X size={21} />
          </button>
        </div>

        <div className="personality-card-body">
          <div className="personality-main-header">
            <div className="personality-title-group">
              <span className="personality-grade-badge">GRADE {p.grade}</span>
              <h3 className="personality-title">{title}</h3>
              <span className="personality-title-en">{p.titleEn}</span>
            </div>
            <div className={`personality-stamp stamp-${p.stampColor}`}>
              <span>{stampText}</span>
            </div>
          </div>

          <p className="personality-tagline">{tagline}</p>

          <div className="personality-content-grid">
            <div className="personality-desc-box">
              <h4>📋 {isJa ? '整備局 行動観察所見' : isKo ? '정비국 행동 관찰 소견' : 'Observation Notes'}</h4>
              <p>{description}</p>

              <div className="personality-highlights">
                {highlights.map((h, i) => (
                  <span key={i} className="highlight-pill"><Check size={11} /> {h}</span>
                ))}
              </div>
            </div>

            <div className="personality-stats-box">
              <h4>📊 {isJa ? '行動傾向レーダー' : isKo ? '행동 성향 레이더' : 'Behavioral Metrics'}</h4>
              <div className="stat-bars">
                <div className="stat-row">
                  <div className="stat-labels"><span>{isJa ? '懐疑指数 (Skepticism)' : isKo ? '의심 지수 (Skepticism)' : 'Skepticism'}</span><strong>{p.stats.skepticism}%</strong></div>
                  <div className="stat-track"><div className="stat-fill stat-skeptic" style={{ width: `${p.stats.skepticism}%` }} /></div>
                </div>
                <div className="stat-row">
                  <div className="stat-labels"><span>{isJa ? '性急さ (Impatience)' : isKo ? '성급함 (Impatience)' : 'Impatience'}</span><strong>{p.stats.impatience}%</strong></div>
                  <div className="stat-track"><div className="stat-fill stat-impatient" style={{ width: `${p.stats.impatience}%` }} /></div>
                </div>
                <div className="stat-row">
                  <div className="stat-labels"><span>{isJa ? '探求欲 (Curiosity)' : isKo ? '탐구욕 (Curiosity)' : 'Curiosity'}</span><strong>{p.stats.curiosity}%</strong></div>
                  <div className="stat-track"><div className="stat-fill stat-curiosity" style={{ width: `${p.stats.curiosity}%` }} /></div>
                </div>
                <div className="stat-row">
                  <div className="stat-labels"><span>{isJa ? '執念と根気 (Tenacity)' : isKo ? '뚝심과 집념 (Tenacity)' : 'Tenacity'}</span><strong>{p.stats.tenacity}%</strong></div>
                  <div className="stat-track"><div className="stat-fill stat-tenacity" style={{ width: `${p.stats.tenacity}%` }} /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="personality-dialogue-box">
            <div className="tuto-voice-quote">
              <strong>🤖 {isJa ? 'ガイドTUTO-9の総合評価' : isKo ? '가이드 TUTO-9의 종합 평점' : 'Guide TUTO-9 Remarks'}</strong>
              <p>{tutoComment}</p>
            </div>
            <div className="pin-voice-quote">
              <strong>🔧 {isJa ? 'PIN-04の整備メモ' : isKo ? 'PIN-04의 정비 메모' : 'PIN-04 Notes'}</strong>
              <p>{pinComment}</p>
            </div>
          </div>
        </div>

        <div className="personality-actions-bar">
          <div className="action-hint">
            <Sparkles size={14} /> <span>{isJa ? '結果を保存してSNSで共有しよう！' : isKo ? '결과를 저장하거나 친구들에게 공유해 보세요!' : 'Save your report or share with friends!'}</span>
          </div>
          <div className="action-buttons">
            <button className="secondary-button" onClick={copyToClipboard}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? (isJa ? 'コピー完了！' : isKo ? '복사 완료!' : 'Copied!') : (isJa ? '結果をコピー' : isKo ? '결과 복사하기' : 'Copy Result')}
            </button>
            <button className="primary-button" onClick={downloadCardImage} disabled={downloading}>
              <Download size={15} />
              {downloading ? (isJa ? '保存中…' : isKo ? '저장 중…' : 'Saving…') : (isJa ? '診断書画像DL' : isKo ? '진단서 이미지 다운로드' : 'Download PNG')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
