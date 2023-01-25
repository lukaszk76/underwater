import React, { memo, useLayoutEffect } from "react";

const CreatureAnimation = ({ timeline }) => {
  useLayoutEffect(() => {
    if (!timeline) return;
    timeline.to(
      ".creature",
      {
        duration: 7,
        x: "-=100",
        y: "+=50",
        transform: "scale(1) rotate(0deg)",
        ease: "back",
      },
      0
    );

    timeline.to(
      ".creature",
      {
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        y: "-=3",
        x: "-=2",
        rotate: "-=3",
        ease: "slow",
      },
      0
    );
  }, [timeline]);
  return <></>;
};

export default memo(CreatureAnimation);
