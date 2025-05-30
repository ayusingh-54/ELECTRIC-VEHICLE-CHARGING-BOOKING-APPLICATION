import { Container } from "react-bootstrap";
import { FaSearchLocation } from "react-icons/fa";
import { FaChargingStation } from "react-icons/fa";
import PropTypes from "prop-types";
import "./styles/explanationBox.css";

const ExplanationBox = ({ boxNo }) => {
  const iconStyles = {
    fontSize: "40px",
    color: "#2ddf3c",
  };
  const box1 = {
    icon: <FaSearchLocation style={iconStyles} />,
    heading: "Search for the station name",
    description:
      "Type and search for the station name as you wish in the search input easily and quickly",
  };
  const box2 = {
    icon: <FaChargingStation style={iconStyles} />,
    heading: "Find the nearest location point",
    description:
      "Find the closest location point around you on map, make sure the station name is correct.",
  };
  const box3 = {
    icon: <FaSearchLocation style={iconStyles} />,
    heading: "Follow the path on the map",
    description:
      "You will get information that station is still empty or not before leaving for your destination",
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
