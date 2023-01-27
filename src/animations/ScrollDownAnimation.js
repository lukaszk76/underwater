import React, { memo, useLayoutEffect } from "react";
import { gsap } from "gsap";
const ScrollDownAnimation = () => {
  useLayoutEffect(() => {
    gsap.to(window, {
      duration: 4,
      scrollTo: { y: "max" },
      ease: "none",
    });
  }, []);
  return <></>;
};

export default memo(ScrollDownAnimation);
