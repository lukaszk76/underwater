import { Context } from "./ContextProvider";
import { gsap } from "gsap";
import { memo, useContext, useLayoutEffect, useMemo } from "react";

export const HamburgerAnimatedIcon = memo(() => {
  const context = useContext(Context);

  const displacements = useMemo(() => {
    const displacements = [];
    for (let i = 0; i < Object.keys(context.sections).length; i++) {
      displacements.push(Math.floor(Math.random() * 15));
    }
    return displacements;
  }, [context.sections]);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    const lines = gsap.utils.toArray(".hamburger-menu-line");
    const animation = tl.to(lines, {
      attr: { x1: "0", x2: "30" },
      ease: "power2",
      duration: 0.3,
    });
    animation.reverse();
    const menuButton = document.querySelector(".full-screen-menu-button");
    menuButton.addEventListener("mouseenter", () => {
      animation.play();
    });

    menuButton.addEventListener("mouseleave", () => {
      animation.reverse();
    });

    return () => {
      menuButton.removeEventListener("mouseenter", () => {
        animation.play();
      });

      menuButton.removeEventListener("mouseleave", () => {
        animation.reverse();
      });
    };
  }, [displacements, context.sections]);

  return (
    <div className="full-screen-menu-button hamburger-menu-icon">
      <svg width="30px" height="30px" viewBox="0 0 30 30">
        {Object.keys(context.sections).map((section, index) => {
          const color = context.sections[section].color;

          return (
            <line
              className="hamburger-menu-line"
              id={`hamburger-menu-line`}
              x1={displacements[index]}
              y1={5 + index * 6}
              x2={displacements[index] + 15}
              y2={5 + index * 6}
              strokeWidth="4"
              stroke={`var(--${color})`}
              strokeLinecap="round"
              strokeLinejoin="round"
              key={index}
              style={{ position: "fixed" }}
            />
          );
        })}
      </svg>
    </div>
  );
});
