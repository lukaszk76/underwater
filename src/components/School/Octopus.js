import React, { memo, useLayoutEffect } from "react";
import octopus_color from "../../assets/octopus-color.png";
import octopus_bw from "../../assets/octopus-bw2.png";
import octopus_man from "../../assets/octopus-man.png";
import octopus_dzban from "../../assets/octopus-dzban.png";
import { gsap, SteppedEase } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Octopus = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".octopus-wrapper",
        start: "top top",
        end: "bottom 50%",
        scrub: 1,
      },
    });

    gsap.set(".octopus-man", { yPercent: 1 });
    gsap.set(".octopus-dzban", { yPercent: 1 });
    gsap.set(".octopus-color", { maskPosition: "0" });

    tl.to(".octopus-dzban", {
      yPercent: -1,
      // scale: 1.1,
    })
      .to(
        ".octopus-man",
        {
          yPercent: 0,
          // scale: 1.02,
        },
        0
      )
      .to(
        ".octopus-color",
        {
          maskPosition: "100%",
          ease: SteppedEase.config(13),
        },
        0
      );
  }, []);

  return (
    <div className="octopus-wrapper">
      <img src={octopus_bw} alt="octopus" className="octopus octopus-bw" />
      <img
        src={octopus_color}
        alt="octopus"
        className="octopus octopus-color"
      />
      <img
        src={octopus_man}
        alt={"octopus man"}
        className="octopus octopus-man"
      />
      <img
        src={octopus_dzban}
        alt={"octopus dzban"}
        className="octopus octopus-dzban"
      />
    </div>
  );
};

export default memo(Octopus);
