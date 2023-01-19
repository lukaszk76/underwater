import "./App.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import background from "./assets/underwater.png";
import fish from "./assets/fish.png";
import creature from "./assets/creature.png";
import diver from "./assets/diver.png";
import "@lottiefiles/lottie-player";
import Card from "./Card";
import { useCallback, useEffect } from "react";
import Cursor from "./Cursor";

function App() {
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

  return (
    <div className={"main"}>
      <Parallax
        pages={1.5}
        style={{
          backgroundColor: "#0c2434",
        }}
        className={"parallax"}
      >
        <ParallaxLayer speed={0} offset={0} factor={1.5} className="background">
          <img
            className={"background-image"}
            src={background}
            alt="background"
            style={{ maxWidth: "1500px" }}
          />
        </ParallaxLayer>

        <ParallaxLayer speed={0.1} offset={0} style={{ position: "relative" }}>
          <img src={fish} alt="fish" className={"fish"} />
        </ParallaxLayer>

        <ParallaxLayer speed={0.2} offset={0}>
          <img src={creature} alt="creature" className={"creature"} />
        </ParallaxLayer>

        <ParallaxLayer speed={0.5}>
          <img src={diver} alt="diver" className={"diver"} />
          <lottie-player
            autoplay
            loop
            speed={0.5}
            intermission={0}
            mode="normal"
            src="https://assets10.lottiefiles.com/packages/lf20_6UE5Th.json"
            className={"bubbles"}
            style={{
              width: "100px",
              position: "absolute",
              top: "35vh",
              left: "calc(var(--xcorrection) + (0.36 * var(--backgroundWidth))",
              opacity: 0.3,
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer speed={1}>
          <div className={"cards"}>
            <Card>
              <h4>Diving Center in Croatia</h4>
              <div className="card-content">
                spend you vacation in the most beautiful place in the world
              </div>
            </Card>

            <Card>
              <h4>Trips</h4>
              <div className="card-content">
                vist with us the most exciting diving places in the world
              </div>
            </Card>

            <Card>
              <h4>Trainings</h4>
              <div className="card-content">
                become a professional diver with us
              </div>
            </Card>

            <Card>
              <h4>Visas to Cuba</h4>
              <div className="card-content">
                we can help you with the visa to Cuba
              </div>
            </Card>

            <Card>
              <h4>Diving equipment </h4>
              <div className="card-content">
                do you want to buy or rent diving equipment?
              </div>
            </Card>
          </div>
        </ParallaxLayer>
      </Parallax>
      <section className="hero glass">
        <div className="logo" />
        <h1 className="main-title">Diving Center Nautilus</h1>
      </section>

      <section className="footer">
        <div className="footer-content">CENTRUM NURKOWE NAUTILUS</div>
        <div className="footer-content">ul.Kapelanka 1a, 30-347 Kraków</div>
        <div className="footer-content">tel. +48 12 266 02 02</div>
        <div className="footer-content">email: office@nautilus.com.pl</div>
      </section>
      <Cursor />
    </div>
  );
}

export default App;
