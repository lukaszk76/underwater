import React, { memo, useContext, useLayoutEffect } from "react";
import { Context } from "./ContextProvider";
import { gsap } from "gsap";
import FullScreenMenuSection from "./FullScreenMenuSection";
import { HamburgerAnimatedIcon } from "./HamburgerMenuIcon";

export const FullScreenMenu = memo(() => {
  const context = useContext(Context);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    const menuSections = gsap.utils.toArray(".full-screen-menu-section ");
    const animation = tl.to(menuSections, {
      duration: 0.2,
      x: "0",
      stagger: 0.1,
      ease: "power2",
    });
    animation.reverse();

    const menuButton = document.querySelector(".full-screen-menu-button");
    menuButton.addEventListener("click", () => {
      animation.play();
    });

    const parallax = document.querySelector(".parallax");
    parallax.addEventListener("click", () => {
      animation.reverse();
    });

    menuSections.forEach((section) => {
      section.addEventListener("click", () => {
        animation.reverse();
      });
    });
  }, []);

  return (
    <>
      <HamburgerAnimatedIcon />

      {Object.keys(context.sections).map((section, index) => {
        return (
          <FullScreenMenuSection
            key={index}
            section={context.sections[section]}
            index={index}
          />
        );
      })}
    </>
  );
});
