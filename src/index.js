import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // 如果需要基本樣式
import App from "./App"; // 引入主應用程式

// 將 React 元件渲染到 HTML 的 root 節點
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // 挂載到 public/index.html 中的 root 節點
);
