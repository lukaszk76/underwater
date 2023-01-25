import React, { useCallback, useEffect, useState } from "react";

export const ScrollSvg = ({ id }) => {
  const [variant, setVariant] = useState(1);

  const toggleCss = useCallback(() => {
    const transformX = [0, 10];
    const lineX2 = [17, 3];

    const line = document.getElementById(`scroll-svg-line-${id}`);
    const polyline = document.getElementById(`scroll-svg-polyline-${id}`);
    line.style.transform = `translateX(${transformX[variant]}px)`;
    line.setAttribute("x2", `${lineX2[variant]}`);
    polyline.style.transform = `translateX(${transformX[variant]}px)`;
  }, [id, variant]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (variant === 0) {
        setVariant(1);
      } else {
        setVariant(0);
      }
    }, 2000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    toggleCss();
  }, [variant, toggleCss]);

  return (
    <svg
      className="scroll-svg"
      id={`scroll-svg-${id}`}
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <line
        id={`scroll-svg-line-${id}`}
        x1="17"
        y1="17"
        x2="17"
        y2="17"
        strokeWidth="3"
        stroke="var(--buff)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        id={`scroll-svg-polyline-${id}`}
        points="10 12 17 17 10 22"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="var(--buff)"
        strokeWidth="3"
      ></polyline>
    </svg>
  );
};
