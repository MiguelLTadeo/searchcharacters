export interface Weapon {
  id: string;
  name: string;
  image: string;
  description: string;
  attack: Infos[];
  defence: Infos[];
  scalesWith: Scales[];
  requiredAttributes: Infos[];
  category: string;
  weight: number;
}

export interface Infos {
  name: string;
  amount: number;
}

export interface Scales {
  name: string;
  scaling: string;
}
