import { Container } from "react-bootstrap";
import { FaSearchLocation, FaMapMarkedAlt, FaRoute } from "react-icons/fa";
import { FaChargingStation } from "react-icons/fa";
import PropTypes from "prop-types";
import "./styles/explanationBox.css";

const ExplanationBox = ({ boxNo }) => {
  const iconStyles = {
    fontSize: "44px",
    color: "white",
  };

  const box1 = {
    icon: <FaSearchLocation style={iconStyles} />,
    heading: "Search & Discover Stations",
    description:
      "Easily find charging stations near you by searching location names, addresses, or browsing our interactive map with real-time availability.",
  };

  const box2 = {
    icon: <FaMapMarkedAlt style={iconStyles} />,
    heading: "View Real-Time Information",
    description:
      "Get detailed information about each station including available ports, charging speeds, pricing, and user reviews before you travel.",
  };

  const box3 = {
    icon: <FaChargingStation style={iconStyles} />,
    heading: "Book & Charge Instantly",
    description:
      "Reserve your charging slot in advance, navigate to the station with GPS directions, and start charging with just a few taps on your phone.",
  };

  let activeBox = box1;
  if (boxNo === "box-2") {
    activeBox = box2;
  } else if (boxNo === "box-3") {
    activeBox = box3;
  }

  return (
    <Container className="explanation-box">
      <div>{activeBox.icon}</div>
      <h6>{activeBox.heading}</h6>
      <p>{activeBox.description}</p>
    </Container>
  );
};

export default ExplanationBox;

ExplanationBox.propTypes = {
  boxNo: PropTypes.string.isRequired,
};
