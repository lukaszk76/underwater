import React, { memo, useContext, useEffect } from "react";
import { LearnMoreButton } from "../LearnMoreButton";
import { sections } from "../ContextProvider";
import { Context } from "../ContextProvider";
const HomeSidePanel = () => {
  const context = useContext(Context);

  return (
    <div className={"home-side-panel indigo-dye"}>
      <div className="card-content">
        <h4 style={{ color: `var(--safety-orange)` }}>
          <div
            className="logo"
            style={{ backgroundColor: `var(--safety-orange)` }}
          />
          <br />
          Diving Center Nautilus
        </h4>
        <div style={{ color: `var(--pale)` }}>your adventure starts here</div>
        <LearnMoreButton section={sections.DIVING_EQUIPMENT} />
      </div>
    </div>
  );
};

export default memo(HomeSidePanel);
