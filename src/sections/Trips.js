import React, { memo, useContext, useEffect, useLayoutEffect } from "react";
import { Context } from "../components/ContextProvider";
import meduza from "../assets/meduza2.png";
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
    left: 65,
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
    left: 60,
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
      <div className="trips-page__hero">
        <div className="trips-page__hero_header">
          <Header
            title={context.sections.DIVING_TRIPS.name}
            subtitle={context.sections.DIVING_TRIPS.description}
            link={"/"}
            buttoncolor={"var(--rufous)"}
            textcolor={"var(--rufous)"}
            glass
          />
        </div>
        <img src={meduza} className="trips-page__hero__image" alt="meduza" />
      </div>

      <div className="svg-container">
        <svg width="100%" height="100%" viewBox="0 0 121 1560" fill="none">
          <path
            d="M33 2C9.66663 35.8333 -21.6539 116.186 33 173.5C83.4541 226.41 125.232 249.508 116.5 318.5C109.166 362.232 102.305 355.933 83.9999 401.5C65.0494 448.674 62 471 58.5 490C53.8239 515.385 48.1847 544.51 60.9999 579C74.5288 615.41 108.323 647.161 113.5 697.5C116.279 724.525 119.062 789.136 97.4999 830.5C77.5377 868.794 47.5922 886.919 54.4999 940C60.6264 987.078 48.2092 1035.57 40.9999 1055.5C31.1966 1082.6 6.13408 1123.92 36.9999 1175.5C53.836 1203.64 97.4161 1260.58 93.9999 1321C90.578 1381.52 70.7008 1421.82 54.4999 1443.5C32.9999 1475.5 25.4999 1504.5 32.9999 1524C41.9276 1547.21 69.9999 1570 96.9999 1547.5C118.6 1529.5 110 1498.5 101 1485.5C94.4999 1474 70.4999 1469 63.4999 1488.5C57.6277 1504.86 70.9999 1511.5 74.9999 1511.5"
            // stroke="#46a4c1"
            stroke="var(--rufous)"
            strokeWidth="5"
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
