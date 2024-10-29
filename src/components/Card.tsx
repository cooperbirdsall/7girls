import { CardModel } from "../models/CardModel";
import { Resource, Symbol } from "../types";

type CardProps = {
  playCard: Function;
  model: CardModel;
};

const Card = (props: CardProps) => {
  return (
    <div
      style={{
        width: 100,
        height: 150,
        backgroundColor: props.model.color,
        borderRadius: 10,
      }}
    >
      <button onClick={props.playCard(props.model.id)}>Play me</button>
    </div>
  );
};

export default Card;
