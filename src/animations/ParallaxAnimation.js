import React, { memo, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const ParallaxAnimation = ({ timeline }) => {
  useLayoutEffect(() => {
    if (!timeline) return;
    gsap.registerPlugin(ScrollTrigger);
    const parallaxLayers = gsap.utils.toArray(".parallax-layer");
    timeline.to(
      parallaxLayers,
      {
        scrollTrigger: {
          scrub: true,
        },
        y: (i, target) =>
          -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: "none",
      },
      2
    );
  }, [timeline]);
  return <></>;
};

export default memo(ParallaxAnimation);
