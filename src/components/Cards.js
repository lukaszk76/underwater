import React, { memo, useContext } from "react";
import Card from "./Card";
import { Context } from "./ContextProvider";

const Cards = () => {
  const context = useContext(Context);
  return (
    <div className={"cards"}>
      {Object.keys(context.sections).map((section, index) => {
        return (
          <Card section={context.sections[section]} key={index} index={index} />
        );
      })}
    </div>
  );
};

export default memo(Cards);
