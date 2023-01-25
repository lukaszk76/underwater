import React, { memo, useLayoutEffect } from "react";
import { gsap } from "gsap";
const ScrollDownAnimation = () => {
  useLayoutEffect(() => {
    // if (!timeline) return;
    gsap.to(
      window,
      {
        duration: 4,
        scrollTo: { y: "max" },
        ease: "none",
      },
      1
    );
  }, []);
  return <></>;
};

export default memo(ScrollDownAnimation);
