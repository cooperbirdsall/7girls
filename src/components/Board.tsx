import { useState } from "react";
import { PyramidStage, Resource } from "../types";
import Card from "./Card";
import { CardModel } from "../models/CardModel";
import { BoardModel } from "../models/BoardModel";
import { resources } from "../utils/resources";
import PlayedCard from "./PlayedCard";

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
    return (
      <img
        width={40}
        height={40}
        //@ts-ignore
        src={resources[props.model?.startingResource]}
        //@ts-ignore
        alt={resources[props.model?.startingResource]}
      />
    );
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

  const cardsPlayed = props.model.cardsPlayed.map((card, index) => {
    return <PlayedCard model={card} index={index} key={card.id} />;
  });

  const brownCardsPlayed = props.model.cardsPlayed
    .filter((card) => card.color === "brown")
    .map((card, index) => {
      return <PlayedCard model={card} index={index} key={card.id} />;
    });

  const grayCardsPlayed = props.model.cardsPlayed
    .filter((card) => card.color === "gray")
    .map((card, index) => {
      return <PlayedCard model={card} index={index} key={card.id} />;
    });

  const orangeCardsPlayed = props.model.cardsPlayed
    .filter((card) => card.color === "orange")
    .map((card, index) => {
      return <PlayedCard model={card} index={index} key={card.id} />;
    });

  const blueCardsPlayed = props.model.cardsPlayed
    .filter((card) => card.color === "blue")
    .map((card, index) => {
      return <PlayedCard model={card} index={index} key={card.id} />;
    });

  const greenCardsPlayed = props.model.cardsPlayed
    .filter((card) => card.color === "green")
    .map((card, index) => {
      return <PlayedCard model={card} index={index} key={card.id} />;
    });

  const purpleCardsPlayed = props.model.cardsPlayed
    .filter((card) => card.color === "purple")
    .map((card, index) => {
      return <PlayedCard model={card} index={index} key={card.id} />;
    });

  return (
    <div style={{ position: "absolute", bottom: 105, zIndex: 2 }}>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {brownCardsPlayed}
        </div>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {grayCardsPlayed}
        </div>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {orangeCardsPlayed}
        </div>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {blueCardsPlayed}
        </div>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {greenCardsPlayed}
        </div>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {purpleCardsPlayed}
        </div>
      </div>
      <div
        className="board"
        style={{
          width: 620,
          height: 170,
          backgroundColor: "#939393",
          borderRadius: 10,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          {resourceImage()}
        </div>
        <p
          className="fancy-font"
          style={{ fontSize: 40, margin: "0px 0px 5px 0px" }}
        >
          {props.model?.name}
        </p>
        <div
          className="fancy-font"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontWeight: "bold",
          }}
        >
          <div style={{ display: "flex" }}>
            <img src={resources["COIN"]} alt="COINS" />
            {props.model.money}
          </div>
          <div style={{ display: "flex" }}>
            <img src={resources["MILITARY"]} alt="MILITARY" />
            {props.model.militaryPoints}
          </div>
        </div>
      </div>
      <div className="tucked-cards"></div>
    </div>
  );
};

export default Board;
