import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import Displaystations from "../Components/StationComponents/DisplayStations/DisplayStations";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useEffect } from "react";

const Station = () => {
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }
  }, []);
  return (
    <div>
      <NavbarComponent />
      <Displaystations />
      <Footer />
    </div>
  );
};
export default Station;
