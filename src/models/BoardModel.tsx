import { PyramidStage, Resource } from "../types";
import { CardModel } from "./CardModel";

export type BoardModel = {
  startingResource: Resource;
  name: string;
  pyramidStages: PyramidStage[];
  cardsPlayed: CardModel[];
  militaryPoints: number;
};
