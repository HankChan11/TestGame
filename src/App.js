import React from "react";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="title">貪食蛇遊戲</h1> {/* 添加 className */}
      <GameBoard />
    </div>
  );
}

export default App;
