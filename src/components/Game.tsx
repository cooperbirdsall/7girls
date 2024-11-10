import React, { useEffect, useState } from "react";
import Board from "./Board";
import socket from "../socket";
import { useParams } from "react-router-dom";
import { GameState, PlayerState, Resource, Money, CardCost } from "../types";
import { CardModel } from "../models/CardModel";
import { getMissingResources } from "../models/BoardModel";
import Card from "./Card";
import SideBoard from "./SideBoard";

const Game = () => {
  const { roomID } = useParams();

  const [age, setAge] = useState(1);
  const [gameState, setGameState] = useState<GameState>();
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
          setGameState(response.gameState);
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

    // TODO: this is just placeholder for now
    // we should get the players payment in gamestate

    let payment: CardCost = {
      resource: [],
      money: 10,
    };

    // is card free
    if (
      (!card.cost.resource || card.cost.resource.length === 0) &&
      !card.cost.money
    ) {
      // can afford card too ! (no spending)
      console.log("can afford (card does nont cost anything)!");
      socket.emit("playCard", { card: card, moneyCost: 0 });
      return;
    }

    // do we have free from symbol?
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

    // do we have enough money to pay for this?
    if (card.cost.money) {
      if (card.cost.money <= playerState.board.money) {
        // can afford money cost ! (spend money)
        console.log("can afford (spend money to buy)!");
        socket.emit("playCard", {
          card: card,
          moneyCost: payment.money,
        });
        return;
      }
    }

    // do we have enough resources to pay for this?
    if (payment.resource) {
      let missing = getMissingResources(
        playerState.board,
        payment.resource,
        // @ts-ignore
        card.cost.resource
      );
      if (missing.length === 0) {
        console.log(
          "i have enough resources to pay for this %v",
          payment.resource
        );
        socket.emit("playCard", {
          card: card,
          moneyCost: payment.money,
        });
      } else {
        console.log("cannot afford, missing resources: %v", missing);
      }
    }

    console.log("sorry girl, you're broke!");
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
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: 250,
          width: "97%",
          display: "flex",
          flexDirection: "row",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        {cardsInHand}
      </div>
      {playerState?.board && (
        <SideBoard isLeft={true} model={playerState?.board} />
      )}
      {playerState?.board && (
        <SideBoard isLeft={false} model={playerState?.board} />
      )}
      {playerState?.board && <Board model={playerState?.board} />}
    </div>
  );
};

export default Game;
