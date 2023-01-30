import { useLayoutEffect, memo } from "react";
import { useNavigate } from "react-router-dom";

const MenuSection = ({ section, index }) => {
  const position = 1.2 * index * 60 + 30;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const menuSectionEnd = document.querySelector(
      `.full-screen-menu-section-end-${section.short}`
    );
    const menuSection = document.querySelector(
      `.full-screen-menu-section-${section.short}`
    );
    const menuSectionContent = document.querySelector(
      `.full-screen-menu-section-content-${section.short}`
    );

    menuSection.addEventListener("mouseenter", () => {
      menuSectionEnd.style.width = `20px`;
      menuSection.style.setProperty(
        "background-color",
        `var(--${section.color})`
      );
      menuSection.style.setProperty("background-image", "none");
      menuSectionContent.style.setProperty(
        "color",
        `var(--${section.accentColor})`
      );
    });
    menuSection.addEventListener("mouseleave", () => {
      menuSectionEnd.style.width = `10px`;
      menuSection.style.backgroundImage =
        "radial-gradient(rgba(23, 78, 99, 0.3), transparent)";
      menuSection.style.backgroundColor = `transparent`;
      menuSectionContent.style.setProperty("color", `var(--pale)`);
    });

    return () => {
      menuSection.removeEventListener("mouseenter", () => {
        menuSectionEnd.style.width = `20px`;
        menuSection.style.setProperty(
          "background-color",
          `var(--${section.color})`
        );
        menuSection.style.setProperty("background-image", "none");
      });
      menuSection.removeEventListener("mouseleave", () => {
        menuSectionEnd.style.width = `10px`;
        menuSection.style.setProperty(
          "background-image",
          "radial-gradient(rgba(23, 78, 99, 0.3), transparent)"
        );
        menuSection.style.backgroundColor = `transparent`;
      });
    };
  }, []);

  function handleClick() {
    console.log(`/${section.short}`);
    navigate(`/${section.short}`);
  }

  return (
    <div
      style={{
        color: `var(--pale)`,
        top: `${position}px`,
      }}
      className={`glass full-screen-menu-section full-screen-menu-section-${section.short}`}
      onClick={handleClick}
    >
      <div
        className={`full-screen-menu-section-content full-screen-menu-section-content-${section.short}`}
      >
        {section.name}
      </div>
      <div
        className={`full-screen-menu-section-end full-screen-menu-section-end-${section.short}`}
        style={{
          backgroundColor: `var(--${section.color})`,
          top: `${position}px`,
        }}
      />
    </div>
  );
};

export default memo(MenuSection);
