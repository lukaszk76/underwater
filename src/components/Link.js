import React from "react";

export const Link = ({ section, index }) => {
  const handleClick = () => {
    console.log(section.name);
  };
  return (
    <div
      className={`menu-link menu-link-${section.color}`}
      onClick={handleClick}
      style={{ left: `${250 + index * 200}px` }}
    >
      {section.short}
    </div>
  );
};
