import "./styles/HomeSidePanel.css";
import "./styles/Parallax.css";
import "./styles/HeaderAndFooter.css";
import "./styles/WaterCard.css";
import "./styles/LearnMoreButton.css";
import "./styles/Cursor.css";
import "./styles/ScrollAnimatedIcons.css";
import "./styles/DivingParams.css";
import "./styles/Menu.css";
import "./styles/VisasToCubaPage.css";
import "./styles/Home.css";
import "./styles/CubaCard.css";
import "./styles/ImageCard.css";
import "./styles/Trips.css";
import "./styles/TripsCard.css";
import "./styles/Header.css";
import "./styles/Octopus.css";
import "./styles/School.css";

import { memo } from "react";
import { Home } from "./sections/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./sections/Layout";
import { VisasToCubaPage } from "./sections/VisasToCubaPage";
import { ContextProvider } from "./components/ContextProvider";
import Trips from "./sections/Trips";
import School from "./sections/School";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cuba" element={<VisasToCubaPage />} />
            <Route path="trips" element={<Trips />} />
            <Route path="school" element={<School />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default memo(App);
