import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import axios from "axios";

const MyModel = ({
  showModel,
  setShowModel,
  getAllStations,
  setAlertMsg,
  setShowAlert,
  setToastColor,
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [stationName, setStationName] = useState("");
  const [location, setLocation] = useState("");
  const [totalPorts, setTotalPorts] = useState("");
  const [availablePorts, setAvailablePorts] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const handleClose = () => setShowModel(false);
  const handleReset = () => {
    setStationName("");
    setLocation("");
    setTotalPorts("");
    setAvailablePorts("");
    setPricePerHour("");
    handleClose();
  };

  const handleSubmit = () => {
    if (
      !stationName ||
      !location ||
      !availablePorts ||
      !totalPorts ||
      !pricePerHour
    ) {
      return;
    }
    const userData = JSON.parse(localStorage.getItem("user-data")) || null;
    if (userData?._id) {
      const stationData = {
        stationName,
        location,
        totalPorts,
        availablePorts,
        pricePerHour,
        ownerId: userData._id,
      };

      console.log("stationData", stationData);
      sendToServer(stationData);
    } else {
      console.log("Please Login first");
    }
  };
  const sendToServer = (stationData) => {
    try {
      axios
        .post(`${BASE_URL}/ev/create`, stationData)
        .then((res) => {
          console.log("res", res);
          if (res.status === 201) {
            getAllStations();
            setShowAlert(true);
            setToastColor("success");
            setAlertMsg(res.data.message);
          }
        })
        .catch((error) => {
          console.log("Error on add new station", error);
        })
        .finally(() => {
          handleClose();
          handleReset();
        });
    } catch (error) {
      console.log("Error on add new station", error);
    }
  };
  return (
    <>
      <Modal show={showModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="model-heading">Add New Station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                type="text"
                placeholder="Station Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                value={totalPorts}
                onChange={(e) => setTotalPorts(e.target.value)}
                type="number"
                placeholder="Total Ports"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                value={availablePorts}
                onChange={(e) => setAvailablePorts(e.target.value)}
                placeholder="Available Ports"
                rows={3}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                type="number"
                placeholder="Rate/hr"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
MyModel.propTypes = {
  showModel: PropTypes.bool,
  setShowModel: PropTypes.func,
  setAlertMsg: PropTypes.func,
  setShowAlert: PropTypes.func,
  setToastColor: PropTypes.func,
  getAllStations: PropTypes.func,
};
export default MyModel;
