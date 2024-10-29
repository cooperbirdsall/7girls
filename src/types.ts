enum BasicResource {
  WOOD,
  ROCK,
  STEEL,
  BRICK,
}

enum FancyResource {
  POTION,
  RUG,
  PAPER,
}

export type Resource = BasicResource | FancyResource;

export enum Symbol {
  HAMMER,
  RAINDROP,
  TOPGUN,
  MASK,
  CAMEL,
  LIGHTHOUSE,
  CANOPY,
  BARREL,
  HORSESHOE,
  SOUP,
  LIGHTNING,
  TORCH,
  TARGET,
  TEAPOT,
  SAW,
  SATURN,
  SCALES,
  BOOK,
  COURTHOUSE,
  TORAH,
  LYRE,
  FEATHER,
  FORT,
  SPARTAN
}

export type PyramidStage = {
  cost: Resource[];
  gain: Resource[];
}

