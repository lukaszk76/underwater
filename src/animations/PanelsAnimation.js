import React, { useLayoutEffect, useContext, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Context } from "../components/ContextProvider";

const PanelsAnimation = () => {
  const context = useContext(Context);

  const updateSection = useCallback(
    (progress) => {
      context.setScrollProgress(progress);
      if (progress < 0.2) {
        context.setSection(() => context.sections.DIVING_CENTER);
      } else if (progress < 0.4) {
        context.setSection(() => context.sections.DIVING_TRIPS);
      } else if (progress < 0.6) {
        context.setSection(() => context.sections.DIVING_TRAININGS);
      } else if (progress < 0.8) {
        context.setSection(() => context.sections.CUBA_VISAS);
      } else {
        context.setSection(() => context.sections.DIVING_EQUIPMENT);
      }

      if (progress < 0.1) {
        context.setTop(true);
      } else {
        context.setTop(false);
      }
      if (progress > 0.9) {
        context.setBottom(true);
      } else {
        context.setBottom(false);
      }
    },
    [context]
  );

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
        onUpdate: (self) => updateSection(self.progress),
      },
      xPercent: -100 * (panels.length - 1),
      ease: "none",
    });
  }, []);
  return <></>;
};

export default memo(PanelsAnimation);
