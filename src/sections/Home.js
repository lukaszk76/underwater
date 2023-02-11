import React, { useEffect, useLayoutEffect } from "react";
import ParallaxSection from "../components/Home/ParallaxSection";
import HomeSidePanel from "../components/Home/HomeSidePanel";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";
import ScrollAnimatedIcons from "../components/ScrollAnimatedIcons";
import DivingParams from "../components/Home/DivingParams";
import AnimationProvider from "../animations/AnimationProvider";
import { addSmoothScroll } from "../helpers/addSmoothScroll";

export const Home = () => {
  useEffect(() => {
    addSmoothScroll();
  }, []);

  useLayoutEffect(() => {
    document.title = "Nautilus";
  }, []);

  return (
    <section className="home">
      <AnimationProvider>
        <ParallaxSection />
        <HomeSidePanel />
        <Cursor />
        <Footer />
        <ScrollAnimatedIcons left={"2vw"} />
        <DivingParams />
      </AnimationProvider>
    </section>
  );
};
