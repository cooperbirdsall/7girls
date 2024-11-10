import { BoardModel } from "../models/BoardModel";
import { resources } from "../utils/resources";
import SideCard from "./SideCard";

type SideBoardProps = {
  isLeft: boolean;
  model: BoardModel;
};

const SideBoard = ({ isLeft, model }: SideBoardProps) => {
  const startingResource = () => {
    return (
      <img
        width={32}
        height={32}
        //@ts-ignore
        src={resources[model.startingResource]}
      />
    );
  };

  const brownCardsPlayed = model.cardsPlayed
    .filter((card) => card.color === "brown")
    .map((card, index) => {
      return (
        <SideCard isLeft={isLeft} model={card} index={index} key={card.id} />
      );
    });

  const grayCardsPlayed = model.cardsPlayed
    .filter((card) => card.color === "gray")
    .map((card, index) => {
      return (
        <SideCard isLeft={isLeft} model={card} index={index} key={card.id} />
      );
    });

  const orangeCardsPlayed = model.cardsPlayed
    .filter((card) => card.color === "orange")
    .map((card, index) => {
      return (
        <SideCard isLeft={isLeft} model={card} index={index} key={card.id} />
      );
    });

  const blueCardsPlayed = model.cardsPlayed
    .filter((card) => card.color === "blue")
    .map((card, index) => {
      return (
        <SideCard isLeft={isLeft} model={card} index={index} key={card.id} />
      );
    });

  const greenCardsPlayed = model.cardsPlayed
    .filter((card) => card.color === "green")
    .map((card, index) => {
      return (
        <SideCard isLeft={isLeft} model={card} index={index} key={card.id} />
      );
    });

  const purpleCardsPlayed = model.cardsPlayed
    .filter((card) => card.color === "purple")
    .map((card, index) => {
      return (
        <SideCard isLeft={isLeft} model={card} index={index} key={card.id} />
      );
    });

  return (
    <div
      className="side-board"
      style={{
        left: isLeft ? "20px" : "",
        right: isLeft ? "" : "20px",
      }}
    >
      {startingResource()}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {brownCardsPlayed}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {grayCardsPlayed}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {orangeCardsPlayed}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {blueCardsPlayed}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {greenCardsPlayed}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {purpleCardsPlayed}
      </div>
    </div>
  );
};

export default SideBoard;
