import { BoardModel } from "./models/BoardModel";
import { CardModel } from "./models/CardModel";

type BasicResource = "WOOD" | "ORE" | "STEEL" | "BRICK";
type FancyResource = "GLASS" | "RUG" | "PAPER";

export type OneOfResource = Resource[];
export type OneOfScience = Science[];

export type Resource = BasicResource | FancyResource | OneOfResource;

export type Money = number;

export type CardCost = {
  resource?: Resource[];
  money?: Money;
  symbol?: Symbol;
}

export type CardGain = {
  money?: Money;
  military?: number;
  resource?: Resource[];
  science?: Science;
  nowAction?: CardAction;
  endAction?: CardAction;
  points?: number;
  symbol?: Symbol[];
};

export type CardAction = {
  forColor: string
  fromNeighbors: boolean;
  fromYou: boolean;
  fromWonders: boolean;
}

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

export type Science = "WHEEL" | "PROTRACTOR" | "TABLET" | OneOfScience

export type PyramidStage = {
  cost: Resource[];
  gain: CardGain;
}

export type PlayerState = {
  socketUserID: string;
  name: string | undefined;
  isReady: boolean;
  board: BoardModel | undefined;
  cardsInHand: CardModel[];
  militaryWins: number[];
  militaryLosses: number[];
  playerOnLeft: string;
  playerOnRight: string;
  waitingToPlayCard: boolean;
};

export type GameState = {
  gameID: string,
  hasStarted: boolean,
  players: {[key:string] : PlayerState},
  currentAge: number,
  cardDirectionClockwise: boolean
};
