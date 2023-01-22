import React, { useEffect, useContext } from "react";
import { Context } from "../components/ContextProvider";

export const ScrollLottie = () => {
  const context = useContext(Context);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    const upperLottie = document.querySelector(".scroll-lottie-up");
    const lowerLottie = document.querySelector(".scroll-lottie-down");
    upperLottie.style.opacity = context.top ? 0 : 1;
    lowerLottie.style.opacity = context.bottom ? 0 : 1;
  }, [context.top, context.bottom]);

  return (
    <>
      <div className="scroll-lottie scroll-lottie-up">
        <lottie-player
          id="firstLottie"
          autoplay
          loop
          mode="normal"
          src="https://assets5.lottiefiles.com/packages/lf20_Rq8jJk.json"
          speed="1"
        />
      </div>

      <div className="scroll-lottie scroll-lottie-down">
        <lottie-player
          id="firstLottie"
          autoplay
          loop
          mode="normal"
          src="https://assets5.lottiefiles.com/packages/lf20_Rq8jJk.json"
          speed="1"
        />
      </div>
    </>
  );
};
