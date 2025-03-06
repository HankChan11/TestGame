import React, { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";

const GameBoard = () => {
  const gridSize = 20; // 棋盤的行數與列數
  const initialSnake = [[5, 5], [5, 6]]; // 蛇的初始位置
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState("RIGHT"); // 初始方向
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0); // 初始化分數為 0

  // 渲染棋盤網格背景
  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const isEven = (row + col) % 2 === 0; // 確定顏色交錯
        const cellClass = isEven ? "cell light-green" : "cell dark-green";
        cells.push(
          <div
            key={`${row}-${col}`}
            className={cellClass}
            style={{
              gridRowStart: row + 1,
              gridColumnStart: col + 1,
            }}
          ></div>
        );
      }
    }
    return cells;
  };

  // 蛇的移動邏輯
  const moveSnake = () => {
    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];

    let newHead;

    switch (direction) {
      case "UP":
        newHead = [head[0], head[1] - 1];
        break;
      case "DOWN":
        newHead = [head[0], head[1] + 1];
        break;
      case "LEFT":
        newHead = [head[0] - 1, head[1]];
        break;
      case "RIGHT":
        newHead = [head[0] + 1, head[1]];
        break;
      default:
        return;
    }

    newSnake.push(newHead);

    // 如果蛇吃到食物
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(generateRandomFood());
      setScore(score + 10); // 每次吃到食物加 10 分
    } else {
      newSnake.shift(); // 如果沒吃到食物，移除蛇的尾部
    }

    // 檢查遊戲是否結束
    if (checkCollision(newHead, newSnake)) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
    }
  };

  // 生成隨機食物位置
  const generateRandomFood = () => {
    return [
      Math.floor(Math.random() * gridSize),
      Math.floor(Math.random() * gridSize),
    ];
  };

  // 檢查是否撞牆或撞到自己
  const checkCollision = (head, snake) => {
    // 撞到邊界
    if (head[0] < 0 || head[1] < 0 || head[0] >= gridSize || head[1] >= gridSize) {
      return true;
    }
    // 撞到自己
    for (let i = 0; i < snake.length - 1; i++) {
      if (snake[i][0] === head[0] && snake[i][1] === head[1]) {
        return true;
      }
    }
    return false;
  };

  // 監聽鍵盤事件來改變蛇的方向
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // 設置蛇的移動間隔
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        moveSnake();
      }, 200); // 蛇移動的速度 (200ms)
      return () => clearInterval(interval);
    }
  }, [snake, direction, gameOver]);

  return (
    <div className="board">
      {renderGrid()} {/* 渲染棋盤背景 */}
      {gameOver && <div className="game-over">Game Over</div>}
      <div className="score">Score: {score}</div> {/* 顯示分數 */}
      <Snake snake={snake} />
      <Food food={food} />
    </div>
  );
};

export default GameBoard;
