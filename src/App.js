import "./styles/Cards.css";
import "./styles/Parallax.css";
import "./styles/HeaderAndFooter.css";
import "./styles/WaterCard.css";
import "./styles/LearnMoreButton.css";
import "./styles/Cursor.css";
import "./styles/Menu.css";
import "./styles/ScrollLottie.css";
import Cursor from "./components/Cursor";
import ParallaxSection from "./components/ParallaxSection";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import { AnimationProvider } from "./animations/AnimationProvider";
import { Menu } from "./components/Menu";
import { ContextProvider } from "./components/ContextProvider";
import { ScrollLottie } from "./components/ScrollLottie";

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
        <ScrollLottie />
      </AnimationProvider>
    </ContextProvider>
  );
}

export default App;
