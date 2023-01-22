import React from "react";
import { LearnMoreButton } from "./LearnMoreButton";

const Card = ({ section }) => {
  return (
    <div className={`card selectable ${section.color}`}>
      <div className="card-content">
        <h4>{section.name}</h4>
        <div>{section.description}</div>
        <LearnMoreButton id={section.short} />
      </div>
    </div>
  );
};

export default Card;
