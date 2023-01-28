import React, { memo, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";

const StickerCard = ({
  id,
  title,
  children,
  backgroundColor,
  textColor,
  titleColor,
  left = true,
}) => {
  const randomX = useMemo(() => Math.round(Math.random() * 60 - 30), []);
  const randomDelay = useMemo(() => Math.random(), []);
  const randomDuration = useMemo(() => Math.random() * 0.5 + 1.5, []);
  const randomRotate = useMemo(() => Math.random() * -10 + 360 + 5, []);

  useLayoutEffect(() => {
    gsap.to(`#${id}`, {
      duration: randomDuration,
      delay: randomDelay,
      x: `${randomX}%`,
      rotate: left ? -randomRotate : randomRotate,
      ease: "power4.out",
    });
  }, []);

  return (
    <div
      id={id}
      className="sticker-card"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        transform: `translateX(${left ? "" : "-"}100vw) rotate(${
          left ? "-" : ""
        }360deg)`,
      }}
    >
      {title && (
        <h6 className="sticker-card-title" style={{ color: titleColor }}>
          {title}
        </h6>
      )}
      {children}
    </div>
  );
};

export default memo(StickerCard);
