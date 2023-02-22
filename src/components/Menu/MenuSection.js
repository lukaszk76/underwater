import { memo } from "react";
import { useNavigate } from "react-router-dom";

const MenuSection = ({ section, index }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${section.short}`);
  }

  return (
    <button className="menu-button" onClick={handleClick}>
      {section.short}
      {/*<div className="menu-button-underline" />*/}
    </button>
  );
};

export default memo(MenuSection);
