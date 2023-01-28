import React, { memo, useLayoutEffect } from "react";

const DiverAnimation = ({ timeline }) => {
  useLayoutEffect(() => {
    if (!timeline) return;
    timeline.to(".diver", {
      duration: 10,
      top: "95vh",
      x: "-=50",
      transform: "scale(0.85)",
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

export default memo(DiverAnimation);
