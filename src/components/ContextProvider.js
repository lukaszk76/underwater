import React, { createContext, useState } from "react";

export const sections = {
  DIVING_CENTER: {
    short: "Croatia",
    name: "Diving Center Croatia",
    color: "indigo-dye",
    accentColor: "safety-orange",
    textColor: "pale",
    description: "spend you vacation in the most beautiful place in the world",
  },
  DIVING_TRIPS: {
    short: "Trips",
    name: "Diving Trips",
    color: "rufous",
    accentColor: "verdigris",
    textColor: "pale",
    description: "vist with us the most exciting diving places in the world",
  },
  DIVING_TRAININGS: {
    short: "Trainings",
    name: "Diving Trainings",
    color: "buff",
    accentColor: "rufous",
    textColor: "indigo-dye",
    description: "become a professional diver with us",
  },
  CUBA_VISAS: {
    short: "Visas",
    name: "Visas to Cuba",
    color: "safety-orange",
    accentColor: "indigo-dye",
    textColor: "pale",
    description: "we can help you with the visa to Cuba",
  },
  DIVING_EQUIPMENT: {
    short: "Equipment",
    name: "Diving Equipment",
    color: "verdigris",
    accentColor: "rufous",
    textColor: "indigo-dye",
    description: "do you want to buy or rent diving equipment?",
  },
};

export const Context = createContext({
  section: sections.DIVING_EQUIPMENT,
  sections,
  setSection: () => {},
  top: false,
  setTop: () => {},
  bottom: false,
  setBottom: () => {},
});
export const ContextProvider = ({ children }) => {
  const [section, setSection] = useState(sections.DIVING_EQUIPMENT);
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);

  const value = {
    section,
    sections,
    setSection,
    top,
    setTop,
    bottom,
    setBottom,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
