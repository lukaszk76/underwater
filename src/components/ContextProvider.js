import React, { createContext, useState } from "react";

export const sections = {
  DIVING_CENTER: {
    short: "Croatia",
    name: "Diving Center Croatia",
    color: "indigo-dye",
    description: "spend you vacation in the most beautiful place in the world",
  },
  DIVING_TRIPS: {
    short: "Trips",
    name: "Diving Trips",
    color: "rufous",
    description: "vist with us the most exciting diving places in the world",
  },
  DIVING_TRAININGS: {
    short: "Trainings",
    name: "Diving Trainings",
    color: "buff",
    description: "become a professional diver with us",
  },
  CUBA_VISAS: {
    short: "Visas",
    name: "Visas to Cuba",
    color: "safety-orange",
    description: "we can help you with the visa to Cuba",
  },
  DIVING_EQUIPMENT: {
    short: "Equipment",
    name: "Diving Equipment",
    color: "verdigris",
    description: "do you want to buy or rent diving equipment?",
  },
};

export const Context = createContext({
  section: sections.DIVING_EQUIPMENT,
  sections,
  setSection: () => {},
});
export const ContextProvider = ({ children }) => {
  const [section, setSection] = useState(sections.DIVING_EQUIPMENT);

  const value = { section, sections, setSection };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
