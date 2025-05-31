import { useState } from "react";
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

  if (!showModel) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Charging Station</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Station Name *</label>
                    <input
                      className="form-control"
                      value={stationName}
                      onChange={(e) => setStationName(e.target.value)}
                      type="text"
                      placeholder="Enter station name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Total Ports *</label>
                    <input
                      className="form-control"
                      value={totalPorts}
                      onChange={(e) => setTotalPorts(e.target.value)}
                      type="number"
                      placeholder="Total charging ports"
                      min="1"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Available Ports *</label>
                    <input
                      className="form-control"
                      type="number"
                      value={availablePorts}
                      onChange={(e) => setAvailablePorts(e.target.value)}
                      placeholder="Available ports"
                      min="0"
                      max={totalPorts || 100}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rate per Hour (₹) *</label>
                    <input
                      className="form-control"
                      value={pricePerHour}
                      onChange={(e) => setPricePerHour(e.target.value)}
                      type="number"
                      placeholder="Charging rate per hour"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Location *</label>
                    <input
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      placeholder="Station address/location"
                      required
                    />
                  </div>

                  {/* add search & current-location controls */}
                  <div className="mb-3 d-flex gap-2">
                    <input
                      className="form-control"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      type="text"
                      placeholder="Search for location"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleLocationSearch}
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={getCurrentLocation}
                    >
                      Use Current
                    </button>
                  </div>

                  {/* conditional embedded map */}
                  {showLocationPicker && (
                    <div className="mb-3" style={{ height: "300px" }}>
                      <iframe
                        title="pick-location"
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: 8 }}
                        src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="alert alert-warning mt-3">
                <small>
                  <strong>Note:</strong> Make sure to provide accurate location
                  information. The station will appear on the map view for users
                  to find and book slots.
                </small>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
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
            </button>
          </div>
        </div>
      </div>
    </div>
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
