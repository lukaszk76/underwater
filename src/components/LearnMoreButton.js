import React, { useCallback, useEffect, useState } from "react";

export const LearnMoreButton = ({ section }) => {
  const [variant, setVariant] = useState(1);

  const toggleVariant = useCallback(() => {
    const rectWidth = [60, 220];
    const transformX = [0, 14];
    const lineX2 = [38, 3];

    const rect = document.getElementById(
      `learn-more-button-rect-${section.short}`
    );
    const line = document.getElementById(
      `learn-more-button-line-${section.short}`
    );
    const polyline = document.getElementById(
      `learn-more-button-polyline-${section.short}`
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
    const button = document.getElementById(
      `learn-more-button-${section.short}`
    );
    if (!button) return;
    button.addEventListener("mouseenter", toggleVariant);
    button.addEventListener("mouseleave", toggleVariant);
  }, [section.short, toggleVariant]);

  const handleClick = () => {
    console.log(`clicked learn more button ${section.short}`);
  };

  return (
    <svg
      className={`learn-more-button`}
      id={`learn-more-button-${section.short}`}
      width="220"
      height="60"
      viewBox="0 0 220 60"
      onClick={handleClick}
    >
      <rect
        id={`learn-more-button-rect-${section.short}`}
        x="0"
        y="0"
        width="60"
        height="60"
        rx="30"
        ry="30"
        fill="var(--background)"
      />
      <rect
        x="0"
        y="0"
        width="220"
        height="60"
        rx="30"
        ry="30"
        fill="none"
        stroke="var(--background)"
        strokeWidth="2"
      />
      <text
        id={`learn-more-button-text-${section.short}`}
        transform="translate(130 38)"
        textAnchor="middle"
        fontSize="20"
        fill={`var(--${section.textColor})`}
      >
        LEARN MORE
      </text>
      <line
        id={`learn-more-button-line-${section.short}`}
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
        id={`learn-more-button-polyline-${section.short}`}
        points="27 20 38 30 27 40"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--buff)"
        strokeWidth="4"
      ></polyline>
    </svg>
  );
};
