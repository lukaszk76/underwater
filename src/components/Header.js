import React, { memo } from "react";

import { LearnMoreButton } from "./LearnMoreButton";
import AnimatedLogo from "./AnimatedLogo";

const Header = ({ title, subtitle, buttoncolor, textcolor, link }) => {
  return (
    <div className="header">
      <div className="header-top">
        <AnimatedLogo link={link} />

        <div className="header-title" style={{ color: textcolor }}>
          {title}
        </div>

        <div className="header-subtitle" style={{ color: textcolor }}>
          {subtitle}
        </div>
      </div>

      <div className="header-bottom">
        <LearnMoreButton link={link} color={buttoncolor} />
      </div>
    </div>
  );
};

export default memo(Header);
