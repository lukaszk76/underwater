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
    // const body = document.querySelector("body");
    setScrollPercentage(scrollPercentage);
    if (scrollPercentage < 20) {
      context.setSection(() => context.sections.DIVING_CENTER);
      // body.style.backgroundColor = `var(--${context.sections.DIVING_CENTER.color})`;
    } else if (scrollPercentage < 40) {
      context.setSection(() => context.sections.DIVING_TRIPS);
      // body.style.backgroundColor = `var(--${context.sections.DIVING_TRIPS.color})`;
    } else if (scrollPercentage < 60) {
      context.setSection(() => context.sections.DIVING_TRAININGS);
      // body.style.backgroundColor = `var(--${context.sections.DIVING_TRAININGS.color})`;
    } else if (scrollPercentage < 80) {
      context.setSection(() => context.sections.CUBA_VISAS);
      // body.style.backgroundColor = `var(--${context.sections.CUBA_VISAS.color})`;
    } else {
      context.setSection(() => context.sections.DIVING_EQUIPMENT);
      // body.style.backgroundColor = `var(--${context.sections.DIVING_EQUIPMENT.color})`;
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
          <span className="depth-meter__label">Depth:</span>
          <span className="depth-meter__value">
            {` ${Math.round(scrollPercentage * 0.4 + 10)} m`}
          </span>
        </p>
        <p>
          <span className="depth-meter__label">Pressure:</span>
          <span className="depth-meter__value">
            {` ${((scrollPercentage * 0.4 + 20) / 9.81).toFixed(1)} bar`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default memo(DivingParams);
