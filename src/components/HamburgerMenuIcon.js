import { Context } from "./ContextProvider";
import { gsap } from "gsap";
import { memo, useCallback, useContext, useEffect } from "react";

export const HamburgerAnimatedIcon = memo(() => {
  const context = useContext(Context);

  const generateDisplacements = useCallback(() => {
    const displacements = [];
    const size = Object.keys(context.sections).length;
    for (let i = 0; i < size; i++) {
      displacements.push(Math.floor(Math.random() * 15));
    }
    return displacements;
  }, [context.sections]);

  const moveLines = useCallback((displacements) => {
    const lines = gsap.utils.toArray(".hamburger-menu-line");
    lines.forEach((line, index) => {
      gsap.to(line, {
        attr: { x1: displacements[index], x2: displacements[index] + 15 },
        duration: 1,
        ease: "none",
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveLines(generateDisplacements());
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  }, [moveLines, generateDisplacements]);

  return (
    <div className="full-screen-menu-button hamburger-menu-icon">
      <svg width="30px" height="36px" viewBox="0 0 30 36">
        {Object.keys(context.sections).map((section, index) => {
          const color = context.sections[section].color;

          return (
            <line
              className="hamburger-menu-line"
              id={`hamburger-menu-line`}
              x1={3 * index}
              y1={6 + index * 7}
              x2={3 * index + 15}
              y2={6 + index * 7}
              strokeWidth="4"
              stroke={`var(--${color})`}
              strokeLinecap="round"
              strokeLinejoin="round"
              key={context.sections[section].short}
              style={{ position: "fixed" }}
            />
          );
        })}
      </svg>
    </div>
  );
});