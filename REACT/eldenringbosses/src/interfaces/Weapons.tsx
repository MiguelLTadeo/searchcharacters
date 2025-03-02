export interface Weapon {
  id: string;
  name: string;
  image: string;
  description: string;
  attack: [];
  defence: [];
  scalesWith: [];
  requiredAttributes: [];
  category: string;
  weight: number;
}
