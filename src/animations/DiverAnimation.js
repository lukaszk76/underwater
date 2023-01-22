import React, { useLayoutEffect } from "react";

export const DiverAnimation = ({ timeline }) => {
  useLayoutEffect(() => {
    if (!timeline) return;
    timeline.to(".diver", {
      duration: 10,
      top: "80vh",
      x: "-=50",
      transform: "scale(0.6)",
      ease: "back",
    });

    timeline.to(
      ".diver",
      {
        duration: 2,
        repeat: -1,
        yoyo: true,
        y: "-=5",
        rotate: "-=1",
        ease: "slow",
      },
      0
    );
  }, [timeline]);
  return <></>;
};
