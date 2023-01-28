import React, { useCallback, useEffect, useContext, memo } from "react";
import background from "../assets/underwater.png";
import fish from "../assets/fish.png";
import creature from "../assets/creature.png";
import diver from "../assets/diver.png";
import "@lottiefiles/lottie-player";
import water3 from "../assets/water3.mp4";
import water1 from "../assets/water1.mp4";
import WaterCard from "./WaterCard";
import { Context } from "./ContextProvider";

const ParallaxSection = () => {
  const context = useContext(Context);

  const getBackgroundWidth = useCallback(() => {
    const background = document.querySelector(".background-image");
    const { width } = background.getBoundingClientRect();
    return width;
  }, []);

  const getWidthCorrection = useCallback(() => {
    return Math.max((window.innerWidth - getBackgroundWidth()) / 2, 0);
  }, [getBackgroundWidth]);

  useEffect(() => {
    const main = document.querySelector(".parallax");

    function handleResize() {
      main.style.setProperty("--xcorrection", getWidthCorrection() + "px");
      main.style.setProperty("--backgroundWidth", getBackgroundWidth() + "px");
    }

    window.addEventListener("resize", () => {
      handleResize();
    });

    setTimeout(() => {
      handleResize();
    }, 50);
  }, [getBackgroundWidth, getWidthCorrection]);

  useEffect(() => {
    const background = document.querySelector(".background");
    background.style.setProperty(
      "--parallax-background",
      `var(--${context.section.color})`
    );
  }, [context.section]);
  return (
    <div className="parallax">
      <div className="parallax-layer background" data-speed=".2">
        <div className="background-image-video">
          <img
            className={"background-image"}
            src={background}
            alt="background"
          />
          <video className={"background-video"} autoPlay muted loop>
            <source src={water3} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <video className={"background-video"} autoPlay muted loop>
            <source src={water1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="parallax-layer" data-speed=".25">
        <img src={fish} alt="fish" className={"fish"} />
      </div>

      <div className="parallax-layer" data-speed=".3">
        <img src={creature} alt="creature" className={"creature"} />
      </div>

      <div className="parallax-layer" data-speed="0.45">
        <img src={diver} alt="diver" className={"diver"} />
        <lottie-player
          className={"bubbles"}
          autoplay={true}
          loop={true}
          speed={0.5}
          intermission={0}
          mode="normal"
          src="https://assets10.lottiefiles.com/packages/lf20_6UE5Th.json"
          style={{
            width: "100px",
            position: "fixed",
            top: "20vh",
            left: "calc(0.35 * var(--backgroundWidth)",
            opacity: "0.2",
          }}
        />
      </div>
      <div className="parallax-layer" data-speed="0.2">
        <WaterCard style={{ top: "15vh", left: "47vw" }}>about us</WaterCard>
        <WaterCard style={{ top: "27vh", left: "12vw" }}>contact</WaterCard>
        <WaterCard style={{ top: "65vh", left: "42vw" }}>blog</WaterCard>
        <WaterCard style={{ top: "110vh", left: "30vw" }}>events</WaterCard>
      </div>
    </div>
  );
};

export default memo(ParallaxSection);
