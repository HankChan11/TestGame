import React from "react";

const Food = ({ food }) => {
  return (
    <div
      className="food"
      style={{
        gridRowStart: food[1] + 1,
        gridColumnStart: food[0] + 1,
        backgroundColor: "red",
      }}
    ></div>
  );
};

export default Food;
