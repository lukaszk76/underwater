import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { DepthMeter } from "./DepthMeter";
import { getScrollPercentage } from "../../helpers/getScrollPercentage";
import { Context } from "../ContextProvider";

const DivingParams = () => {
  const context = useContext(Context);

  const [scrollPercentage, setScrollPercentage] = useState(0);

  const updateSection = useCallback(() => {
    const scrollPercentage = getScrollPercentage();
    setScrollPercentage(scrollPercentage);
    if (scrollPercentage < 20) {
      context.setSection(() => context.sections.DIVING_CENTER);
    } else if (scrollPercentage < 40) {
      context.setSection(() => context.sections.DIVING_TRIPS);
    } else if (scrollPercentage < 60) {
      context.setSection(() => context.sections.DIVING_TRAININGS);
    } else if (scrollPercentage < 80) {
      context.setSection(() => context.sections.CUBA_VISAS);
    } else {
      context.setSection(() => context.sections.DIVING_EQUIPMENT);
    }
  }, []);

  const scrollHandler = () => {
    updateSection();
  };

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
    <div className="depth-params glass">
      <DepthMeter scrollPercentage={scrollPercentage} />
      <div>
        <p>
          <span className="depth-meter__label">Pressure:</span>
          <span className="depth-meter__value">
            {` ${((scrollPercentage * 0.4 + 20) / 9.81).toFixed(1)} bar`}
          </span>
        </p>
        <p>
          <span className="depth-meter__label">Depth:</span>
          <span className="depth-meter__value">
            {` ${Math.round(scrollPercentage * 0.4 + 10)} m`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default memo(DivingParams);
