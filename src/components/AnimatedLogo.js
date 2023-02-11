import React, { memo } from "react";
import video from "../assets/waves.mp4";
import { useNavigate } from "react-router-dom";
const AnimatedLogo = ({ link }) => {
  const navigate = useNavigate();
  return (
    <div className="animated-logo" onClick={() => navigate(link)}>
      <video src={video} autoPlay loop muted style={{ width: "20vw" }}></video>
    </div>
  );
};

export default memo(AnimatedLogo);
