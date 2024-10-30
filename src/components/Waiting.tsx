import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../socket";

const Waiting = () => {
  const [numPlayersInRoom, setNumPlayersInRoom] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const name = location.state;

  // Handle receiving the response for create room and join room
  useEffect(() => {
    socket.emit("onPlayerReady", { name: name });

    socket.on("playerReadyResponse", (response) => {
      if (response.success) {
        setNumPlayersInRoom(response.numReadyPlayers);
      }
    });

    // socket.on("joinRoomResponse", (response) => {
    //   if (response.success) {
    //     const roomID = response.gameID;
    //     navigate(`/waiting/${roomID}`, { state: name });
    //   } else {
    //     setErrorText(response.error);
    //   }
    // });

    return () => {
      // socket.off("joinRoomResponse");
    };
  });

  const handleStartGame = () => {
    navigate(`/game/`);
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
      <button onClick={handleStartGame}>Start game</button>
    </div>
  );
};

export default Waiting;
