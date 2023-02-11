import React, { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const TripsCard = ({ left, top, image, text, id, title }) => {
  useLayoutEffect(() => {
    const card = document.getElementById(id);
    const image = document.getElementById(`trips-card-image-${id}`);
    const title = document.getElementById(`trips-card-title-${id}`);
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
      image,
      {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        filter: "blur(0px)",
      },
      0.2
    );
    tl.to(
      title,
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      0.6
    );
  }, []);

  const initialLeft = left < 50 ? "-10vw" : "110vw";
  return (
    <>
      <div
        className={"trips-card__title"}
        id={`trips-card-title-${id}`}
        style={{
          top: `calc(${top}vh + 0.5*max(40vh, 300px)`,
          left: "50vw",
        }}
      >
        {title}
      </div>
      <div
        style={{ top: `${top}vh`, left: initialLeft }}
        className="trips-card"
        id={id}
      >
        <img
          src={image}
          alt={id}
          className="trips-card__image"
          id={`trips-card-image-${id}`}
        />

        <div className="trips-card__text">
          <div>{text}</div>
        </div>
      </div>
    </>
  );
};
