import React, { memo, useLayoutEffect } from "react";

const FishAnimation = ({ timeline }) => {
  useLayoutEffect(() => {
    if (!timeline) return;
    timeline.to(
      ".fish",
      {
        duration: 10,
        transform: "scale(0.8) rotate(30deg)",
        opacity: 0.8,
        ease: "back",
      },
      0
    );

    timeline.to(
      ".fish",
      {
        duration: 3,
        repeat: -1,
        yoyo: true,
        x: "-=2",
        rotate: "-=1",
        ease: "slow",
      },
      0
    );
  }, [timeline]);
  return <></>;
};

export default memo(FishAnimation);
