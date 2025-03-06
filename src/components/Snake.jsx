import React from "react";

const Snake = ({ snake }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake-segment"
          style={{
            gridRowStart: segment[1] + 1,
            gridColumnStart: segment[0] + 1,
            backgroundColor: index === snake.length - 1 ? "darkgreen" : "green",
          }}
        ></div>
      ))}
    </>
  );
};

export default Snake;
