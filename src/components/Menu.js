import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import { Link } from "./Link";
import { Context } from "./ContextProvider";

export const Menu = () => {
  const { sections } = useContext(Context);

  const expandMenu = useCallback(() => {
    const rect1 = document.getElementById(`menu-rect`);
    const rect2 = document.getElementById(`menu-rect-2`);
    const line = document.getElementById(`menu-line`);
    const polyline = document.getElementById(`menu-polyline`);
    const links = document.querySelectorAll(".menu-link");
    const menuWrapper = document.querySelector(`.menu-wrapper`);

    rect1.style.width = "220px";
    rect2.style.width = "1250px";
    menuWrapper.style.width = "1250px";
    line.style.transform = `translateX(14px)`;
    line.setAttribute("x2", `3`);
    polyline.style.transform = `translateX(14px)`;

    links.forEach((link, index) => {
      setTimeout(() => {
        link.style.opacity = "1";
      }, index * 50);
    });
  }, []);

  const hideMenu = useCallback(() => {
    setTimeout(() => {
      const rect1 = document.getElementById(`menu-rect`);
      const rect2 = document.getElementById(`menu-rect-2`);
      const line = document.getElementById(`menu-line`);
      const polyline = document.getElementById(`menu-polyline`);
      const links = document.querySelectorAll(".menu-link");
      const menuWrapper = document.querySelector(`.menu-wrapper`);

      rect1.style.width = "60px";
      rect2.style.width = "220px";
      menuWrapper.style.width = "220px";
      line.style.transform = `translateX(0px)`;
      line.setAttribute("x2", `38`);
      polyline.style.transform = `translateX(0px)`;

      links.forEach((link, index) => {
        setTimeout(() => {
          link.style.opacity = "0";
        }, (links.length - index - 1) * 50);
      });
    }, 300);
  }, []);

  useEffect(() => {
    const menuWrapper = document.querySelector(`.menu-wrapper`);
    if (!menuWrapper) return;

    menuWrapper.addEventListener("mouseenter", expandMenu);
    menuWrapper.addEventListener("mouseleave", hideMenu);
    console.log("menuWrapper", menuWrapper);
  }, [expandMenu, hideMenu]);

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
