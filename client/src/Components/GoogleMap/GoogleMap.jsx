import "./GoogleMap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GoogleMap = () => {
  const [location, setLocation] = useState("");
  const [mapLocation, setMapLocation] = useState("India");
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchStations();
    getCurrentLocation();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ev/all-stations`);
      const stationsData = response.data.data;
      setStations(stationsData);

      // If we have stations with coordinates, center the map on the first one
      if (stationsData.length > 0 && stationsData[0].coordinates) {
        const firstStation = stationsData[0];
        if (
          firstStation.coordinates.lat !== 0 &&
          firstStation.coordinates.lng !== 0
        ) {
          setMapCenter(firstStation.coordinates);
        }
      }
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          setMapCenter(newLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const onSearch = () => {
    if (location.trim()) {
      setMapLocation(location);
    }
  };

  const handleStationClick = (station) => {
    setSelectedStation(station);
    setShowModal(true);
  };

  const handleBookSlot = () => {
    if (selectedStation) {
      navigate(`/book-slot/${selectedStation._id}`);
      setShowModal(false);
    }
  };

  const generateMapSrc = () => {
    const center = `${mapCenter.lat},${mapCenter.lng}`;
    let mapSrc = `https://maps.google.com/maps?q=${center}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

    // Add markers for each station with coordinates
    if (stations.length > 0) {
      const markers = stations
        .filter(
          (station) => station.coordinates && station.coordinates.lat !== 0
        )
        .map(
          (station) => `${station.coordinates.lat},${station.coordinates.lng}`
        )
        .join("|");

      if (markers) {
        mapSrc = `https://maps.google.com/maps?q=${center}&t=&z=12&ie=UTF8&iwloc=&output=embed&markers=${markers}`;
      }
    }

    return mapSrc;
  };

  const getDistanceFromUser = (stationCoords) => {
    if (!userLocation || !stationCoords || stationCoords.lat === 0) return null;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((stationCoords.lat - userLocation.lat) * Math.PI) / 180;
    const dLon = ((stationCoords.lng - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((stationCoords.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance.toFixed(1);
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h2>🗺️ Evoltsoft Charging Stations Map</h2>
        <p>Find and book charging stations near you</p>
      </div>

      <div className="map-controls">
        <div className="search-container">
          <input
            type="text"
            value={location}
            placeholder="Search location (e.g., Mumbai, Delhi)"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
          <button onClick={onSearch}>🔍 Search</button>
        </div>

        <div className="stations-info">
          <div className="stations-header">
            <h5>🔌 Charging Stations ({stations.length})</h5>
            <Badge bg="success">
              {stations.filter((s) => s.availablePorts > 0).length} Available
            </Badge>
          </div>

          <div className="stations-list">
            {stations.slice(0, 8).map((station) => {
              const distance = getDistanceFromUser(station.coordinates);
              return (
                <div
                  key={station._id}
                  className="station-item"
                  onClick={() => handleStationClick(station)}
                >
                  <div className="station-main-info">
                    <strong>{station.stationName}</strong>
                    <Badge
                      bg={station.availablePorts > 0 ? "success" : "danger"}
                      className="ms-2"
                    >
                      {station.availablePorts > 0 ? "Available" : "Full"}
                    </Badge>
                  </div>
                  <p>📍 {station.location}</p>
                  <div className="station-details">
                    <small>💰 ₹{station.pricePerHour}/hr</small>
                    <small>
                      🔌 {station.availablePorts}/{station.totalPorts} ports
                    </small>
                    {distance && <small>📏 {distance} km away</small>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            width="100%"
            height="500"
            id="gmap_canvas"
            src={generateMapSrc()}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            title="Evoltsoft Charging Stations Map"
          ></iframe>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🔌 Station Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStation && (
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {selectedStation.stationName}
                  <Badge
                    bg={
                      selectedStation.availablePorts > 0 ? "success" : "danger"
                    }
                  >
                    {selectedStation.availablePorts > 0 ? "Available" : "Full"}
                  </Badge>
                </Card.Title>
                <Card.Text>
                  <div className="station-detail-item">
                    <strong>📍 Location:</strong> {selectedStation.location}
                  </div>
                  <div className="station-detail-item">
                    <strong>🔌 Ports:</strong> {selectedStation.availablePorts}/
                    {selectedStation.totalPorts} available
                  </div>
                  <div className="station-detail-item">
                    <strong>💰 Price:</strong> ₹{selectedStation.pricePerHour}{" "}
                    per hour
                  </div>
                  {selectedStation.coordinates &&
                    selectedStation.coordinates.lat !== 0 && (
                      <div className="station-detail-item">
                        <strong>🗺️ Coordinates:</strong>{" "}
                        {selectedStation.coordinates.lat.toFixed(4)},{" "}
                        {selectedStation.coordinates.lng.toFixed(4)}
                      </div>
                    )}
                  {getDistanceFromUser(selectedStation.coordinates) && (
                    <div className="station-detail-item">
                      <strong>📏 Distance:</strong>{" "}
                      {getDistanceFromUser(selectedStation.coordinates)} km from
                      your location
                    </div>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleBookSlot}
            disabled={!selectedStation || selectedStation.availablePorts === 0}
          >
            🎫 Book Slot
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GoogleMap;
