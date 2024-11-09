import React, { useEffect, useState } from "react";
import Board from "./Board";
import socket from "../socket";
import { useParams } from "react-router-dom";
import { GameState, PlayerState, Resource } from "../types";
import { CardModel } from "../models/CardModel";
import { hasEnoughResources, getMissingResources } from "../models/BoardModel";
import Card from "./Card";

const Game = () => {
  const { roomID } = useParams();

  const [age, setAge] = useState(1);
  const [playerState, setPlayerState] = useState<PlayerState>();

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

    socket.on("waitingForAllPlayersToFinishTurn", () => {
      console.log("waiting for other players.");
    });

    socket.on(
      "finishTurn",
      (response: {
        gameState: GameState;
        success?: boolean;
        error?: string;
      }) => {
        console.log(response.gameState);
        const playerState = response.gameState.players[socket.id];
        setPlayerState(playerState);
      }
    );

    return () => {
      socket.off("getGameStateResponse");
      socket.off("waitingForAllPlayersToFinishTurn");
      socket.off("finishTurn");
    };
  }, [roomID]);

  const playCard = (card: CardModel) => {
    if (!playerState || !playerState.board) return;

    if (card.cost.symbol) {
      for (let cardPlayed of playerState.board.cardsPlayed ?? []) {
        if (cardPlayed.gain.symbol) {
          for (let symbol of cardPlayed.gain.symbol) {
            if (card.cost.symbol === symbol) {
              // can afford card ! (no spending)
              console.log("can afford (free from symbol)!");
              socket.emit("playCard", { card: card, moneyCost: 0 });
              return;
            }
          }
        }
      }
    }

    if (
      (!card.cost.resource || card.cost.resource.length === 0) &&
      !card.cost.money
    ) {
      // can afford card too ! (no spending)
      console.log("can afford (card does nont cost anything)!");
      socket.emit("playCard", { card: card, moneyCost: 0 });
      return;
    }

    if (card.cost.money) {
      if (card.cost.money <= playerState.board.money) {
        // can afford money cost ! (spend money)
        if (!card.cost.resource) {
          console.log("can afford (spend money to buy)!");
          socket.emit("playCard", {
            card: card,
            moneyCost: card.cost.money,
          });
          return;
        }
      }
    }
    if (card.cost.resource) {
      if(hasEnoughResources(playerState.board, card.cost.resource)) {
        console.log("can afford (have enough resources!)");
        return;
      }
      let missingResources = getMissingResources(playerState.board, card.cost.resource);
      console.log('missing resources: %v', missingResources);

      // TODO: i'm too lazy to wire in the playerstates and finish this
      // now we have to pass the left & right players to 
      // something like getSellableResources(left)
      // getSellableResources(right)

      console.log("not doing that rn");
    }
  };

  const cardsInHand = playerState?.cardsInHand.map((card) => {
    return <Card model={card} playCard={playCard} key={card.id} />;
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
      {playerState?.board && <Board model={playerState?.board}></Board>}
    </div>
  );
};

export default Game;
