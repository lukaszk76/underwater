import React, { memo } from "react";
import Header from "../Header";
const HomeSidePanel = () => {
  return (
    <div className={"home-side-panel indigo-dye"}>
      <Header
        title={"Nautilus"}
        subtitle={"your adventure starts here"}
        textcolor={"var(--safety-orange)"}
        buttoncolor={"var(--safety-orange"}
        link={"/"}
      />
    </div>
  );
};

export default memo(HomeSidePanel);
