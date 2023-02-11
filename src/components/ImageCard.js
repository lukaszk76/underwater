import React from "react";

export const ImageCard = ({ id, children }) => {
  return (
    <div className="image-card">
      <div className="image-card-container">
        <div id={id} className="image-card-image"></div>
      </div>
      <div className="image-card-content">{children}</div>
    </div>
  );
};
