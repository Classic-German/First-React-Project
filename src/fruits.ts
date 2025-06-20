export interface Fruit {
  id: number;
  icon: string;
  name: string;
  vitamin: string;
  cft: boolean;
  description: string;
}

const appleVitamin = 'B1, B2, C';
const bananaVitamin ='A, C, E, B1, B2, B6, B9'
const strawberryVitamin = 'A, E, C, B5, B6'
const melonVitamin = 'A, C'

export const fruits: Fruit[] = [
  { id: 1, icon: '🍏', name: 'Maçã', vitamin: appleVitamin, cft: true, description: `A maçã é um alimento nutritivo, rico em fibras, vitaminas (${appleVitamin}), minerais e antioxidantes. Ajuda na imunidade, saúde celular, digestão e pode contribuir para o controlo de peso. ` },
  { id: 2, icon: '🍌', name: 'Banana', vitamin: bananaVitamin, cft: true, description: `A banana é rica em potássio, vitaminas (${bananaVitamin}) e fibras. Fornece energia rápida, ajuda na função muscular e nervosa, regula a digestão e pode melhorar o humor.` },
  { id: 3, icon: '🍓', name: 'Morango', vitamin: strawberryVitamin, cft: false, description: `O morango é fonte de vitaminas (${strawberryVitamin}), antioxidantes e fibras. Fortalece o sistema imunitário, protege as células e favorece a saúde da pele e do coração.` },
  { id: 4, icon: '🍈', name: 'Meloa', vitamin: melonVitamin, cft: false, description: `A meloa é hidratante e rica em vitaminas (${melonVitamin}) e antioxidantes. Contribui para a saúde da pele, visão e sistema imunitário, sendo também pouco calórica.` },
];
