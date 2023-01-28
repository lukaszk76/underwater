import React, { useLayoutEffect, useContext } from "react";
import { gsap } from "gsap";
import Cursor from "../components/Cursor";
import { Context } from "../components/ContextProvider";
import StickerCard from "../components/StickerCard";
import { LearnMoreButton } from "../components/LearnMoreButton";
import cuba from "../assets/cuba.jpg";
import water3 from "../assets/water.mp4";

export const VisasToCubaPage = () => {
  const context = useContext(Context);

  useLayoutEffect(() => {
    document.title = "Visas to Cuba";
    gsap.to(".visas-to-cuba-panel-left", {
      duration: 1.5,
      left: 0,
      opacity: 1,
      ease: "power3.out",
    });
    gsap.to(".visas-to-cuba-panel-right", {
      duration: 1,
      right: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  const cardsLeft = [
    {
      id: "visa-to-cuba-1",
      title: "Dobrze trafiłeś! ",
      text: "W naszym biurze na ul. Kapelanka 1a w Krakowie otrzymasz wizę (kartę turysty) od ręki i bez opłaty za ekspresowe tempo! ",
      backgroundColor: "var(--verdigris)",
      textColor: "var(--background)",
      titleColor: "var(--background)",
      left: false,
    },
    {
      id: "visa-to-cuba-2",
      title: "Wjazd z USA",
      text: "Wizy nie dotyczą wjazdu na Kubę ze Stanów Zjednoczonych. Przelot z USA na Kubę wymaga wyrobienia specjalnej wizy na lotnisku w cenie 100$.",
      backgroundColor: "var(--safety-orange)",
      textColor: "var(--background)",
      titleColor: "var(--background)",
      left: false,
    },
    {
      id: "visa-to-cuba-3",
      title: "Wizy na Kubę",
      text: <img src={cuba} />,
      backgroundColor: "var(--sea)",
      textColor: "var(--background)",
      titleColor: "var(--safety-orange)",
      left: false,
    },
  ];

  const cardsRight = [
    {
      id: "visa-to-cuba-4",
      title: "Ceny wiz",
      text: "Cena wizy kubańskiej wynosi 22 euro płatne w/g kursu sprzedaży banku MBank. Opłata za pośrednictwo wizowe 80,00 pln netto (+23% VAT) za wizę.",
      backgroundColor: "var(--verdigris)",
      textColor: "var(--background)",
      titleColor: "var(--background)",
      left: true,
    },
    {
      id: "visa-to-cuba-5",
      title: "Nurkujemy!",
      text: (
        <video autoPlay muted loop style={{ width: "100%" }}>
          <source src={water3} type="video/mp4" />
        </video>
      ),
      backgroundColor: "var(--sea)",
      textColor: "var(--background)",
      titleColor: "var(--safety-orange)",
      left: true,
    },
    {
      id: "visa-to-cuba-6",
      title: "Opłaty dodatkowe",
      text: "Do powyższych kwot należy doliczyć koszty wysyłki kurierskiej (cena wysyłki 1 listu na wskazany adres). W przypadku wysyłki kilku wiz na wspólny adres, koszty przesyłki liczone są jednorazowo.",
      backgroundColor: "var(--safety-orange)",
      textColor: "var(--background)",
      titleColor: "var(--background)",
      left: true,
    },
  ];

  return (
    <div className={"visas-to-cuba-page"}>
      <Cursor />
      <h1
        className={"visas-to-cuba-title glass"}
        style={{ color: "var(--verdigris)" }}
      >
        {context.sections.CUBA_VISAS.name}
      </h1>
      <div className={"visas-to-cuba-panel visas-to-cuba-panel-left"}>
        <div
          className="logo cuba-logo"
          style={{ backgroundColor: `var(--safety-orange)` }}
        />
        {cardsLeft.map((card, index) => (
          <StickerCard
            key={index}
            id={card.id}
            backgroundColor={card.backgroundColor}
            textColor={card.textColor}
            titleColor={card.titleColor}
            title={card.title}
            left={card.left}
          >
            {card.text}
          </StickerCard>
        ))}
      </div>
      >
      <div className={"visas-to-cuba-panel visas-to-cuba-panel-right"}>
        {cardsRight.map((card, index) => (
          <StickerCard
            key={index}
            id={card.id}
            backgroundColor={card.backgroundColor}
            textColor={card.textColor}
            titleColor={card.titleColor}
            title={card.title}
            left={card.left}
          >
            {card.text}
          </StickerCard>
        ))}
      </div>
      <div style={{ position: "fixed", bottom: "30px", right: "30px" }}>
        <LearnMoreButton section={context.sections.CUBA_VISAS} />
      </div>
    </div>
  );
};
