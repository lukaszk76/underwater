import React, { useContext } from "react";
import GaugeChart from "react-gauge-chart";

export const DepthMeter = ({ scrollPercentage }) => {
  return (
    <div className="depth-meter">
      <GaugeChart
        id="gc"
        nrOfLevels={20}
        arcWidth={0.085}
        needleColor={"var(--background)"}
        needleBaseColor={"var(--verdigris)"}
        percent={scrollPercentage / 100}
        formatTextValue={() => ""}
      />
    </div>
  );
};
