import React, { memo, useCallback, useContext, useLayoutEffect } from "react";
import { Context } from "../ContextProvider";
import "@lottiefiles/lottie-player";
import FullScreenMenuSection from "./MenuSection";
import { ScrollSvg } from "../ScrollSvg";

export const Menu = memo(() => {
  const context = useContext(Context);

  const showMenu = (show) => {
    const menuSections = document.querySelectorAll(".full-screen-menu-section");
    const menu = document.querySelector(".menu");
    let delay = 0;
    menuSections.forEach((section) => {
      setTimeout(() => {
        show
          ? section.classList.add("visible")
          : section.classList.remove("visible");
      }, delay);
      delay += 100;
    });
    setTimeout(() => {
      const closeButton = document.querySelector("#close-button");
      closeButton.setDirection(show ? 1 : -1);
      closeButton.seek("0%");
      closeButton.play();
      show ? menu.classList.add("visible") : menu.classList.remove("visible");
    });
  };
  const addEventListeners = useCallback(() => {
    const menuSections = document.querySelectorAll(
      ".full-screen-menu-section "
    );
    const parallaxLayers = document.querySelectorAll(".parallax-layer");
    const menu = document.querySelector(".menu");
    const closeButton = document.querySelector("#close-button");
    const body = document.querySelector("body");

    parallaxLayers.forEach((parallaxLayer) => {
      parallaxLayer.addEventListener("mouseenter", () => {
        showMenu(false);
      });
    });

    body.addEventListener("click", () => {
      showMenu(false);
    });

    closeButton.addEventListener("click", () => {
      showMenu(false);
    });

    menuSections.forEach((section) => {
      section.addEventListener("click", () => {
        showMenu(false);
      });
    });

    menu.addEventListener("mouseenter", () => {
      showMenu(true);
    });

    return () => {
      menuSections.forEach((section) => {
        section.removeEventListener("click", () => {
          showMenu(false);
        });
      });

      closeButton.removeEventListener("click", () => {
        showMenu(false);
      });

      menu.removeEventListener("mouseenter", () => {
        showMenu(true);
      });

      parallaxLayers.forEach((parallaxLayer) => {
        parallaxLayer.removeEventListener("mouseenter", () => {
          showMenu(false);
        });
      });

      body.removeEventListener("click", () => {
        showMenu(false);
      });
    };
  }, []);

  useLayoutEffect(() => {
    return addEventListeners();
  }, [addEventListeners]);

  return (
    <>
      <div className={"menu"} />
      <div className={"close-button"}>
        <lottie-player
          id="close-button"
          count={1}
          speed={1}
          mode="normal"
          src="https://assets2.lottiefiles.com/private_files/lf30_ltbsyn9h.json"
          style={{
            width: "200px",
          }}
        />
      </div>
      <div className="menu-pointer">
        <ScrollSvg id="menu-pointer" />
      </div>
      {Object.keys(context.sections).map((section, index) => {
        return (
          <FullScreenMenuSection
            key={context.sections[section].short}
            section={context.sections[section]}
            index={index}
          />
        );
      })}
    </>
  );
});
