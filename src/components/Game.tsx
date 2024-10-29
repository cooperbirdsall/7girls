import React, { useEffect, useState } from "react";
import Board from "./Board";

const Game = () => {
  const [age, setAge] = useState(1);
  const [players, setPlayers] = useState([<Board />, <Board />]);

  useEffect(() => {
    // distribute boards (which gives everyone 3 coins)
    // shuffle cards for age 1
    // deal 7 age 1 cards to each player
    // call method for wait for players to pick card
  }, []);

  // const pickCards () => {

  // }

  return (
    <div
      className="game-container"
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {players[0]}
    </div>
  );
};

export default Game;
