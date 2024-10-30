import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const Landing = () => {
  const [name, setName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  // Handle receiving the response for create room and join room
  useEffect(() => {
    socket.on("createRoomResponse", (response) => {
      if (response.success) {
        const roomID = response.gameID;
        navigate(`/waiting/${roomID}`, { state: name });
      } else {
        setErrorText(response.error);
        console.error(response.error);
      }
    });

    socket.on("joinRoomResponse", (response) => {
      if (response.success) {
        const roomID = response.gameID;
        navigate(`/waiting/${roomID}`, { state: name });
      } else {
        setErrorText(response.error);
      }
    });

    return () => {
      socket.off("createRoomResponse");
    };
  });

  const checkName = (): boolean => {
    if (name.length > 0) {
      setErrorText("");
      return true;
    } else {
      setErrorText("make your name longer");
      return false;
    }
  };

  const checkGameCode = (): boolean => {
    if (gameCode.length > 0) {
      setErrorText("");
      return true;
    } else {
      setErrorText("that's not a valid game code");
      return false;
    }
  };

  const joinGame = () => {
    if (checkName() && checkGameCode()) {
      console.log("emitting");
      socket.emit("joinGameRoom", { gameID: gameCode });
    }
  };

  const createGame = () => {
    if (checkName()) {
      socket.emit("createGameRoom");
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
