import React, { memo, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageCard } from "./ImageCard";
import cuba1 from "../assets/cuba1.jpg";
import cuba4 from "../assets/cuba4.jpg";
import cuba5 from "../assets/cuba5.jpg";
const CubaCardLeft = () => {
  useLayoutEffect(() => {
    const card1 = document.getElementById("cuba1");
    const card2 = document.getElementById("cuba2");
    const card3 = document.getElementById("cuba3");
    console.log(card1, card2, card3);
    card1.style.setProperty("background-image", `url(${cuba1})`);
    card2.style.backgroundImage = `url(${cuba4})`;
    card3.style.backgroundImage = `url(${cuba5})`;
  }, []);

  useLayoutEffect(() => {
    const cards = document.querySelectorAll(".image-card-image");
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cuba-image-gallery",
        start: "top bottom",
        end: "+=700",
        scrub: true,
      },
    });
    cards.forEach((card, index) => {
      const rotation = Math.floor(Math.random() * 40 - 20);
      const positionX = Math.floor(Math.random() * 300 - 150);
      const positionY = Math.floor(Math.random() * 300 - 150);
      tl.from(
        card,
        {
          rotation: rotation,
          x: positionX,
          y: positionY,
        },
        "-=1"
      ).to(
        card,
        {
          backgroundSize: "100%",
        },
        ".2"
      );
    });
  }, []);

  return (
    <div className={"cuba-card cuba-card-left visas-to-cuba-section"}>
      <div className="cuba-image-gallery">
        <ImageCard id="cuba1">
          O Kubie Krzysztof Kolumb powiedział, że jest to najpiękniejsze miejsce
          jakie widział.
        </ImageCard>
        <ImageCard id="cuba2">
          Ernest Hemingway w Hawanie i okolicach mieszkał prawie dwadzieścia
          lat. Dni spędzał na morzu - łowiąc ryby, a noce - w barach, pijąc
          mojito i daiquiri.
        </ImageCard>
        <ImageCard id="cuba3">
          Wim Wenders odkrył dla świata muzyków Buenavista Social Club. Z Kubą
          związani byli Frank Sinatra oraz Gabriel Garcia Marquez.
        </ImageCard>
      </div>
    </div>
  );
};

export default memo(CubaCardLeft);
