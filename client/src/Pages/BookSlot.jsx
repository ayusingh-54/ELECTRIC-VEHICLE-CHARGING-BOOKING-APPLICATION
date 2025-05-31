import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import BookSlotComp from "../Components/BookSlot/bookSlotComp";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useParams, useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";

const BookSlot = () => {
  const { isUserLogin, setIsUserLogin, userInfo, setUserInfo } = useContext(LoginContext);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [activeStation, setActiveStation] = useState({});

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { evStationObjectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
      getStationById();
    } else {
      setShowLoginAlert(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, []);

  const getStationById = () => {
    axios.get(`${BASE_URL}/ev/station-id/${evStationObjectId}`).then((res) => {
      setActiveStation(res.data.data);
    });
  };

  if (!isUserLogin) {
    return (
      <>
        <NavbarComponent />
        <div style={{ padding: "150px 20px", textAlign: "center" }}>
          <h2>Please Login to Book Charging Slots</h2>
          <p>You need to be logged in to book charging stations.</p>
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
            <Toast.Body>Please login to book charging slots.</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      <BookSlotComp
        activeStation={activeStation}
        evStationObjectId={evStationObjectId}
      />
      <Footer />
    </>
  );
};
export default BookSlot;
