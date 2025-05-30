import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import EmptyBooking from "./empty-booking.jsx";
import axios from "axios";
import "./list-bookings.css";

const ListBookings = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [allBookings, setAllBookings] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    conditionalLoading();
  }, []);

  const conditionalLoading = () => {
    let userData = JSON.parse(localStorage.getItem("user-data")) || null;
    if (userData?.token) {
      setUserInfo(userData);
      if (userData.role === "user") {
        getBookedStationsOfAUser(userData._id);
      } else if (userData.role === "ev-station") {
        getAllBookingsOfAStation(userData._id);
      } else if (userData.role === "admin") {
        getAllBookings();
      } else {
        console.log("Error on conditionalLoading.");
      }
    } else {
      console.log("Login first");
      navigate("/login");
    }
  };

  const getAllBookings = () => {
    axios
      .get(`${BASE_URL}/booking/get-all-bookings`)
      .then((res) => {
        setAllBookings(res.data.data);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const getAllBookingsOfAStation = (stationOwnerId) => {
    axios
      .get(`${BASE_URL}/booking/station/get-all-bookings/${stationOwnerId}`)
      // .get(`http://localhost:3000/booking/station/get-all-bookings/653612d2415198c19bf6d3fb`)
      .then((res) => {
        if (res.status === 200) {
          const allBookings = res.data.data;
          const myStations = allBookings.filter((elem) => {
            return elem?.evStation?.ownerId === stationOwnerId;
          });

          setAllBookings(myStations.reverse());
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getBookedStationsOfAUser = (userId) => {
    axios
      .get(`${BASE_URL}/booking/user/get-all-bookings/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setAllBookings(res.data.data.reverse());
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const splitDateAndTime = (dateTime) => {
    const datePart = dateTime.substring(0, 10);
    return { datePart };
  };

  const deleteSlotById = (id) => {
    if (!id) {
      console.log("id is required");
      return;
    }
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    axios
      .delete(`${BASE_URL}/booking/delete-slot-by-id/${id}`)

      .then((res) => {
        if (res.status === 200) {
          console.log("Successfully Deleted.");
          conditionalLoading();
        }
      })
      .catch((err) => {
        console.log("err on delete", err);
      });
  };

  return (
    <div className="list-bookings-container">
      <h3>List of Bookings</h3>
      <hr />
      {allBookings.length > 0 ? (
        <div className="list-table-div">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                {userInfo?.role !== "user" && <th> User Name </th>}
                <th>EV Station Name</th>
                <th>Station Location</th>
                <th> &#x20B9; Paid </th>
                <th>Date </th>
                <th> Time</th>
                <th>Vehicle Number</th>
                <th>Vehicle Type</th>
                <th>Cancel Booking</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((elem, index) => {
                const { datePart } = splitDateAndTime(elem.bookingDate);
                const timePart = new Date(elem?.bookingDate).toLocaleString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                );
                console.log("elem", elem);
                return (
                  <tr key={index}>
                    <td> {index + 1}</td>
                    {userInfo.role !== "user" && <td> {elem.user.name} </td>}
                    <td> {elem?.evStation?.stationName}</td>
                    <td> {elem?.evStation?.location}</td>
                    <td> &#x20B9; {elem?.evStation?.pricePerHour}</td>
                    <td> {datePart}</td>
                    <td> {timePart}</td>
                    <td> {elem?.vehicleNumber}</td>
                    <td> {elem?.vehicleType}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => deleteSlotById(elem._id)}
                        className="booking-cancel-btn"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <EmptyBooking />
      )}
    </div>
  );
};
export default ListBookings;
