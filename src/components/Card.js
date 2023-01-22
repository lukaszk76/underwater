import React from "react";
import { LearnMoreButton } from "./LearnMoreButton";

const Card = ({ section }) => {
  return (
    <div className={`card selectable ${section.color}`}>
      <div className="card-content">
        <h4 style={{ color: `var(--${section.accentColor})` }}>
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
