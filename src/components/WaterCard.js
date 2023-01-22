import React, { useEffect } from "react";

export const WaterCard = ({ children, style }) => {
  useEffect(() => {
    const bubbles = document.querySelectorAll(".water-card");
    bubbles.forEach((bubble) => {
      bubble.addEventListener("mouseenter", (e) => {
        e.target.querySelector(".water-card-underline").style.width = "40px";
        e.target.style.backgroundImage =
          "radial-gradient( rgba(23, 78, 99, 0.6), transparent)";
      });
      bubble.addEventListener("mouseleave", (e) => {
        e.target.querySelector(".water-card-underline").style.width = "10px";
        e.target.style.backgroundImage =
          "radial-gradient( rgba(23, 78, 99, 0.3), transparent)";
      });
    });
  }, []);

  return (
    <div className={"water-card glass"} style={style}>
      <div className={"water-card-content"}>
        {children}
        <div className="water-card-underline" />
      </div>
    </div>
  );
};
