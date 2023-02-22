import React, { memo, useCallback, useEffect, useState } from "react";
import { DepthMeter } from "./DepthMeter";
import { getScrollPercentage } from "../../helpers/getScrollPercentage";

const DivingParams = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const scrollHandler = useCallback(() => {
    setScrollPercentage(getScrollPercentage());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      scrollHandler();
    });
    return () => {
      window.removeEventListener("scroll", () => {
        scrollHandler();
      });
    };
  }, []);

  return (
    <div className="depth-params glass-dark">
      <DepthMeter scrollPercentage={scrollPercentage} />
      <div className="depth-params-numbers">
        <div className="depth-meter__label">Pressure:</div>
        <div className="depth-meter__value">
          {` ${((scrollPercentage * 0.4 + 20) / 9.81).toFixed(1)} bar`}
        </div>

        <div className="depth-meter__label">Depth:</div>
        <div className="depth-meter__value">
          {` ${Math.round(scrollPercentage * 0.4 + 10)} m`}
        </div>
      </div>
    </div>
  );
};

export default memo(DivingParams);
