import "./styles/Cards.css";
import "./styles/Parallax.css";
import "./styles/HeaderAndFooter.css";
import "./styles/WaterCard.css";
import "./styles/LearnMoreButton.css";
import "./styles/Cursor.css";
import "./styles/Menu.css";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import ParallaxSection from "./components/ParallaxSection";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import { AnimationProvider } from "./animations/AnimationProvider";
import { Menu } from "./components/Menu";
import { ContextProvider } from "./components/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <AnimationProvider>
        <ParallaxSection />
        <Cards />
        <Cursor />
        {/*<Header />*/}
        <Footer />
        <Menu />
      </AnimationProvider>
    </ContextProvider>
  );
}

export default App;
