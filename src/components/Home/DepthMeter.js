import React from "react";
import GaugeChart from "react-gauge-chart";

export const DepthMeter = ({ scrollPercentage }) => {
  return (
    <div className="depth-meter">
      <GaugeChart
        id="gc"
        nrOfLevels={20}
        arcWidth={0.2}
        needleColor={"#0c2434"}
        colors={["#0c2434", "#a30000"]}
        needleBaseColor={"#E6F4F1"}
        textColor={"#0c2434"}
        percent={scrollPercentage / 100}
        formatTextValue={(value) => value + "%"}
      />
    </div>
  );
};
