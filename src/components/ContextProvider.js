import React, { createContext, useState } from "react";

export const sections = {
  DIVING_CENTER: {
    short: "croatia",
    name: "Diving Center Croatia",
    color: "indigo-dye",
    accentColor: "safety-orange",
    textColor: "pale",
    description: "spend you vacation in the most beautiful place in the world",
    scrollPosition: 0,
  },
  DIVING_TRIPS: {
    short: "trips",
    name: "Diving Trips",
    color: "rufous",
    accentColor: "background",
    textColor: "pale",
    description: "vist with us the most exciting diving places in the world",
    scrollPosition: 0.2,
  },
  DIVING_TRAININGS: {
    short: "school",
    name: "Diving School",
    color: "buff",
    accentColor: "rufous",
    textColor: "indigo-dye",
    description: "become a professional diver with us",
    scrollPosition: 0.4,
  },
  CUBA_VISAS: {
    short: "cuba",
    name: "Visas to Cuba",
    color: "safety-orange",
    accentColor: "indigo-dye",
    textColor: "pale",
    description: "we can help you with the visa to Cuba",
    scrollPosition: 0.6,
  },
  DIVING_EQUIPMENT: {
    short: "shop",
    name: "Diving Equipment",
    color: "verdigris",
    accentColor: "buff",
    textColor: "indigo-dye",
    description: "do you want to buy or rent diving equipment?",
    scrollPosition: 0.8,
  },
};

export const Context = createContext({
  section: sections.DIVING_EQUIPMENT,
  sections,
  setSection: () => {},
});
export const ContextProvider = ({ children }) => {
  const [section, setSection] = useState(sections.DIVING_EQUIPMENT);

  const value = {
    section,
    sections,
    setSection,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
