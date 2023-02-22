import React, { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import google from "../../assets/pngegg.png";

export const TripsCard = ({ left, top, text, id, title }) => {
  useLayoutEffect(() => {
    const card = document.getElementById(id);
    const title = document.getElementById(`trips-card-title-${id}`);
    const button = document.getElementById(`trips-card__button-${id}`);
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
        end: "top 30%",
        scrub: true,
        markers: false,
      },
    });
    tl.to(
      card,
      {
        opacity: 1,
        left: `${left}vw`,
        y: 0,
        ease: "power2",
      },
      0
    );
    tl.to(
      title,
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2",
      },
      0.2
    );
    tl.to(
      button,
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2",
      },
      1.5
    );
  }, []);

  const initialLeft = left < 50 ? "-10vw" : "110vw";
  return (
    <div
      style={{ top: `${top}vh`, left: initialLeft }}
      className="trips-card"
      id={id}
    >
      <div className={"trips-card__title"} id={`trips-card-title-${id}`}>
        <img src={google} alt="" className={"trips-card__title__icon"} />
        <div>{title}</div>
      </div>

      <div className="trips-card__text">
        <div>{text}</div>
      </div>
      <button className="trips-card__button" id={`trips-card__button-${id}`}>
        LEARN MORE
      </button>
    </div>
  );
};
