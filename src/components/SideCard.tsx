import { CardModel } from "../models/CardModel";
import { colors } from "../utils/cardColors";
import gainIcon from "../utils/gainIcon";

type SideCardProps = {
  model: CardModel;
  index: number;
  isLeft: boolean;
};

const SideCard = ({ model, index, isLeft }: SideCardProps) => {
  return (
    <div
      className="side-card"
      style={{
        right: isLeft ? 5 * (index + 1) : "",
        left: isLeft ? "" : 5 * (index + 1),
        zIndex: -1 * (index + 1),
      }}
    >
      <div
        style={{
          backgroundColor: colors[model.color],
          height: "100%",
          maxWidth: 35,
          borderRadius: "0 7.9px 7.9px 0",
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
export default SideCard;
