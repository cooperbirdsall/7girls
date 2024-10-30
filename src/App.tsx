import React from "react";
import "./App.css";
import Game from "./components/Game";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing";
import Waiting from "./components/Waiting";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/waiting/:roomID" element={<Waiting />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
