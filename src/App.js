import "./styles/Cards.css";
import "./styles/Parallax.css";
import "./styles/HeaderAndFooter.css";
import "./styles/WaterCard.css";
import "./styles/LearnMoreButton.css";
import "./styles/Cursor.css";
import "./styles/ScrollAnimatedIcons.css";
import "./styles/DivingParams.css";
import "./styles/FullScreenMenu.css";
import "./styles/VisasToCubaPage.css";
import "./styles/Home.css";
import "./styles/StickerCard.css";

import { memo } from "react";
import { Home } from "./sections/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./sections/Layout";
import { VisasToCubaPage } from "./sections/VisasToCubaPage";
import { ContextProvider } from "./components/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cuba" element={<VisasToCubaPage />} />
            {/*<Route path="dashboard" element={<Dashboard />} />*/}

            {/*/!* Using path="*"" means "match anything", so this route*/}
            {/*    acts like a catch-all for URLs that we don't have explicit*/}
            {/*    routes for. *!/*/}
            {/*<Route path="*" element={<NoMatch />} />*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default memo(App);
