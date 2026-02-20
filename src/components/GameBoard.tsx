import { useState } from 'react';
import { shuffleDeck } from '../game/deck';
import type { Card } from '../game/deck';
import './GameBoard.css';

function CardFace({ card }: { card: Card }) {
  return (
    <div className="card-face">
      <div className="card-value">{card.value}</div>
      <div className="card-name">{card.name}</div>
      <div className="card-desc">{card.description}</div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="card-back">
      <div className="card-back-pattern">♥</div>
    </div>
  );
}

export default function GameBoard() {
  const [deck, setDeck] = useState<Card[]>(() => {
    const shuffled = shuffleDeck();
    return shuffled.slice(2); // 처음 2장은 손패로 배분
  });

  const [playerHand, setPlayerHand] = useState<Card[]>(() => {
    const shuffled = shuffleDeck();
    return [shuffled[0]]; // 플레이어 1장
  });

  const [aiHandCount] = useState(1); // AI는 장수만 표시
  const [discardPile, setDiscardPile] = useState<Card[]>([]);

  const drawCard = () => {
    if (deck.length === 0) return;
    const [drawn, ...rest] = deck;
    setPlayerHand((prev) => [...prev, drawn]);
    setDeck(rest);
  };

  const discardCard = (index: number) => {
    const card = playerHand[index];
    setDiscardPile((prev) => [...prev, card]);
    setPlayerHand((prev) => prev.filter((_, i) => i !== index));
  };

  const topDiscard = discardPile[discardPile.length - 1];

  return (
    <div className="game-board">

      {/* 상단: AI 영역 */}
      <section className="zone ai-zone">
        <div className="zone-label">상대방 (AI)</div>
        <div className="ai-status">
          <div className="ai-hand">
            {Array.from({ length: aiHandCount }).map((_, i) => (
              <CardBack key={i} />
            ))}
          </div>
          <div className="ai-info">
            <span className="info-badge">손패: {aiHandCount}장</span>
            <span className="info-badge">생존 중</span>
          </div>
        </div>
      </section>

      {/* 중앙: 덱 & 버린 카드 */}
      <section className="zone center-zone">
        <div className="deck-area">
          <div className="pile-wrapper">
            <div className="pile-label">덱 ({deck.length}장)</div>
            <button
              className={`deck-pile ${deck.length === 0 ? 'empty' : ''}`}
              onClick={drawCard}
              disabled={deck.length === 0}
              title="클릭하여 카드 뽑기"
            >
              {deck.length > 0 ? (
                <>
                  <CardBack />
                  <span className="draw-hint">클릭하여 뽑기</span>
                </>
              ) : (
                <span className="empty-label">소진</span>
              )}
            </button>
          </div>

          <div className="pile-wrapper">
            <div className="pile-label">버린 카드 ({discardPile.length}장)</div>
            <div className="discard-pile">
              {topDiscard ? (
                <CardFace card={topDiscard} />
              ) : (
                <span className="empty-label">없음</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 하단: 내 손패 */}
      <section className="zone player-zone">
        <div className="zone-label">내 손패</div>
        <div className="player-hand">
          {playerHand.length === 0 ? (
            <span className="empty-label">카드 없음</span>
          ) : (
            playerHand.map((card, i) => (
              <div key={card.id} className="player-card-wrapper">
                <CardFace card={card} />
                <button
                  className="discard-btn"
                  onClick={() => discardCard(i)}
                >
                  버리기
                </button>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
