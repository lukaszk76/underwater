import React, { useEffect, useContext, memo } from "react";
import { ScrollSvg } from "./ScrollSvg";
import { getScrollPercentage } from "../helpers/getScrollPercentage";

const ScrollAnimatedIcons = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const upperIcon = document.querySelector(".scroll-icon-up");
      const lowerIcon = document.querySelector(".scroll-icon-down");
      upperIcon.style.opacity = getScrollPercentage() <= 5 ? 0 : 1;
      lowerIcon.style.opacity = getScrollPercentage() >= 95 ? 0 : 1;
    });
  }, []);

  return (
    <>
      <div className="scroll-icon scroll-icon-up" onClick={scrollTop}>
        <ScrollSvg id="up" />
      </div>

      <div className="scroll-icon scroll-icon-down" onClick={scrollBottom}>
        <ScrollSvg id="down" />
      </div>
    </>
  );
};

export default memo(ScrollAnimatedIcons);