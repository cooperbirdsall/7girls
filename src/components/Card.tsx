import { CardModel } from "../models/CardModel";
import { CardCost, CardGain } from "../types";
import { colors } from "../utils/cardColors";
import gainIcon from "../utils/gainIcon";
import { resources } from "../utils/resources";
import { symbols } from "../utils/symbols";

type CardProps = {
  playCard: Function;
  model: CardModel;
};

const Card = ({ playCard, model }: CardProps) => {
  const cost = (cost: CardCost) => {
    const images = [];
    if (cost.money) {
      if (cost.money === 1) {
        images.push(
          <img className="cost-icon" src={resources["COIN1"]} alt="cost" />
        );
      } else {
        console.error("cost money not supported!");
      }
    }
    if (cost.resource) {
      for (let i = 0; i < cost.resource.length; i++) {
        images.push(
          <img
            className="cost-icon"
            //@ts-ignore
            src={resources[cost.resource[i]]}
            alt="cost"
          />
        );
      }
    }
    return images;
  };

  const symbol = model.gain.symbol?.map((sym) => {
    return (
      <p style={{ filter: "grayscale(100%)", margin: "0px 0px -5px 0px" }}>
        {symbols[sym]}
      </p>
    );
  });

  return (
    <div
      className="card"
      onClick={() => {
        playCard(model);
      }}
    >
      <div
        style={{
          backgroundColor: colors[model.color],
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "7.9px 7.9px 0 0",
          position: "relative",
        }}
      >
        {gainIcon(model.gain, false)}
        {model.gain.symbol && (
          <div
            style={{
              position: "absolute",
              top: -5,
              right: 5,
            }}
          >
            {symbol}
          </div>
        )}
      </div>
      <div
        style={{
          marginTop: 5,
          marginLeft: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {cost(model.cost)}
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: 5,
          textAlign: "center",
        }}
      >
        {model.name}
      </div>
    </div>
  );
};

export default Card;
