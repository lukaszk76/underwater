import React, { useEffect, useLayoutEffect } from "react";
import ParallaxSection from "../components/ParallaxSection";
import Cards from "../components/Cards";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";
import ScrollAnimatedIcons from "../components/ScrollAnimatedIcons";
import DivingParams from "../components/DivingParams";
import AnimationProvider from "../animations/AnimationProvider";

export const Home = () => {
  useLayoutEffect(() => {
    document.title = "Nautilus";
  }, []);

  return (
    <section className="home">
      <AnimationProvider>
        <ParallaxSection />
        <Cards />
        <Cursor />
        <Footer />
        {/*<FullScreenMenu />*/}
        <ScrollAnimatedIcons left={"55vw"} />
        <DivingParams />
      </AnimationProvider>
    </section>
  );
};
