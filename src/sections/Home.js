import React from "react";
import ParallaxSection from "../components/ParallaxSection";
import Cards from "../components/Cards";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";
import { FullScreenMenu } from "../components/FullScreenMenu";
import ScrollAnimatedIcons from "../components/ScrollAnimatedIcons";
import DivingParams from "../components/DivingParams";
import AnimationProvider from "../animations/AnimationProvider";

export const Home = () => {
  return (
    <section className="home">
      <AnimationProvider>
        <ParallaxSection />
        <Cards />
        <Cursor />
        <Footer />
        <FullScreenMenu />
        <ScrollAnimatedIcons />
        <DivingParams />
      </AnimationProvider>
    </section>
  );
};
