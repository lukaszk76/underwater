import React, { useContext } from "react";
import GaugeChart from "react-gauge-chart";
import { Context } from "./ContextProvider";

export const DepthMeter = () => {
  const context = useContext(Context);
  return (
    <div className="depth-meter">
      <GaugeChart
        id="gc"
        nrOfLevels={20}
        arcWidth={0.085}
        needleColor={"var(--background)"}
        needleBaseColor={"var(--verdigris)"}
        percent={context.scrollProgress}
        formatTextValue={() => ""}
      />
    </div>
  );
};
