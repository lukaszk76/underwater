import React, { useLayoutEffect, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "../components/Cursor";
import { Context } from "../components/ContextProvider";
import { LearnMoreButton } from "../components/LearnMoreButton";
import ScrollAnimatedIcons from "../components/ScrollAnimatedIcons";
import CubaCardLeft from "../components/CubaCardLeft";
import CubaCardRight from "../components/CubaCardRight";

export const VisasToCubaPage = () => {
  const context = useContext(Context);

  useLayoutEffect(() => {
    document.title = "Visas to Cuba";
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".visas-to-cuba-panel-left", {
      duration: 1.5,
      left: 0,
      opacity: 1,
      ease: "power3.out",
    });
    gsap.to(".visas-to-cuba-panel-right", {
      duration: 1,
      right: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.2,
    });

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={"visas-to-cuba-page"}>
      <div className={"visas-to-cuba-page-hero visas-to-cuba-section "}>
        <Cursor />
        <ScrollAnimatedIcons left={"95%"} />
        <h1 className={"visas-to-cuba-title"}>
          {context.sections.CUBA_VISAS.name}
        </h1>
        <div className={"visas-to-cuba-panel visas-to-cuba-panel-left"}>
          <div
            className="logo cuba-logo"
            style={{ backgroundColor: `var(--safety-orange)` }}
          />
        </div>
        ><div className={"visas-to-cuba-panel visas-to-cuba-panel-right"}></div>
        <div style={{ position: "fixed", bottom: "30px", right: "30px" }}>
          <LearnMoreButton section={context.sections.CUBA_VISAS} />
        </div>
      </div>

      <CubaCardLeft />
      <CubaCardRight />
    </div>
  );
};
