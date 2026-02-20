import { useState } from 'react';
import { shuffleDeck } from '../game/deck';
import type { Card } from '../game/deck';
import './GameBoard.css';

const CARD_COLORS: Record<number, string> = {
  1: '#6c8ebf',
  2: '#82b366',
  3: '#d6ae6b',
  4: '#9673a6',
  5: '#d0815a',
  6: '#c0444a',
  7: '#a0a0a0',
  8: '#c8a0c8',
};

function CardFace({ card, onClick, selected }: { card: Card; onClick?: () => void; selected?: boolean }) {
  const accent = CARD_COLORS[card.value] ?? '#888';
  return (
    <div
      className={`card-face${selected ? ' selected' : ''}${onClick ? ' clickable' : ''}`}
      style={{ '--accent': accent } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="cf-header">
        <span className="cf-value">{card.value}</span>
        <span className="cf-name">{card.name}</span>
      </div>
      <div className="cf-icon">{card.value}</div>
      <div className="cf-desc">{card.description}</div>
    </div>
  );
}

function CardBack({ small }: { small?: boolean }) {
  return <div className={`card-back${small ? ' small' : ''}`}><span className="cb-inner">♥</span></div>;
}

function PlayerPanel({ name, handCount, isAI }: { name: string; handCount: number; isAI?: boolean }) {
  return (
    <div className={`player-panel${isAI ? ' ai' : ' me'}`}>
      <div className="pp-avatar">{name[0]}</div>
      <div className="pp-info">
        <div className="pp-name">{name}</div>
        <div className="pp-badges">
          <span className="badge badge-rose">생존 중</span>
          <span className="badge badge-gold">손패 {handCount}장</span>
        </div>
      </div>
    </div>
  );
}

export default function GameBoard() {
  const full = shuffleDeck();
  const [deck, setDeck] = useState<Card[]>(full.slice(3));
  const [playerHand, setPlayerHand] = useState<Card[]>([full[0]]);
  const [aiHandCount] = useState(1);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const drawCard = () => {
    if (deck.length === 0) return;
    const [drawn, ...rest] = deck;
    setPlayerHand((prev) => [...prev, drawn]);
    setDeck(rest);
  };

  const discardCard = () => {
    if (selected === null) return;
    const card = playerHand[selected];
    setDiscardPile((prev) => [...prev, card]);
    setPlayerHand((prev) => prev.filter((_, i) => i !== selected));
    setSelected(null);
  };

  const topDiscard = discardPile[discardPile.length - 1];

  return (
    <div className="gb-root">
      {/* 헤더 바 */}
      <header className="gb-header">
        <div className="gb-title">Love Letter</div>
        <div className="gb-turn-info">
          <span className="turn-badge">내 차례</span>
        </div>
        <div className="gb-actions-top">
          <button className="btn-ghost">규칙</button>
          <button className="btn-ghost">메뉴</button>
        </div>
      </header>

      <div className="gb-body">
        {/* 상단: AI 영역 */}
        <section className="zone zone-ai">
          <PlayerPanel name="AI" handCount={aiHandCount} isAI />
          <div className="ai-cards">
            {Array.from({ length: aiHandCount }).map((_, i) => (
              <CardBack key={i} />
            ))}
          </div>
        </section>

        {/* 중앙: 덱 & 버린 카드 */}
        <section className="zone zone-center">
          <div className="center-inner">
            {/* 덱 */}
            <div className="pile-group">
              <div className="pile-title">덱</div>
              <button
                className={`deck-btn${deck.length === 0 ? ' empty' : ''}`}
                onClick={drawCard}
                disabled={deck.length === 0}
              >
                {deck.length > 0
                  ? <><CardBack /><span className="deck-count">{deck.length}</span></>
                  : <span className="pile-empty">소진</span>
                }
              </button>
            </div>

            <div className="center-divider" />

            {/* 버린 카드 */}
            <div className="pile-group">
              <div className="pile-title">버린 카드</div>
              <div className="discard-slot">
                {topDiscard
                  ? <CardFace card={topDiscard} />
                  : <span className="pile-empty">없음</span>
                }
              </div>
            </div>
          </div>

          {/* 로그 */}
          <div className="game-log">
            <div className="log-title">게임 로그</div>
            <div className="log-entry">게임이 시작되었습니다.</div>
            {discardPile.length > 0 && (
              <div className="log-entry">
                <b>{discardPile[discardPile.length - 1].name}</b>을(를) 버렸습니다.
              </div>
            )}
          </div>
        </section>

        {/* 하단: 내 손패 */}
        <section className="zone zone-player">
          <PlayerPanel name="나" handCount={playerHand.length} />
          <div className="player-hand">
            {playerHand.length === 0
              ? <span className="pile-empty">손패가 없습니다</span>
              : playerHand.map((card, i) => (
                <CardFace
                  key={card.id}
                  card={card}
                  selected={selected === i}
                  onClick={() => setSelected(selected === i ? null : i)}
                />
              ))
            }
          </div>
          <div className="action-bar">
            <button
              className="btn-primary"
              onClick={drawCard}
              disabled={deck.length === 0}
            >
              카드 뽑기
            </button>
            <button
              className="btn-danger"
              onClick={discardCard}
              disabled={selected === null}
            >
              선택 카드 버리기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
