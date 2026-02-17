export const FIVE_ELEMENTS = {
  WOOD: {
    ko: '목(木)',
    color: '##4CAF50', // Green
    direction: '동쪽',
    advice: '창의적인 활동과 새로운 시작이 필요합니다. 나무나 식물을 가까이 하세요.',
    prevention: '분노를 조절하고 간 건강에 유의하세요.',
    items: '나무 재질의 가구, 녹색 식물, 책',
  },
  FIRE: {
    ko: '화(火)',
    color: '#F44336', // Red
    direction: '남쪽',
    advice: '열정과 활동적인 에너지가 필요합니다. 햇볕을 자주 쐬세요.',
    prevention: '심혈관 건강을 챙기고 과도한 흥분은 자제하세요.',
    items: '조명, 촛불, 붉은색 장식',
  },
  EARTH: {
    ko: '토(土)',
    color: '#FFC107', // Yellow/Brown
    direction: '중앙 (또는 남서/북동)',
    advice: '안정감과 믿음이 필요합니다. 흙을 밟거나 도자기류를 가까이 하세요.',
    prevention: '위장 건강에 유의하고 생각이 너무 많아지지 않도록 하세요.',
    items: '도자기, 흙, 노란색/갈색 계열의 소품',
  },
  METAL: {
    ko: '금(金)',
    color: '#9E9E9E', // White/Silver
    direction: '서쪽',
    advice: '결단력과 원칙이 필요합니다. 금속 장신구나 흰색 옷을 활용하세요.',
    prevention: '폐와 호흡기 건강을 챙기고 지나친 슬픔을 경계하세요.',
    items: '금속 액세서리, 흰색 침구, 둥근 모양의 물건',
  },
  WATER: {
    ko: '수(水)',
    color: '#2196F3', // Black/Blue
    direction: '북쪽',
    advice: '지혜와 유연함이 필요합니다. 물을 자주 마시고 어항을 두는 것도 좋습니다.',
    prevention: '신장과 방광 건강에 유의하고 두려움을 극복하세요.',
    items: '어항, 검은색 소품, 물 관련 그림',
  },
};

export const HEAVENLY_STEMS = {
  '甲': 'WOOD', '乙': 'WOOD',
  '丙': 'FIRE', '丁': 'FIRE',
  '戊': 'EARTH', '己': 'EARTH',
  '庚': 'METAL', '辛': 'METAL',
  '壬': 'WATER', '癸': 'WATER',
};

export const EARTHLY_BRANCHES = {
  '寅': 'WOOD', '卯': 'WOOD',
  '巳': 'FIRE', '午': 'FIRE',
  '辰': 'EARTH', '戌': 'EARTH', '丑': 'EARTH', '未': 'EARTH',
  '申': 'METAL', '酉': 'METAL',
  '子': 'WATER', '亥': 'WATER',
};
