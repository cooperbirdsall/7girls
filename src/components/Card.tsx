import { CardModel } from "../models/CardModel";
import { CardGain } from "../types";
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
        return (
          gain.resource[0]
            //@ts-ignore
            .map((res) => <img src={resources[res]} alt={res} />)
            .reduce((prev, curr) => (
              <>
                {prev} / {curr}
              </>
            ))
        );
      } else {
        return gain.resource.map((res) => (
          //@ts-ignore
          <img src={resources[res]} alt={res} />
        ));
      }
    } else if (gain.science) {
      return <div></div>;
    } else {
      return <div>gain not supported</div>;
    }
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
      <div>
        <p>{model.name}</p>
      </div>
    </div>
  );
};

export default Card;
