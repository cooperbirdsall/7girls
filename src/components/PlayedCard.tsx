import { CardModel } from "../models/CardModel";
import { colors } from "../utils/cardColors";
import gainIcon from "../utils/gainIcon";

type PlayedCardProps = {
  model: CardModel;
  index: number;
  //TODO: add function for selecting resource to pay for things
};

const PlayedCard = ({ model, index }: PlayedCardProps) => {
  return (
    <div
      className="played-card"
      style={{ top: 5 * (index + 1), zIndex: -1 * (index + 1) }}
    >
      <div
        style={{
          backgroundColor: colors[model.color],
          width: "100%",
          maxHeight: 35,
          borderRadius: "7.9px 7.9px 0 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {gainIcon(model.gain, true)}
      </div>
    </div>
  );
};

export default PlayedCard;
