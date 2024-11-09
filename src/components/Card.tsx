import { CardModel } from "../models/CardModel";
import { CardCost, CardGain } from "../types";
import { resources } from "../utils/resources";

type CardProps = {
  playCard: Function;
  model: CardModel;
};

const Card = ({ playCard, model }: CardProps) => {
  const gain = (gain: CardGain) => {
    if (gain.military) {
      const images = [];
      for (let i = 0; i < gain.military; i++) {
        images.push(<img src={resources["MILITARY"]} alt="Military" />);
      }
      return images;
    } else if (gain.money) {
      return <div></div>;
    } else if (gain.points) {
      return <div></div>;
    } else if (gain.resource) {
      //if it's a OneOfResource
      if (Array.isArray(gain.resource[0])) {
        return gain.resource[0]
          .map((res) => (
            //@ts-ignore
            <img className="gain-icon" src={resources[res]} alt={res} />
          ))
          .reduce((prev, curr) => (
            <>
              {prev} <p className="one-of-slash">/</p> {curr}
            </>
          ));
      } else {
        return gain.resource.map((res) => (
          //@ts-ignore
          <img className="gain-icon" src={resources[res]} alt={res} />
        ));
      }
    } else if (gain.science) {
      return <div></div>;
    } else {
      return <div>gain not supported</div>;
    }
  };

  const cost = (cost: CardCost) => {
    const images = [];
    if (cost.money) {
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

  return (
    <div
      className="card"
      onClick={() => {
        playCard(model);
      }}
    >
      <div
        style={{
          backgroundColor: model.color,
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "7.9px 7.9px 0 0",
        }}
      >
        {gain(model.gain)}
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
