import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import "./book-slot.css";
import { Toast, ToastContainer } from "react-bootstrap";

const BookSlotComp = ({ activeStation, evStationObjectId }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const today = new Date().toISOString().slice(0, 10);
  const [isSlotAvailable, setIsSlotAvailable] = useState(null);
  const { stationName, pricePerHour, location } = activeStation;
  const [activeUser, setActiveUser] = useState({});
  const [bookingDate, setBookingDate] = useState("");
  const [vehicleType, setVehicleType] = useState("two-wheeler");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [toastColor, setToastColor] = useState("dark");
  const [alertMsg, setAlertMsg] = useState("Msg is empty");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-data")) || null;
    if (userData) {
      setActiveUser(userData);
    }
  }, []);

  const handleDateChange = (e) => {
    setBookingDate(e.target.value);
  };

  const handlePaynow = (e) => {
    e.preventDefault();

    console.log(vehicleNumber, vehicleType);
    if (
      !evStationObjectId ||
      !bookingDate ||
      !activeUser._id ||
      !vehicleNumber ||
      !vehicleType
    ) {
      alert("Please fill all the fields");
      return;
    }
    const data = {
      userObjectId: activeUser._id,
      evStationObjectId,
      bookingDate,
      vehicleNumber,
      vehicleType,
    };
    sendToServer(data);
  };
  const sendToServer = (data) => {
    axios
      .post(`${BASE_URL}/booking/new-booking`, data)
      .then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          setAlertMsg("Booking Successfully Completed.");
          setShowAlert(true);
          setToastColor("success");
        } else {
          console.log("my response", res);
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 400) {
          const responseAlertMsg = err.response.data.message;

          setAlertMsg(responseAlertMsg);
          setShowAlert(true);
          setToastColor("danger");
        }
      });
  };
  return (
    <>
      <ToastContainer position="top-center">
        <Toast
          className="toast-msg"
          bg={toastColor}
          onClose={() => setShowAlert(false)}
          show={showAlert}
          animation={true}
          delay={2000}
          autohide
        >
          <Toast.Body>{alertMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="book-slot-container">
        <div className="book-slot-left">
          <img
            src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=270&h=270&fit=crop&crop=center"
            alt="EV Charging Station"
          />
        </div>
        <div className="book-slot-right">
          <div className="payment-form-container">
            <h3 className="payment-form-heading">Book Your Slot Now</h3>
            <div className="station-details-1">
              <h6>Station Name: {stationName}</h6>
              <h6>Rate/Hr: {pricePerHour}</h6>
            </div>
            <div className="station-details-2">
              <h6>Location: {location}</h6>
            </div>
            <form className="payment-form">
              <div className="schedule-div">
                <div className="date-container">
                  <input
                    onChange={handleDateChange}
                    type="datetime-local"
                    name="booking-date-time"
                    placeholder="Date & Time"
                    min={`${today}T00:00`}
                  />
                  {isSlotAvailable === null ? (
                    <h6>Choose Your Date & Time </h6>
                  ) : isSlotAvailable ? (
                    <h6 className="avail-msg">Slot Available on This Time</h6>
                  ) : (
                    <h6 className="not-avail-msg">
                      {" "}
                      Slot is Not Available On This Time
                    </h6>
                  )}
                </div>
                <div className="date-container">
                  <select
                    onChange={(e) => {
                      setVehicleType(e.target.value);
                    }}
                    name="vehicle-type"
                    id="vehicle-type"
                  >
                    <option value="two-wheeler">Two Wheeler</option>
                    <option value="four-wheeler">Four Wheeler</option>
                  </select>
                  <h6>Select your vehicle type</h6>
                </div>
                <div className="date-container">
                  <input
                    onChange={(e) => {
                      setVehicleNumber(e.target.value);
                    }}
                    type="text"
                    placeholder="Vehicle No"
                  />
                  <h6>Type Your Vehicle Number</h6>
                </div>

                <input
                  className="pay-btn"
                  type="submit"
                  value={`₹ ${pricePerHour} Pay Now`}
                  onClick={handlePaynow}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
BookSlotComp.propTypes = {
  activeStation: PropTypes.object,
  evStationObjectId: PropTypes.string,
};

export default BookSlotComp;
