import { OneOfResource, PyramidStage, Resource } from "../types";
import { CardModel } from "./CardModel";

export type BoardModel = {
  id: number;
  startingResource: Resource;
  name: string;
  pyramidStages: PyramidStage[];
  cardsPlayed: CardModel[];
  militaryPoints: number;
  money: number;
};

// export const hasEnoughResources = (board: BoardModel, resources : Resource[]) => {
//   return getMissingResources(board, [], resources).length == 0
// }

export const getMissingResources = (board: BoardModel, available : Resource[], cost: Resource[]) => {  
    // create a map to store counts of each resource
    const availableCounts : Map<Resource, number> = new Map();
    const costCounts : Map<Resource, number> = new Map();
  
    // Count available resources
    available.forEach((resource) => {
      // ignoring one of for now
      if (Array.isArray(resource)) return
      availableCounts.set(resource, (availableCounts.get(resource) || 0) + 1);
    });
  
    // Count available one of resources
    available.forEach((resource) => {
      // ignoring standard
      if (!Array.isArray(resource)) return
      availableCounts.set(resource, (availableCounts.get(resource) || 0) + 1);
    });
  
    // Count required resources
    cost.forEach((resource) => {
      costCounts.set(resource, (availableCounts.get(resource) || 0) + 1);
    });
  
    // Determine missing resources by comparing counts
    let missing: Resource[] = [];
    
    // Loop through the required resources and check if there's a shortage
    costCounts.forEach((num, resource) => {
      const costAmount = costCounts.get(resource) || 0;
      const availableAmount = availableCounts.get(resource) || 0;
      
      if (costAmount > availableAmount) {
        // Add the difference to the missing resources list
        const missingAmount = costAmount - availableAmount;
        for (let i = 0; i < missingAmount; i++) {
          missing.push(resource);
        }
      }
    });
  
  return missing;
}

// export const getSellableResources = (board: BoardModel, resources: Resource[]) => { 
//     // resources - missing
//     // we're just gonna subtract off of the missing resources

//     let missing = getMissingResources(board, resources);

//     if (missing.length == 0) return [... resources];

//     let sellable: Resource[] = [];
//     missing.forEach((r) => {
//       if (resources.includes(r)) {
//         sellable.push(r);
//       }
//     });

//     return sellable;
// }

export const getAvailableResources = (board: BoardModel) => {
  let available : Resource[] = [board.startingResource];

  board.cardsPlayed.forEach((card) => {
    if (card.gain.resource) {
      available.push(...card.gain.resource)
    }
  })

  return available;
}
