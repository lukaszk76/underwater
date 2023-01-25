import React, { useEffect, useContext, memo } from "react";
import { Context } from "../components/ContextProvider";
import { ScrollSvg } from "./ScrollSvg";

const ScrollAnimatedIcons = () => {
  const context = useContext(Context);

  useEffect(() => {
    const upperIcon = document.querySelector(".scroll-icon-up");
    const lowerIcon = document.querySelector(".scroll-icon-down");
    upperIcon.style.opacity = context.top ? 0 : 1;
    lowerIcon.style.opacity = context.bottom ? 0 : 1;
  }, [context.top, context.bottom]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

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
