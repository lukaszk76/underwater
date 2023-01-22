import React, { useLayoutEffect } from "react";

export const ScrollDownAnimation = ({ timeline }) => {
  useLayoutEffect(() => {
    if (!timeline) return;
    timeline.to(
      window,
      {
        duration: 4,
        scrollTo: { y: "max" },
        ease: "none",
      },
      1
    );
  }, [timeline]);
  return <></>;
};
