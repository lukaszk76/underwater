import React, { useLayoutEffect, useContext, useEffect } from "react";
import { gsap } from "gsap";
import { Context } from "../components/ContextProvider";
import ScrollAnimatedIcons from "../components/ScrollAnimatedIcons";
import CubaCardLeft from "../components/VisasToCuba/CubaCardLeft";
import CubaCardRight from "../components/VisasToCuba/CubaCardRight";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { addSmoothScroll } from "../helpers/addSmoothScroll";

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

    const anim = gsap.fromTo(
      ".visas-to-cuba-panel",
      { width: "calc((100vw - 100vh) / 2 + 8vh)" },
      { width: "calc((100vw - 100vh) / 2 + 5vh)" }
    );

    ScrollTrigger.create({
      animation: anim,
      trigger: ".visas-to-cuba-panel-left",
      start: "top top",
      end: "+=700",
      scrub: true,
    });

    const parallaxLayers = gsap.utils.toArray(".visas-to-cuba-parallax-layer");
    gsap.to(parallaxLayers, {
      scrollTrigger: {
        scrub: true,
      },
      y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
      ease: "none",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".visas-to-cuba-page-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.set(".visas-to-cuba-parallax", { scale: 1 });

    tl.to(".visas-to-cuba-parallax-1", {
      scale: 1.1,
    })
      .to(
        ".visas-to-cuba-parallax-2",
        {
          scale: 1.03,
          yPercent: -3,
        },
        0
      )
      .to(
        ".visas-to-cuba-parallax-3",
        {
          scale: 1.05,
          yPercent: -5,
        },
        0
      );
  }, []);

  useEffect(() => {
    addSmoothScroll();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={"visas-to-cuba-page"}>
      <Cursor />
      <Footer />
      <div
        className={
          "visas-to-cuba-page-hero visas-to-cuba-section visas-to-cuba-parallax-layer"
        }
        data-speed="1"
      >
        <div
          className={"visas-to-cuba-parallax visas-to-cuba-parallax-1"}
        ></div>
        <div
          className={"visas-to-cuba-parallax visas-to-cuba-parallax-2"}
        ></div>
        <div
          className={"visas-to-cuba-parallax visas-to-cuba-parallax-3"}
        ></div>
        <div className={"visas-to-cuba-panel visas-to-cuba-panel-left"}></div>>
        <div className={"visas-to-cuba-panel visas-to-cuba-panel-right"}></div>
        <div className={"visas-to-cuba-content"}>
          <Header
            title={context.sections.CUBA_VISAS.name}
            subtitle={context.sections.CUBA_VISAS.description}
            buttoncolor={"var(--safety-orange)"}
            textcolor={"var(--pale)"}
            link={"/"}
          />
        </div>
      </div>

      <ScrollAnimatedIcons left={"95%"} />
      <CubaCardLeft />
      <CubaCardRight />
    </div>
  );
};
