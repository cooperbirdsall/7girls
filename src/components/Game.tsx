import React, { useEffect, useState } from "react";
import Board from "./Board";
import socket from "../socket";
import { useParams } from "react-router-dom";
import { GameState, PlayerState } from "../types";
import { CardModel } from "../models/CardModel";

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
          console.log(response.gameState);
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

  const playCard = (card: CardModel) => {
    if (card.cost.symbol) {
      for (let cardPlayed of playerState?.board?.cardsPlayed ?? []) {
        if (cardPlayed.gain.symbol) {
          for (let symbol of cardPlayed.gain.symbol) {
            if (card.cost.symbol === symbol) {
              // can afford card ! (no spending)
              console.log("can afford!");
            }
          }
        }
      }
    } else if (
      (!card.cost.resource || card.cost.resource.length === 0) &&
      !card.cost.money
    ) {
      // can afford card too ! (no spending)
      console.log("can afford!");
      socket.emit("playCard", { cardId: card.id, moneyCost: 0 });
    } else {
      if (card.cost.money) {
        if (card.cost.money <= (playerState?.board?.money ?? 0)) {
          // can afford money cost ! (spend money)
        }
      }
      if (card.cost.resource) {
        // idk dude
        console.log("not doing that rn");
      }
    }
  };

  const cardsInHand = playerState?.cardsInHand.map((card) => {
    return (
      <button
        style={{
          width: "10%",
          height: "80%",
          backgroundColor: `${card.color}`,
        }}
        onClick={() => playCard(card)}
      >
        {card.name}
        <br />
        <br /> cost: {card.cost.money ? card.cost.money + " coins" : ""}
        {card.cost.resource
          ? card.cost.resource
              .map((resource) => {
                return resource;
              })
              .join(" ")
          : ""}
        {card.cost.symbol ? card.cost.symbol : ""}
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
