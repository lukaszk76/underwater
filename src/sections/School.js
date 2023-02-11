import React, { memo, useEffect } from "react";
import Octopus from "../components/School/Octopus";
import Cursor from "../components/Cursor";
import { addSmoothScroll } from "../helpers/addSmoothScroll";
import Footer from "../components/Footer";
import ScrollAnimatedIcons from "../components/ScrollAnimatedIcons";
import Header from "../components/Header";
import { useContext } from "react";
import { Context } from "../components/ContextProvider";

const School = () => {
  const context = useContext(Context);
  useEffect(() => {
    addSmoothScroll();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="school-page">
      <Footer />
      <ScrollAnimatedIcons left="96vw" />
      <Cursor />
      <Octopus />
      <div className="school-page__hero">
        <Header
          title={context.sections.DIVING_TRAININGS.name}
          subtitle={context.sections.DIVING_TRAININGS.description}
          link={"/"}
          buttoncolor={"var(--verdigris)"}
          textcolor={"var(--buff)"}
          glass
        />
      </div>
      <div className="school-page__content">content</div>
    </div>
  );
};

export default memo(School);
