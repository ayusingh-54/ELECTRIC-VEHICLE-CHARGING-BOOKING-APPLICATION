import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import BookSlotComp from "../Components/BookSlot/bookSlotComp";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useParams } from "react-router-dom";

const BookSlot = () => {
  const [activeStation, setActiveStation] = useState({});

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { evStationObjectId } = useParams();
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data")) || null;
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }

    axios.get(`${BASE_URL}/ev/station-id/${evStationObjectId}`).then((res) => {
      setActiveStation(res.data.data);
    });
  }, []);

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
