import { Resource } from "../types";

export type CardModel = {
  id: number;
  resourceCost: Resource[];
  monetaryCost: number;
  symbolCost: Symbol[];
  color: string;
  gain: any;
};
