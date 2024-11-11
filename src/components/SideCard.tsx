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
        // background image style is in app.css
        right: isLeft ? 5 * (index + 1) : "",
        left: isLeft ? "" : 5 * (index + 1),
        zIndex: -1 * (index + 1),
        display: "flex",
        flexDirection: isLeft ? "row" : "row-reverse",
        height: "100px",
        width: "45px",
        position: "relative",
        marginBottom: "3px",
        justifyContent: "flex-end",
        borderRadius: isLeft ? "0px 7.9px 7.9px 0px" : "7.9px 0 0 7.9px",
      }}
    >
      <div
        style={{
          backgroundColor: colors[model.color],
          height: "100%",
          maxWidth: 35,
          borderRadius: isLeft ? "0 7.9px 7.9px 0" : "7.9px 0 0 7.9px",
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
