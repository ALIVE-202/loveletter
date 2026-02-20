export interface Card {
  id: number;
  name: string;
  value: number;
  description: string;
}

const initialDeck: Card[] = [
  {
    id: 1,
    name: '경비병',
    value: 1,
    description: '다른 플레이어의 카드를 추측한다. 맞히면 그 플레이어는 탈락한다. (경비병은 추측 불가)',
  },
  {
    id: 2,
    name: '경비병',
    value: 1,
    description: '다른 플레이어의 카드를 추측한다. 맞히면 그 플레이어는 탈락한다. (경비병은 추측 불가)',
  },
  {
    id: 3,
    name: '경비병',
    value: 1,
    description: '다른 플레이어의 카드를 추측한다. 맞히면 그 플레이어는 탈락한다. (경비병은 추측 불가)',
  },
  {
    id: 4,
    name: '경비병',
    value: 1,
    description: '다른 플레이어의 카드를 추측한다. 맞히면 그 플레이어는 탈락한다. (경비병은 추측 불가)',
  },
  {
    id: 5,
    name: '경비병',
    value: 1,
    description: '다른 플레이어의 카드를 추측한다. 맞히면 그 플레이어는 탈락한다. (경비병은 추측 불가)',
  },
  {
    id: 6,
    name: '신부',
    value: 2,
    description: '다른 플레이어의 손패를 확인한다.',
  },
  {
    id: 7,
    name: '신부',
    value: 2,
    description: '다른 플레이어의 손패를 확인한다.',
  },
  {
    id: 8,
    name: '남작',
    value: 3,
    description: '다른 플레이어와 손패를 비교한다. 낮은 카드를 가진 플레이어가 탈락한다.',
  },
  {
    id: 9,
    name: '남작',
    value: 3,
    description: '다른 플레이어와 손패를 비교한다. 낮은 카드를 가진 플레이어가 탈락한다.',
  },
  {
    id: 10,
    name: '시녀',
    value: 4,
    description: '다음 자신의 턴까지 다른 카드의 효과로부터 보호받는다.',
  },
  {
    id: 11,
    name: '시녀',
    value: 4,
    description: '다음 자신의 턴까지 다른 카드의 효과로부터 보호받는다.',
  },
  {
    id: 12,
    name: '왕자',
    value: 5,
    description: '자신 또는 다른 플레이어가 손패를 버리고 덱에서 새 카드를 뽑게 한다.',
  },
  {
    id: 13,
    name: '왕자',
    value: 5,
    description: '자신 또는 다른 플레이어가 손패를 버리고 덱에서 새 카드를 뽑게 한다.',
  },
  {
    id: 14,
    name: '왕',
    value: 6,
    description: '다른 플레이어와 손패를 교환한다.',
  },
  {
    id: 15,
    name: '백작부인',
    value: 7,
    description: '손패에 왕 또는 왕자가 있으면 반드시 이 카드를 내야 한다.',
  },
  {
    id: 16,
    name: '공주',
    value: 8,
    description: '이 카드를 버리면 즉시 탈락한다.',
  },
];

export function shuffleDeck(): Card[] {
  const deck = [...initialDeck];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
