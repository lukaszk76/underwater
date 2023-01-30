import React from "react";
import { Outlet } from "react-router-dom";
import { FullScreenMenu } from "../components/FullScreenMenu";

export const Layout = () => {
  return (
    <>
      <FullScreenMenu />
      <Outlet />
    </>
  );
};
