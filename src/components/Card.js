import React from "react";
import { LearnMoreButton } from "./LearnMoreButton";

const Card = ({ section, index }) => {
  return (
    <div className={`card selectable ${section.color}`}>
      <div className="card-content">
        <h4 style={{ color: `var(--${section.accentColor})` }}>
          <div
            className="logo"
            style={{ backgroundColor: `var(--${section.accentColor})` }}
          />
          <br />
          {section.name}
        </h4>
        <div style={{ color: `var(--${section.textColor})` }}>
          {section.description}
        </div>
        <LearnMoreButton section={section} />
      </div>
    </div>
  );
};

export default Card;
