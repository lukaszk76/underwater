import React, { useLayoutEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PanelsAnimation = () => {
  useLayoutEffect(() => {
    const panels = gsap.utils.toArray(".card");
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(panels, {
      scrollTrigger: {
        scrub: true,
        trigger: ".cards",
        pin: false,
        snap: 1 / (panels.length - 1),
        start: "top top",
        end: () => "+=" + document.querySelector(".parallax").offsetHeight,
      },
      xPercent: -100 * (panels.length - 1),
      ease: "power1",
    });
  }, []);
  return <></>;
};

export default memo(PanelsAnimation);
