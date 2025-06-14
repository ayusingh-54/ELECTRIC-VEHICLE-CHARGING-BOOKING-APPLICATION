import HomeWelcome from "../Components/HomeComponents/HomeWelcome";
import YellowBanner from "../Components/HomeComponents/YellowBanner";
import Explanation from "../Components/HomeComponents/explanation";
import Features from "../Components/HomeComponents/Features";
import Testimonials from "../Components/HomeComponents/Testimonials";
import Newsletter from "../Components/HomeComponents/Newsletter";
import EvNetwork from "../Components/HomeComponents/evNetword";
import Footer from "../Components/HomeComponents/footer";
import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";
import { useEffect } from "react";
import NavbarComponent from "../Components/Navbar/navbar";
import "./styles/home.css";

const Home = () => {
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data")) || {};
    if (userData.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }
  }, []);

  return (
    <div className="home-page-container">
      <NavbarComponent />
      <HomeWelcome />
      <YellowBanner />
      <Explanation />
      <Features />
      <Testimonials />
      <EvNetwork />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
