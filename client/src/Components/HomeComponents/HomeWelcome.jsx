import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import {
  InputGroup,
  Form,
  Button,
  Card,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  FaLocationDot,
  FaChargingStation,
  FaBolt,
  FaLeaf,
} from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import "./styles/homeComponent.css";

const HomeWelcome = () => {
  const { isUserLogin } = useContext(LoginContext);
  const [searchLocation, setSearchLocation] = useState("");
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate();

  const words = ["Fast", "Eco-friendly", "Reliable", "Smart"];

  const isTab = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // Typing animation effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (charIndex > 0) {
              setTypedText(currentWord.slice(0, charIndex - 1));
              charIndex--;
            } else {
              clearInterval(deleteInterval);
              setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
          }, 50);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentWordIndex]);

  const handleSearch = () => {
    if (isUserLogin) {
      if (searchLocation.trim()) {
        navigate(`/stations?search=${encodeURIComponent(searchLocation)}`);
      } else {
        navigate("/stations");
      }
    } else {
      setShowLoginAlert(true);
    }
  };

  const handleGetStarted = () => {
    if (isUserLogin) {
      navigate("/stations");
    } else {
      setShowLoginAlert(true);
    }
  };

  const handleMapView = () => {
    if (isUserLogin) {
      navigate("/map");
    } else {
      setShowLoginAlert(true);
    }
  };

  const handlePricing = () => {
    navigate("/pricing");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="home-welcome-container">
      <Container className="home-welcome-left-container">
        <div className="welcome-content">
          <div className="hero-badge">
            <FaBolt className="badge-icon" />
            <span>Revolutionary EV Charging by Evoltsoft</span>
          </div>

          <h1 className="hero-title">
            Power up Your Electric Vehicle with{" "}
            <span className="typed-word">{typedText}</span>
            <span className="cursor">|</span>
            <br />
            <span className="charging-word">Charging</span> Solutions
          </h1>

          <p className="hero-description">
            Discover the future of electric vehicle charging with our network of
            <strong> fast, reliable, and eco-friendly</strong> charging stations
            across the country.
          </p>

          <div className="stats-container">
            <div className="stat-item">
              <FaChargingStation className="stat-icon" />
              <div>
                <h3>250+</h3>
                <p>Charging Stations</p>
              </div>
            </div>
            <div className="stat-item">
              <FaBolt className="stat-icon" />
              <div>
                <h3>1500+</h3>
                <p>Sessions Completed</p>
              </div>
            </div>
            <div className="stat-item">
              <FaLeaf className="stat-icon" />
              <div>
                <h3>100%</h3>
                <p>Green Energy</p>
              </div>
            </div>
          </div>

          <div className="home-search-container">
            <div className="search-wrapper">
              <InputGroup className="search-input-group">
                <InputGroup.Text className="search-icon">
                  <FaLocationDot />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter your location or city..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="search-input"
                />
              </InputGroup>
              {/* <Button className="search-button" onClick={handleSearch}>
                Find Stations
              </Button> */}
            </div>
          </div>

          <div className="action-buttons">
            <Button className="primary-btn" onClick={handleGetStarted}>
              Get Started
            </Button>
            <Button className="secondary-btn" onClick={handleMapView}>
              View Map
            </Button>
          </div>
        </div>
      </Container>

      <Container className="home-welcome-img-div">
        <div className="image-wrapper">
          <div className="floating-elements">
            <div className="floating-icon floating-1">
              <FaChargingStation />
            </div>
            <div className="floating-icon floating-2">
              <FaBolt />
            </div>
            <div className="floating-icon floating-3">
              <FaLeaf />
            </div>
          </div>

          <Image
            src="https://static.wixstatic.com/media/ff73f8_81895a0a8ea44ef6ac6453c066115b29~mv2.jpg/v1/fill/w_1101,h_771,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ff73f8_81895a0a8ea44ef6ac6453c066115b29~mv2.jpg"
            alt="EV Charging Station"
            className="hero-image"
          />

          <Card className="floating-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <FaChargingStation className="text-success me-2" size={24} />
                <div>
                  <h6 className="mb-0">Fast Charging</h6>
                  <small className="text-muted">0-80% in 30 minutes</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>

      <ToastContainer position="top-center">
        <Toast
          bg="warning"
          onClose={() => setShowLoginAlert(false)}
          show={showLoginAlert}
          animation={true}
          delay={3000}
          autohide
        >
          <Toast.Body>
            Please login to access charging stations.
            <a
              href="/login"
              style={{
                color: "#fff",
                textDecoration: "underline",
                marginLeft: "5px",
              }}
            >
              Login Now
            </a>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default HomeWelcome;
