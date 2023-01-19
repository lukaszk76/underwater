import React from "react";

const Card = ({ children }) => {
  return (
    <div className="card glass selectable">
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
