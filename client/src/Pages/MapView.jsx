import { useContext, useEffect } from "react";
import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import GoogleMap from "../Components/GoogleMap/GoogleMap";
import { LoginContext } from "../Context/LoginContext";

const MapView = () => {
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }
  }, [setUserInfo, setIsUserLogin]);

  return (
    <div>
      <NavbarComponent />
      <div style={{ marginTop: "65px" }}>
        <GoogleMap />
      </div>
      <Footer />
    </div>
  );
};

export default MapView;
