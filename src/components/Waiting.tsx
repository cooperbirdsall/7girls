import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import socket from "../socket";

const Waiting = () => {
  const [numPlayersInRoom, setNumPlayersInRoom] = useState(1);
  const [playersInRoom, setPlayersInRoom] = useState([""]);
  const [errorText, setErrorText] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { roomID } = useParams();
  const { name, isHost } = location.state;

  const playerNames = playersInRoom.map((player) => <li>{player}</li>);

  // Handle receiving the response for create room and join room
  useEffect(() => {
    socket.emit("onPlayerReady", { name: name });

    socket.on("playerReadyResponse", (response) => {
      if (response.success) {
        setNumPlayersInRoom(response.numReadyPlayers);
        setPlayersInRoom(response.readyPlayers);
      }
    });

    socket.on("startGameSession", (response) => {
      if (response.success) {
        navigate(`/game/${roomID}`);
      } else {
        setErrorText(response.error);
      }
    });

    return () => {};
  });

  const handleStartGame = () => {
    socket.emit("onGameStart");
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Waiting for other players...</h2>
      <div className="loader"></div>
      <h3>
        <span style={{ color: "#3498db", fontWeight: "bolder" }}>
          {numPlayersInRoom}
        </span>{" "}
        player{numPlayersInRoom === 1 ? "" : "s"} connected
      </h3>
      <ol>{playerNames}</ol>
      {isHost && <button onClick={handleStartGame}>Start game</button>}
      <p style={{ color: "red" }}>{errorText}</p>
    </div>
  );
};

export default Waiting;
