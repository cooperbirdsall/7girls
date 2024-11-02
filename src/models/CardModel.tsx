import { CardCost, CardGain, Resource } from "../types";

export type CardModel = {
  id: number;
  name: string;
  cost: CardCost;
  color: string;
  gain: CardGain;
  playersRequired: number;
};
