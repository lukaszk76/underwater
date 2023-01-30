import React, { useCallback, useEffect, useState } from "react";

export const Link = ({ section, index }) => {
  const [variant, setVariant] = useState(1);

  const toggleVariant = useCallback(() => {
    const rectWidth = [30, 150];
    const transformX = [0, 10];
    const lineX2 = [20, 3];

    const rect = document.getElementById(`link-button-rect-${section.short}`);
    const line = document.getElementById(`link-button-line-${section.short}`);
    const polyline = document.getElementById(
      `link-button-polyline-${section.short}`
    );

    rect.style.width = `${rectWidth[variant]}px`;
    line.style.transform = `translateX(${transformX[variant]}px)`;
    line.setAttribute("x2", `${lineX2[variant]}`);
    polyline.style.transform = `translateX(${transformX[variant]}px)`;
    if (variant === 0) {
      setVariant(1);
    } else {
      setVariant(0);
    }
  }, [section.short, variant]);

  useEffect(() => {
    const button = document.getElementById(`link-button-${section.short}`);
    if (!button) return;
    button.addEventListener("mouseenter", toggleVariant);
    button.addEventListener("mouseleave", toggleVariant);
  }, [section.short, toggleVariant]);

  const handleClick = () => {
    console.log(`clicked link button ${section.short}`);
  };

  return (
    <svg
      className={`menu-link link-button`}
      id={`link-button-${section.short}`}
      width="150"
      height="30"
      viewBox="0 0 150 30"
      onClick={handleClick}
      style={{ left: `${250 + index * 200}px` }}
    >
      <rect
        id={`link-button-rect-${section.short}`}
        x="0"
        y="0"
        width="30"
        height="30"
        rx="15"
        ry="15"
        fill={`var(--${section.color})`}
      />
      <rect
        x="0"
        y="0"
        width="150"
        height="30"
        rx="15"
        ry="15"
        stroke={`var(--${section.color})`}
        fill={"rgba(12, 36, 52, 0.2)"}
        strokeWidth="2"
      />
      <text
        id={`link-button-text-${section.short}`}
        transform="translate(90 20)"
        textAnchor="middle"
        fontSize="15"
        fill="var(--pale)"
      >
        {section.short}
      </text>
      <line
        id={`link-button-line-${section.short}`}
        x1="20"
        y1="15"
        x2="20"
        y2="15"
        strokeWidth="3"
        stroke="var(--pale)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        id={`link-button-polyline-${section.short}`}
        points="13 10 20 15 13 20"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--pale)"
        strokeWidth="3"
      ></polyline>
    </svg>
  );
};
