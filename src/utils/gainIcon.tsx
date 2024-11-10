import { CardGain } from "../types";
import { resources } from "./resources";

const gainIcon = (gain: CardGain, isPlayedCard: boolean) => {
  const className = isPlayedCard ? "gain-icon-played" : "gain-icon";
  if (gain.military) {
    const images = [];
    for (let i = 0; i < gain.military; i++) {
      images.push(
        <img className={className} src={resources["MILITARY"]} alt="Military" />
      );
    }
    return images;
  } else if (gain.money) {
    if (gain.money === 5) {
      return (
        <img className={className} src={resources["COIN5"]} alt="5 coins" />
      );
    } else {
      return <p>money icon doesn't exist for this</p>;
    }
    return <div></div>;
  } else if (gain.points) {
    return <div></div>;
  } else if (gain.resource) {
    //if it's a OneOfResource
    if (Array.isArray(gain.resource[0])) {
      return gain.resource[0]
        .map((res) => (
          //@ts-ignore
          <img className={className} src={resources[res]} alt={res} />
        ))
        .reduce((prev, curr) => (
          <>
            {prev} <p className="one-of-slash">/</p> {curr}
          </>
        ));
    } else {
      return gain.resource.map((res) => (
        //@ts-ignore
        <img className={className} src={resources[res]} alt={res} />
      ));
    }
  } else if (gain.science) {
    return <div></div>;
  } else {
    return <div>gain not supported</div>;
  }
};

export default gainIcon;
