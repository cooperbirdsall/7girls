import { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const Landing = () => {
  const [name, setName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  const checkName = (): boolean => {
    if (name.length > 0) {
      setErrorText("");
      return true;
    } else {
      setErrorText("make your name longer");
      return false;
    }
  };

  const joinGame = () => {
    if (checkName()) {
      navigate(`/waiting/`);
      socket.emit(
        "createGameRoom",
        (response: { gameID: string; success?: boolean; error?: string }) => {
          if (response.success) {
            const roomID = response.gameID;
            navigate(`/waiting/${roomID}`);
          } else {
            setErrorText("socket error");
            console.error(response.error);
          }
        }
      );
    }
  };

  const createGame = () => {
    if (checkName()) {
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <h1 style={{ fontSize: 50 }}>7 girls</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      ></input>
      <div style={{ display: "flex", marginTop: 20, gap: 20 }}>
        <div>
          <button
            style={{ filter: "drop-shadow(0px 2px 1px lightgray)" }}
            onClick={createGame}
          >
            create game
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            placeholder="game code"
            value={gameCode}
            onChange={(event) => {
              setGameCode(event.target.value);
            }}
          ></input>
          <button
            style={{ filter: "drop-shadow(0px 2px 1px lightgray)" }}
            onClick={joinGame}
          >
            join game
          </button>
        </div>
      </div>
      <p style={{ color: "red" }}>{errorText}</p>
    </div>
  );
};

export default Landing;
