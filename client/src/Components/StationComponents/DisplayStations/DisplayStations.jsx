import { InputGroup, Form } from "react-bootstrap";
import { FaSearchLocation } from "react-icons/fa";
import { Toast, ToastContainer } from "react-bootstrap";
import StationTable from "../../StationTable/StationTable";
import { useState, useEffect } from "react";
import axios from "axios";
import MyModel from "./MyModel.jsx";
import "./displayStations.css";
const Displaystations = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [allStations, setAllStations] = useState([]);
  const [searchStation, setSearchStation] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [toastColor, setToastColor] = useState("dark");
  const [showModel, setShowModel] = useState(false);
  const [role, setRole] = useState("user");
  const getAllStations = () => {
    const userData = JSON.parse(localStorage.getItem("user-data")) || null;

    setSearchStation("");
    axios.get(`${BASE_URL}/ev/all-stations`).then((res) => {
      let visibleStations = res.data.data;
      if (userData.role === "ev-station") {
        visibleStations = res.data.data.filter((elem) => {
          return elem.ownerId === userData._id;
        });
      }
      const reversedData = visibleStations.reverse();
      setAllStations(reversedData);
    }).catch((err) => {
      console.log("error on get all stations", err);
    })
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-data")) || null;
    console.log("udd", userData);
    if (userData) {
      setRole(userData.role);
      getAllStations();
    } else {
      console.log("Login first");
    }
  }, []);

  const bookSlot = (id) => {
    if (role !== "user") {
      setShowAlert(true);
      setToastColor("warning");
      setAlertMsg("You are not allowed to book slots");
      return;
    }
    try {
      axios
        .patch(`${BASE_URL}/ev/book-slot/${id}`)
        .then((res) => {
          if (res.status === 200) {
            getAllStations();
            setShowAlert(true);
            setToastColor("success");
            setAlertMsg(res.data.message);
          } else {
            console.log("Check book slot functin");
          }
        })
        .catch((err) => {
          setShowAlert(true);
          setToastColor("danger");
          setAlertMsg(err.response.data.message);
        });
    } catch (error) {
      console.log("Error on Book-slot", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getStationsByLocation();
    }
  };

  const getStationsByLocation = () => {
    if (searchStation === "") {
      getAllStations();
      return;
    }
    try {
      axios.get(`${BASE_URL}/ev/location/${searchStation}`).then((res) => {
        console.log(res.data.data.length, "res");
        if (res.data.data.length === 0) {
          setAllStations([]);
        } else {
          console.log("data: ", res.data);
          setAllStations(res.data.data);
        }
      });
    } catch (error) {
      console.log("Error on get stations by location", error);
    }
  };

  const deleteStation = (_id) => {
    axios
      .delete(`${BASE_URL}/ev/delete/${_id}`)
      .then((res) => {
        const stationName = res.data.data.stationName;
        getAllStations();
        setShowAlert(true);
        setToastColor("danger");
        setAlertMsg(stationName + " Station Deleted Successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddStation = () => {
    setShowModel(true);
  };

  const sortByPrice = (e) => {
    if (e.target.value === "high") {
      const sortedData = [...allStations].sort((a, b) => {
        return b.pricePerHour - a.pricePerHour;
      });
      setAllStations(sortedData);
    } else if (e.target.value === "low") {
      const sortedData = [...allStations].sort((a, b) => {
        return a.pricePerHour - b.pricePerHour;
      });
      setAllStations(sortedData);
    }
  };

  return (
    <>
      <div className="display-stations">
        <div className="station-table-container">
          <div className="table-heading-container">
            <h1>List of Charging Stations</h1>
            {role !== "user" && (
              <button onClick={handleAddStation}>Add New Station</button>
            )}
          </div>
          <div className="table-top-buttons">
            <div onClick={getAllStations}>All Stations</div>
          </div>

          <div className="table-search-container">
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                onClick={getStationsByLocation}
                className="searchIcon"
              >
                <FaSearchLocation />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search Stations"
                aria-label="Search Stations"
                aria-describedby="basic-addon1"
                value={searchStation}
                onChange={(e) => setSearchStation(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </InputGroup>
            <div className="mb-3">
              <Form.Select onChange={sortByPrice}>
                <option value="">Sort by Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </Form.Select>
            </div>
          </div>
          {allStations.length === 0 ? (
            <>
              <div className="no-stations">
                {" "}
                Sorry EV Stations are Not Found.
              </div>
            </>
          ) : (
            <StationTable
              allStations={allStations}
              deleteStation={deleteStation}
              bookSlot={bookSlot}
              role={role}
            />
          )}
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
        </div>
      </div>

      <MyModel
        showModel={showModel}
        setShowModel={setShowModel}
        getAllStations={getAllStations}
        setShowAlert={setShowAlert}
        setAlertMsg={setAlertMsg}
        setToastColor={setToastColor}
      />
    </>
  );
};
export default Displaystations;
