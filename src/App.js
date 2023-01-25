import "./styles/Cards.css";
import "./styles/Parallax.css";
import "./styles/HeaderAndFooter.css";
import "./styles/WaterCard.css";
import "./styles/LearnMoreButton.css";
import "./styles/Cursor.css";
import "./styles/ScrollAnimatedIcons.css";
import "./styles/DivingParams.css";
import "./styles/FullScreenMenu.css";
import Cursor from "./components/Cursor";
import ParallaxSection from "./components/ParallaxSection";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import AnimationProvider from "./animations/AnimationProvider";
import { ContextProvider } from "./components/ContextProvider";
import ScrollAnimatedIcons from "./components/ScrollAnimatedIcons";
import DivingParams from "./components/DivingParams";
import { FullScreenMenu } from "./components/FullScreenMenu";
import { memo } from "react";

function App() {
  return (
    <ContextProvider>
      <AnimationProvider>
        <ParallaxSection />
        <Cards />
        <Cursor />
        <Footer />
        <FullScreenMenu />
        <ScrollAnimatedIcons />
        <DivingParams />
      </AnimationProvider>
    </ContextProvider>
  );
}

export default memo(App);
