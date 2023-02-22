import React, { memo, useContext } from "react";
import { Context } from "../ContextProvider";
import "@lottiefiles/lottie-player";
import FullScreenMenuSection from "./MenuSection";

export const Menu = memo(() => {
  const context = useContext(Context);

  return (
    <div className={"menu glass-dark"}>
      {Object.keys(context.sections).map((section, index) => {
        return (
          <FullScreenMenuSection
            key={context.sections[section].short}
            section={context.sections[section]}
            index={index}
          />
        );
      })}
    </div>
  );
});
