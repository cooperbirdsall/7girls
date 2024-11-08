import { BoardModel } from "./models/BoardModel";
import { CardModel } from "./models/CardModel";

type BasicResource = "WOOD" | "ORE" | "STEEL" | "BRICK";
type FancyResource = "GLASS" | "RUG" | "PAPER";

export type OneOfResource = Resource[];
export type OneOfScience = Science[];

export type Resource = BasicResource | FancyResource | OneOfResource;

export type CardCost = {
  resource?: Resource[];
  money?: number;
  symbol?: Symbol;
}

export type CardGain = {
  money?: number;
  military?: number;
  resource?: Resource[];
  science?: Science | OneOfScience;
  func?: Function;
  points?: number;
  symbol?: Symbol[];
};

export type Symbol = 
  "HAMMER" |
  "RAINDROP" |
  "TOPGUN" |
  "MASK" |
  "CAMEL" |
  "CANOPY" |
  "LIGHTHOUSE" |
  "BARREL" |
  "HORSESHOE" |
  "SOUP" |
  "LIGHTNING" |
  "TORCH" |
  "TARGET" |
  "TEAPOT" |
  "SAW" |
  "SATURN" |
  "SCALES" |
  "BOOK" |
  "COURTHOUSE" |
  "TORAH"|
  "LYRE" |
  "FEATHER" |
  "FORT" |
  "SPARTAN"

export type Science = "WHEEL" | "PROTRACTOR" | "TABLET"

export type PyramidStage = {
  cost: Resource[];
  gain: CardGain;
}

export type PlayerState = {
  socketID: string;
  name: string | undefined;
  isReady: boolean;
  board: BoardModel | undefined;
  cardsInHand: CardModel[];
  militaryWins: number[];
  militaryLosses: number[];
  playerOnLeft: string;
  playerOnRight: string;
};

export type GameState = {
  gameID: string,
  hasStarted: boolean,
  players: {[key:string] : PlayerState},
  currentAge: number,
  cardDirectionClockwise: boolean
};
