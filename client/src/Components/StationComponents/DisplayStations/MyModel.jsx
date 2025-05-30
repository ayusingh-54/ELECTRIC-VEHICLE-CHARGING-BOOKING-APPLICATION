import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Alert } from "react-bootstrap";
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
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  const handleClose = () => setShowModel(false);

  const handleReset = () => {
    setStationName("");
    setLocation("");
    setTotalPorts("");
    setAvailablePorts("");
    setPricePerHour("");
    setCoordinates({ lat: 0, lng: 0 });
    setSearchLocation("");
    setShowLocationPicker(false);
    handleClose();
  };

  const handleLocationSearch = () => {
    if (searchLocation.trim()) {
      setLocation(searchLocation);
      // Use geocoding to get coordinates
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchLocation
      )}&key=YOUR_GOOGLE_MAPS_API_KEY`;

      // For demo purposes, we'll use approximate coordinates
      // In production, you should use actual geocoding service
      const demoCoordinates = getApproximateCoordinates(searchLocation);
      setCoordinates(demoCoordinates);
      setShowLocationPicker(true);
    }
  };

  const getApproximateCoordinates = (locationName) => {
    // Demo coordinates for common cities
    const cityCoordinates = {
      mumbai: { lat: 19.076, lng: 72.8777 },
      delhi: { lat: 28.6139, lng: 77.209 },
      bangalore: { lat: 12.9716, lng: 77.5946 },
      hyderabad: { lat: 17.385, lng: 78.4867 },
      chennai: { lat: 13.0827, lng: 80.2707 },
      pune: { lat: 18.5204, lng: 73.8567 },
      kolkata: { lat: 22.5726, lng: 88.3639 },
      ahmedabad: { lat: 23.0225, lng: 72.5714 },
    };

    const cityKey = locationName.toLowerCase();
    return cityCoordinates[cityKey] || { lat: 20.5937, lng: 78.9629 }; // Default to India center
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(newCoords);
          setLocation("Current Location");
          setShowLocationPicker(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your current location. Please search for a location manually."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = () => {
    if (
      !stationName ||
      !location ||
      !availablePorts ||
      !totalPorts ||
      !pricePerHour
    ) {
      alert("Please fill all the required fields");
      return;
    }

    if (parseInt(availablePorts) > parseInt(totalPorts)) {
      alert("Available ports cannot be more than total ports");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user-data")) || null;
    if (userData?._id) {
      const stationData = {
        stationName,
        location,
        totalPorts: parseInt(totalPorts),
        availablePorts: parseInt(availablePorts),
        pricePerHour: parseFloat(pricePerHour),
        ownerId: userData._id,
        coordinates,
      };

      console.log("Station data with coordinates:", stationData);
      sendToServer(stationData);
    } else {
      alert("Please login first");
    }
  };

  const sendToServer = (stationData) => {
    try {
      axios
        .post(`${BASE_URL}/ev/create`, stationData)
        .then((res) => {
          console.log("Station created:", res);
          if (res.status === 201) {
            getAllStations();
            setShowAlert(true);
            setToastColor("success");
            setAlertMsg(
              "Station created successfully and will appear on the map!"
            );
          }
        })
        .catch((error) => {
          console.log("Error creating station:", error);
          setShowAlert(true);
          setToastColor("danger");
          setAlertMsg("Error creating station. Please try again.");
        })
        .finally(() => {
          handleReset();
        });
    } catch (error) {
      console.log("Error creating station:", error);
    }
  };

  return (
    <>
      <Modal show={showModel} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="model-heading">
            Add New Charging Station
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Station Name *</Form.Label>
                  <Form.Control
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                    type="text"
                    placeholder="Enter station name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Total Ports *</Form.Label>
                  <Form.Control
                    value={totalPorts}
                    onChange={(e) => setTotalPorts(e.target.value)}
                    type="number"
                    placeholder="Total charging ports"
                    min="1"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Available Ports *</Form.Label>
                  <Form.Control
                    type="number"
                    value={availablePorts}
                    onChange={(e) => setAvailablePorts(e.target.value)}
                    placeholder="Available ports"
                    min="0"
                    max={totalPorts || 100}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Rate per Hour (₹) *</Form.Label>
                  <Form.Control
                    value={pricePerHour}
                    onChange={(e) => setPricePerHour(e.target.value)}
                    type="number"
                    placeholder="Charging rate per hour"
                    min="0"
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location *</Form.Label>
                  <div className="d-flex gap-2 mb-2">
                    <Form.Control
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      type="text"
                      placeholder="Search for location"
                    />
                    <Button
                      variant="outline-primary"
                      onClick={handleLocationSearch}
                      size="sm"
                    >
                      Search
                    </Button>
                  </div>

                  <Button
                    variant="outline-success"
                    onClick={getCurrentLocation}
                    size="sm"
                    className="mb-2 w-100"
                  >
                    📍 Use Current Location
                  </Button>

                  <Form.Control
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    placeholder="Station address/location"
                    required
                  />

                  {coordinates.lat !== 0 && coordinates.lng !== 0 && (
                    <Alert variant="info" className="mt-2">
                      📍 Coordinates: {coordinates.lat.toFixed(4)},{" "}
                      {coordinates.lng.toFixed(4)}
                    </Alert>
                  )}
                </Form.Group>

                {showLocationPicker && (
                  <div className="location-preview">
                    <Form.Label>Location Preview</Form.Label>
                    <div
                      className="map-preview"
                      style={{
                        height: "200px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                      }}
                    >
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
                        title="Station Location Preview"
                      ></iframe>
                    </div>
                  </div>
                )}
              </Col>
            </Row>

            <Alert variant="warning" className="mt-3">
              <small>
                <strong>Note:</strong> Make sure to provide accurate location
                information. The station will appear on the map view for users
                to find and book slots.
              </small>
            </Alert>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={
              !stationName ||
              !location ||
              !totalPorts ||
              !availablePorts ||
              !pricePerHour
            }
          >
            Create Station
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
