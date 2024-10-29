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
    <div>
      <h1>7 girls</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      ></input>
      <div>
        <div>
          <button onClick={createGame}>create game</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="game code"
            value={gameCode}
            onChange={(event) => {
              setGameCode(event.target.value);
            }}
          ></input>
          <button onClick={joinGame}>join game</button>
        </div>
      </div>
      <p style={{ color: "red" }}>{errorText}</p>
    </div>
  );
};

export default Landing;
