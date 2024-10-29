import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
