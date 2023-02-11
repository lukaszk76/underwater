import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const LearnMoreButton = ({ id, link, color }) => {
  const [variant, setVariant] = useState(1);
  const navigate = useNavigate();

  const toggleVariant = useCallback(() => {
    const rectWidth = [60, 220];
    const transformX = [0, 14];
    const lineX2 = [38, 3];

    const rect = document.getElementById(`learn-more-button-rect-${id}`);
    const line = document.getElementById(`learn-more-button-line-${id}`);
    const polyline = document.getElementById(
      `learn-more-button-polyline-${id}`
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
  }, [id, variant]);

  useEffect(() => {
    const button = document.getElementById(`learn-more-button-${id}`);
    if (!button) return;
    button.addEventListener("mouseenter", toggleVariant);
    button.addEventListener("mouseleave", toggleVariant);
  }, [id, toggleVariant]);

  const handleClick = () => {
    navigate(link);
  };

  return (
    <svg
      className={`learn-more-button`}
      id={`learn-more-button-${id}`}
      width="220"
      height="60"
      viewBox="0 0 220 60"
      onClick={handleClick}
    >
      <rect
        id={`learn-more-button-rect-${id}`}
        x="0"
        y="0"
        width="60"
        height="60"
        rx="30"
        ry="30"
        fill={color}
      />
      <rect
        x="0"
        y="0"
        width="220"
        height="60"
        rx="30"
        ry="30"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      <text
        id={`learn-more-button-text-${id}`}
        transform="translate(130 38)"
        textAnchor="middle"
        fontSize="20"
        fill={`var(--pale)`}
      >
        LEARN MORE
      </text>
      <line
        id={`learn-more-button-line-${id}`}
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
        id={`learn-more-button-polyline-${id}`}
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
