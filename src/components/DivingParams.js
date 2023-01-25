import React, { memo, useContext } from "react";
import { Context } from "./ContextProvider";
import { DepthMeter } from "./DepthMeter";

const DivingParams = () => {
  const context = useContext(Context);
  return (
    <div className="depth-params glass">
      <DepthMeter />
      <div>
        <p>
          <span className="depth-meter__label">Depth:</span>
          <span className="depth-meter__value">
            {` ${Math.round(context.scrollProgress * 40 + 10)} m`}
          </span>
        </p>
        <p>
          <span className="depth-meter__label">Pressure:</span>
          <span className="depth-meter__value">
            {` ${((context.scrollProgress * 40 + 20) / 9.81).toFixed(1)} bar`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default memo(DivingParams);
