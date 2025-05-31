import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import GoogleMap from "../Components/GoogleMap/GoogleMap";
import { LoginContext } from "../Context/LoginContext";
import { Toast, ToastContainer, Button } from "react-bootstrap";

const MapView = () => {
  const { isUserLogin, setIsUserLogin, userInfo, setUserInfo } =
    useContext(LoginContext);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
      //   getAllStations();
    } else {
      setShowLoginAlert(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [setUserInfo, setIsUserLogin, navigate]);

  if (!isUserLogin) {
    return (
      <>
        <NavbarComponent />
        <div style={{ padding: "150px 20px", textAlign: "center" }}>
          <h2>Please Login to Access Map</h2>
          <p>You need to be logged in to view charging stations on the map.</p>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Login Now
          </Button>
        </div>
        <ToastContainer position="top-center">
          <Toast
            bg="warning"
            onClose={() => setShowLoginAlert(false)}
            show={showLoginAlert}
            animation={true}
            delay={3000}
            autohide
          >
            <Toast.Body>Please login to access the map view.</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }

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
