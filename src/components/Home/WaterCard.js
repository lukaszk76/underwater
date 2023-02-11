import React, { memo, useLayoutEffect, useContext } from "react";
import { Context } from "../ContextProvider";

const WaterCard = ({ children, style, onClick = () => {} }) => {
  const context = useContext(Context);

  const updateBubbleOnEnter = (e) => {
    const { width } = e.target
      .querySelector(".water-card-content")
      .getBoundingClientRect();
    e.target.querySelector(".water-card-underline").style.width = `${width}px`;
    e.target.style.backgroundImage = "none";
    e.target.style.backgroundColor = `var(--background)`;
    e.target.querySelector(
      ".water-card-content"
    ).style.color = `var(--safety-orange)`;
  };

  const updateBubbleOnLeave = (e) => {
    e.target.querySelector(".water-card-underline").style.width = "20px";
    e.target.style.backgroundColor = "transparent";
    e.target.style.backgroundImage =
      "radial-gradient( rgba(23, 78, 99, 0.3), transparent)";
    e.target.querySelector(".water-card-content").style.color = `var(--pale)`;
  };
  useLayoutEffect(() => {
    const bubbles = document.querySelectorAll(".water-card");
    bubbles.forEach((bubble) => {
      bubble.addEventListener("mouseenter", (e) => {
        updateBubbleOnEnter(e);
      });
      bubble.addEventListener("mouseleave", (e) => {
        updateBubbleOnLeave(e);
      });
    });
  }, [context.section]);

  return (
    <div className={"water-card glass"} style={style} onClick={onClick}>
      <div className={"water-card-content"}>
        {children}
        <div className="water-card-underline" />
      </div>
    </div>
  );
};

export default memo(WaterCard);
