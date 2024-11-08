import React, { useEffect, useState } from "react";
import Board from "./Board";
import socket from "../socket";
import { useParams } from "react-router-dom";
import { GameState, PlayerState } from "../types";

const Game = () => {
  const { roomID } = useParams();

  const [age, setAge] = useState(1);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);

  useEffect(() => {
    socket.emit("getGameState", { gameID: roomID });

    socket.on(
      "getGameStateResponse",
      (response: {
        gameState: GameState;
        success?: boolean;
        error?: string;
      }) => {
        if (!response.success) {
          console.log(response.error);
        } else {
          const playerState = response.gameState.players[socket.id];
          setPlayerState(playerState);
        }
      }
    );
    // distribute boards (which give everyone 3 coins)
    // shuffle cards for age 1
    // deal 7 age 1 cards to each player
    // call method for wait for players to pick card
    return () => {
      socket.off("getGameStateResponse");
    };
  }, [roomID]);

  const cardsInHand = playerState?.cardsInHand.map((card) => {
    return (
      <button
        style={{
          width: "10%",
          height: "80%",
          backgroundColor: `${card.color}`,
        }}
      >
        {card.name}
      </button>
    );
  });

  return (
    <div
      className="game-container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "25%",
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {cardsInHand}
      </div>
      <Board model={playerState?.board}></Board>
    </div>
  );
};

export default Game;
