export interface Armor {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  dmgNegation: DmgNegandRes[];
  resistance: DmgNegandRes[];
  weight: number;
}

export interface DmgNegandRes {
  name: string;
  amount: number;
}
