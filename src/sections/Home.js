import React, { useLayoutEffect } from "react";
import ParallaxSection from "../components/Home/ParallaxSection";
import HomeSidePanel from "../components/Home/HomeSidePanel";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";
import ScrollAnimatedIcons from "../components/ScrollAnimatedIcons";
import DivingParams from "../components/Home/DivingParams";
import AnimationProvider from "../animations/AnimationProvider";

export const Home = () => {
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
        <ScrollAnimatedIcons left={"55vw"} />
        <DivingParams />
      </AnimationProvider>
    </section>
  );
};
