import React from "react";

export const WaterCard = ({ children, style }) => {
  return (
    <div className={"water-card glass"} style={style}>
      <div className={"water-card-content"}>{children}</div>
    </div>
  );
};
