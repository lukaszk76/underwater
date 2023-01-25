import React, { memo, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ParallaxAnimation from "./ParallaxAnimation";
import DiverAnimation from "./DiverAnimation";
import FishAnimation from "./FishAnimation";
import CreatureAnimation from "./CreatureAnimation";
import PanelsAnimation from "./PanelsAnimation";
import ScrollDownAnimation from "./ScrollDownAnimation";

const AnimationProvider = ({ children }) => {
  const app = useRef();
  const [timeline, setTimeline] = React.useState();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    const ctx = gsap.context(() => {}, app);
    setTimeline(gsap.timeline());
    return () => ctx.revert(); // cleanup
  }, []);
  return (
    <div ref={app}>
      {children}
      <DiverAnimation timeline={timeline} />
      <FishAnimation timeline={timeline} />
      <CreatureAnimation timeline={timeline} />
      <ParallaxAnimation timeline={timeline} />
      <PanelsAnimation />
      <ScrollDownAnimation />
    </div>
  );
};

export default memo(AnimationProvider);
