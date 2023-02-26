import React, { memo, useContext, useEffect, useLayoutEffect } from "react";
import { Context } from "../components/ContextProvider";
import { TripsCard } from "../components/Trips/TripsCard";
import bajkal from "../assets/trips/bajkal.jpg";
import barents from "../assets/trips/barents.jpg";
import egipt from "../assets/trips/egipt.jpg";
import filipiny from "../assets/trips/filipiny.jpg";
import kamczatka from "../assets/trips/kamczatka.jpg";
import kuba from "../assets/trips/kuba.jpg";
import malediwy from "../assets/trips/malediwy.jpg";
import meksyk from "../assets/trips/meksyk.jpg";
import orda from "../assets/trips/orda.jpg";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollAnimatedIcons from "../components/ScrollAnimatedIcons";
import { addSmoothScroll } from "../helpers/addSmoothScroll";
import { Globe } from "../components/Trips/Globe";
import octopus from "../assets/octopus-nobg.png";

const trips = [
  {
    image: bajkal,
    title: "Bajkał",
    text: '"Święte morze" – tak Buriaci nazywają Bajkał, perłę jezior świata. To najstarsze i najgłębsze jezioro na Ziemi - jego wiek ocenia się na ponad 25 mln lat!!',
    id: "bajkal",
    top: 110,
    left: 15,
  },
  {
    image: barents,
    title: "Morze Barentsa",
    text: "Morze Barentsa to największe morze na świecie, które nie należy do żadnego państwa. Znajduje się na północ od Norwegii i Rosji, a jego powierzchnia wynosi 1 300 000 km2.",
    id: "barents",
    top: 150,
    left: 70,
  },
  {
    image: egipt,
    title: "Egipt",
    text: "Egipt to kraj o niezwykłej historii, kulturowej bogactwie i pięknych plażach. Warto tu przyjechać nie tylko w celu nurkowania, ale także w celu zwiedzania.",
    id: "egipt",
    top: 190,
    left: 20,
  },
  {
    image: filipiny,
    title: "Filipiny",
    text: "Filipiny to archipelag w południowo-wschodniej Azji, składający się z 7 107 wysp. Wyspy te są jednym z najbardziej popularnych miejsc nurkowych na świecie.",
    id: "filipiny",
    top: 230,
    left: 75,
  },
  {
    image: kamczatka,
    title: "Kamczatka",
    text: "Kamczatka to najbardziej wysunięty na północ region Rosji. Znajduje się tu wiele ciekawych miejsc nurkowych, które warto odwiedzić.",
    id: "kamczatka",
    top: 270,
    left: 20,
  },
  {
    image: kuba,
    title: "Kuba",
    text: "Kuba to kraj położony w południowo-wschodniej części Karaibów. Warto tu przyjechać nie tylko w celu nurkowania, ale także w celu zwiedzania.",
    id: "kuba",
    top: 310,
    left: 65,
  },
  {
    image: malediwy,
    title: "Malediwy",
    text: "Malediwy to archipelag w południowo-wschodniej Azji, składający się z 1 192 wysp. Wyspy te są jednym z najbardziej popularnych miejsc nurkowych na świecie.",
    id: "malediwy",
    top: 350,
    left: 20,
  },
  {
    image: meksyk,
    title: "Meksyk",
    text: "Meksyk to kraj położony w Ameryce Środkowej. Warto tu przyjechać nie tylko w celu nurkowania, ale także w celu zwiedzania.",
    id: "meksyk",
    top: 390,
    left: 70,
  },
  {
    image: orda,
    title: "Jaskinia Ordyńska",
    text: "Orda znajduje się na pograniczu Europy i Azji. Ta fenomenalna jaskinia gipsowa to najdłuższy znany w Rosji podwodny labirynt korytarzy i komnat.",
    id: "orda",
    top: 430,
    left: 15,
  },
];
const Trips = () => {
  const context = useContext(Context);

  useEffect(() => {
    addSmoothScroll();
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    const path = document.querySelector(".svg-container path");
    const length = path.getTotalLength();
    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = length;

    const updatePath = () => {
      const scrollPercentage =
        (1.05 *
          (document.documentElement.scrollTop + document.body.scrollTop)) /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight) -
        0.1;

      const drawLength = length * scrollPercentage;
      path.style.strokeDashoffset = length - drawLength;
    };

    window.addEventListener("scroll", () => {
      updatePath();
    });
    return () =>
      window.removeEventListener("scroll", () => {
        updatePath();
      });
  }, []);

  return (
    <div className="trips-page">
      <Cursor />
      <Footer />
      <ScrollAnimatedIcons left="96vw" />
      <img src={octopus} id="octopus-trips" alt="octopus" />
      <div className="trips-page__hero">
        <div className="trips-page__hero_header">
          <Header
            title={context.sections.DIVING_TRIPS.name}
            subtitle={context.sections.DIVING_TRIPS.description}
            link={"/"}
            buttoncolor={"var(--safety-orange)"}
            textcolor={"var(--pale)"}
            glass
          />
        </div>
        {/*<img src={stars} className="trips-page__hero__image" alt="stars" />*/}
        <Globe />
      </div>

      <div className="svg-container">
        <svg width="100%" height="100%" viewBox="0 0 213 1568" fill="none">
          <path
            d="M3.50085 0.5C1.61044 66.5314 72.696 108.282 128.001 174.5C159.382 212.074 180.222 268.597 186 306.5C191.778 344.403 190.782 363.144 179.001 402.5C164.422 451.203 157.001 472 153.501 491C148.825 516.385 143.186 545.51 156.001 580C169.53 616.41 203.324 648.161 208.501 698.5C211.28 725.525 214.063 790.136 192.501 831.5C172.539 869.794 135.519 889.329 149.501 941C161.001 983.5 139.21 1032.07 132.001 1052C122.198 1079.1 101.135 1124.92 132.001 1176.5C148.837 1204.64 162.501 1264.5 162.501 1309C162.501 1353.5 162.001 1400.5 128.001 1450.5C93.5025 1492.39 96.0008 1578 128.001 1563C135.438 1561.84 145.646 1542.62 137.501 1535.5C128.81 1527.9 121.778 1538.43 124.501 1543.5"
            stroke="var(--rufous)"
            stroke-width="5"
          />
        </svg>
      </div>

      <div className="trips-page__content">
        {trips.map((trip) => (
          <TripsCard
            key={trip.id}
            left={trip.left}
            top={trip.top}
            text={trip.text}
            image={trip.image}
            id={trip.id}
            title={trip.title}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Trips);
