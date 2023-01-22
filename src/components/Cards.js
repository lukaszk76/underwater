import React, { useContext } from "react";
import Card from "./Card";
import { Context } from "./ContextProvider";

const Cards = () => {
  const context = useContext(Context);
  return (
    <div className={"cards"}>
      <Card section={context.sections.DIVING_CENTER} />

      <Card section={context.sections.DIVING_TRIPS} />

      <Card section={context.sections.DIVING_TRAININGS} />

      <Card section={context.sections.CUBA_VISAS} />

      <Card section={context.sections.DIVING_EQUIPMENT} />
    </div>
  );
};

export default Cards;
