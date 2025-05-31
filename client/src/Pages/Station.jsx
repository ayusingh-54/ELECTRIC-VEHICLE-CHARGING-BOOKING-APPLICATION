import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import Displaystations from "../Components/StationComponents/DisplayStations/DisplayStations";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Context/LoginContext";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Station = () => {
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
  }, []);

  if (!isUserLogin) {
    return (
      <>
        <NavbarComponent />
        <div style={{ padding: "150px 20px", textAlign: "center" }}>
          <h2>Please Login to Access Stations</h2>
          <p>You need to be logged in to view and book charging stations.</p>
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
            <Toast.Body>Please login to access charging stations.</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }

  return (
    <div>
      <NavbarComponent />
      <Displaystations />
      <Footer />
    </div>
  );
};
export default Station;
