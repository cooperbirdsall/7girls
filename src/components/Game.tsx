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
    const sessionID = sessionStorage.getItem("sessionID");
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on("session", ({ sessionID, userID }) => {
      socket.userID = userID;
    });

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
          const playerState = response.gameState.players[socket.userID ?? ""];
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
        console.log("turn finished");
        console.log(response.gameState);
        const playerState = response.gameState.players[socket.userID ?? ""];
        setPlayerState(playerState);
        setGameState(response.gameState);
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

  const leftSideBoard = () => {
    if (playerState?.playerOnLeft) {
      const leftPlayerBoard =
        gameState?.players[playerState?.playerOnLeft].board;
      if (leftPlayerBoard !== undefined) {
        return (
          <SideBoard
            totalNumPlayers={Object.keys(gameState?.players ?? []).length}
            isLeft={true}
            model={leftPlayerBoard}
          />
        );
      }
    }
  };

  const rightSideBoard = () => {
    if (playerState?.playerOnRight) {
      const rightPlayerBoard =
        gameState?.players[playerState?.playerOnRight].board;
      if (rightPlayerBoard !== undefined) {
        return (
          <SideBoard
            totalNumPlayers={Object.keys(gameState?.players ?? []).length}
            isLeft={false}
            model={rightPlayerBoard}
          />
        );
      }
    }
  };

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
      {leftSideBoard()}
      {rightSideBoard()}
      {playerState?.board && <Board model={playerState?.board} />}
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          position: "absolute",
          bottom: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f3f3f3",
            height: "100%",
            width: "100%",
            margin: "12px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              backgroundColor: "#b8b8b8",
              height: "36px",
              minWidth: "200px",
              width: "15%",
              borderRadius: "5px",
              marginLeft: "12px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#b8b8b8",
              height: "36px",
              minWidth: "350px",
              width: "25%",
              borderRadius: "5px",
              marginLeft: "12px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#b8b8b8",
              height: "36px",
              minWidth: "350px",
              width: "25%",
              borderRadius: "5px",
              marginRight: "12px",
              marginLeft: "auto",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
