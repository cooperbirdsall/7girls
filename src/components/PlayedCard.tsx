import { CardModel } from "../models/CardModel";
import { colors } from "../utils/cardColors";
import gainIcon from "../utils/gainIcon";
import { symbols } from "../utils/symbols";

type PlayedCardProps = {
  model: CardModel;
  index: number;
  //TODO: add function for selecting resource to pay for things
};

const PlayedCard = ({ model, index }: PlayedCardProps) => {
  const symbol = model.gain.symbol?.map((sym) => {
    return (
      <p style={{ filter: "grayscale(100%)", margin: "0px 0px -4px 0px" }}>
        {symbols[sym]}
      </p>
    );
  });

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
        <div>
          {model.gain.symbol && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 5,
              }}
            >
              {symbol}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayedCard;
