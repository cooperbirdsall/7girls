import { useState } from "react";
import { PyramidStage, Resource } from "../types";
import Card from "./Card";
import { CardModel } from "../models/CardModel";
import { BoardModel } from "../models/BoardModel";
import { resources } from "../utils/resources";

const Board = (props: { model: BoardModel }) => {
  const [money, setMoney] = useState(3);
  // const [cardsPlayed, setCardsPlayed] = useState();
  const [cardsInHand, setCardsInHand] = useState<CardModel[]>([]);
  const [warScore, setWarScore] = useState(0);
  const [pyramidStagesUnlocked, setPyramidStagesUnlocked] = useState([]);

  //   const handlePlayCard = (id: number) => {
  //     const playCardIndex = cardsInHand.findIndex((card) => card.id == id);
  //     const playCard = cardsInHand[playCardIndex]
  //     if(canPlayCard(playCard)) {
  //       setCardsInHand(...cardsPlayed, playCard)
  //       let hand = [...cardsInHand];
  //       hand.splice(playCardIndex, playCardIndex);
  //       setCardsInHand(hand);

  //     }

  //   };

  const getAvailableResources = () => {
    return [];
  };

  const resourceImage = () => {
    //@ts-ignore
    return <img src={resources[props.model?.startingResource]} />;
  };

  const canPlayCard = (card: CardModel) => {
    let availableResources: Resource[] = getAvailableResources();

    if (card.cost.resource) {
      for (let i = 0; i < card.cost.resource.length; i++) {
        const currCardResourceType = card.cost.resource[i];
        // count available
        let availableCount = 0;
        for (let j = 0; j < card.cost.resource.length; j++) {
          if (currCardResourceType === card.cost.resource[j]) {
            availableCount++;
          }
        }

        // count needed
        let neededCount = 0;
        for (let k = 0; k < availableResources.length; k++) {
          if (currCardResourceType === availableResources[k]) {
            neededCount++;
          }
        }

        // TODO count neighbors' resources

        if (availableCount < neededCount) return false;
      }
    }
    return true;
  };

  const cardsPlayed = props.model.cardsPlayed.map((card) => {
    return <Card model={card} playCard={() => {}} key={card.id} />;
  });

  return (
    <div>
      <div className="played-cards">
        {/* <Card model={} playCard={handlePlayCard} /> */}
      </div>
      {cardsPlayed}
      <div
        className="board"
        style={{
          width: 420,
          height: 200,
          backgroundColor: "gray",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>{props.model?.name}</p>
        <p>starting resource: {resourceImage()}</p>
      </div>
      <div className="tucked-cards"></div>
    </div>
  );
};

export default Board;
