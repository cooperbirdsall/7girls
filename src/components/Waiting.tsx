import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Waiting = () => {
  const [numPlayersInRoom, setNumPlayersInRoom] = useState(3);
  const navigate = useNavigate();

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
