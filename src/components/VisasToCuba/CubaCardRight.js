import React, { memo } from "react";

const CubaCardRight = () => {
  return (
    <div
      className={
        "visas-to-cuba-parallax-layer cuba-card cuba-card-right visas-to-cuba-section"
      }
      data-speed="1.1"
    >
      <div className={"visas-to-cuba-content"}>
        <div className={"cuba-text-card"}>
          <h2>Lorem ipsum dolor sit amet</h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </div>
  );
};

export default memo(CubaCardRight);
