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
    <button
      id={`learn-more-button-${id}`}
      onClick={handleClick}
      className="learn-more-button"
      style={{ backgroundColor: color }}
    >
      learn more
    </button>
  );
};
