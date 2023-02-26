import React, { memo } from "react";
import Header from "../Header";
import octopus from "../../assets/octopus-nobg.png";

const HomeSidePanel = () => {
  return (
    <div className={"home-side-panel indigo-dye"}>
      <Header
        title={"Nautilus"}
        subtitle={"your adventure starts here"}
        textcolor={"var(--pale)"}
        buttoncolor={"var(--safety-orange"}
        link={"/"}
      />
      <img src={octopus} id="octopus-croatia" alt="octopus" />
    </div>
  );
};

export default memo(HomeSidePanel);
