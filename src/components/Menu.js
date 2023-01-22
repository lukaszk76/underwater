import React, { useCallback, useEffect, useState, useContext } from "react";
import { Link } from "./Link";
import { Context } from "./ContextProvider";

export const Menu = () => {
  const [variant, setVariant] = useState(1);
  const { sections } = useContext(Context);

  const toggleVariant = useCallback(() => {
    const rect1 = document.getElementById(`menu-rect`);
    const rect2 = document.getElementById(`menu-rect-2`);
    const line = document.getElementById(`menu-line`);
    const polyline = document.getElementById(`menu-polyline`);
    const text = document.getElementById(`menu-text`);
    const links = document.querySelectorAll(".menu-link");
    const menuWrapper = document.querySelector(`.menu-wrapper`);
    const rect1Width = ["60px", "220px"];
    const rect2Width = ["220px", "1250px"];
    const transformX = [0, 14];
    const lineX2 = [38, 3];
    const textDisplay = ["block", "block"];
    const linkOpacity = ["0", "1"];

    const delay = variant ? 0 : links.length * 50;

    setTimeout(() => {
      rect1.style.width = rect1Width[variant];
      rect2.style.width = rect2Width[variant];
      menuWrapper.style.width = rect2Width[variant];
      line.style.transform = `translateX(${transformX[variant]}px)`;
      line.setAttribute("x2", `${lineX2[variant]}`);
      polyline.style.transform = `translateX(${transformX[variant]}px)`;
      text.style.display = textDisplay[variant];
    }, delay);

    links.forEach((link, index) => {
      const delay = variant ? index * 50 : (links.length - index - 1) * 50;
      setTimeout(() => {
        link.style.opacity = linkOpacity[variant];
      }, delay);
    });

    if (variant === 0) {
      setVariant(1);
    } else {
      setVariant(0);
    }
  }, [variant]);

  useEffect(() => {
    const menuWrapper = document.querySelector(`.menu-wrapper`);
    if (!menuWrapper) return;

    menuWrapper.addEventListener("mouseenter", toggleVariant);
    menuWrapper.addEventListener("mouseleave", toggleVariant);
    return () => {
      menuWrapper.removeEventListener("mouseenter", toggleVariant);
      menuWrapper.removeEventListener("mouseleave", toggleVariant);
    };
  }, [toggleVariant]);

  return (
    <div className={"menu-wrapper glass"}>
      <div className="menu-links">
        {Object.keys(sections).map((section, index) => (
          <Link
            key={sections[section].name}
            section={sections[section]}
            index={index}
          />
        ))}
      </div>

      <svg
        id={`menu`}
        width="220"
        height="60"
        viewBox="0 0 220 60"
        className={"menu"}
      >
        <rect
          id={`menu-rect`}
          x="0"
          y="0"
          width="60"
          height="60"
          rx="30"
          ry="30"
          fill="var(--background)"
        />
        <rect
          id={`menu-rect-2`}
          x="0"
          y="0"
          width="220"
          height="60"
          rx="30"
          ry="30"
          fill="transparent"
          stroke="var(--background)"
          strokeWidth="2"
        />
        <text
          id={`menu-text`}
          transform="translate(130 38)"
          textAnchor="middle"
          fontSize="20"
          fill="var(--pale)"
        >
          MENU
        </text>
        <line
          id={`menu-line`}
          x1="38"
          y1="30"
          x2="38"
          y2="30"
          strokeWidth="4"
          stroke="var(--buff)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          id={`menu-polyline`}
          points="27 20 38 30 27 40"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="var(--buff)"
          strokeWidth="4"
        ></polyline>
      </svg>
    </div>
  );
};
