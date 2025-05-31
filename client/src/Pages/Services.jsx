import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaBolt,
  FaCalendarAlt,
  FaMobile,
  FaBuilding,
  FaTruck,
  FaHeadset,
  FaClock,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";
import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import { useContext, useEffect } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import "./styles/services.css";

const Services = () => {
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }
  }, [setUserInfo, setIsUserLogin]);

  const services = [
    {
      icon: <FaBolt />,
      title: "Fast Charging",
      description:
        "Ultra-fast DC charging stations that can charge your EV up to 80% in just 30 minutes.",
      features: [
        "50kW to 350kW charging",
        "CCS & CHAdeMO compatible",
        "Real-time monitoring",
      ],
      color: "#ff6b6b",
      action: () => navigate("/stations"),
    },
    {
      icon: <FaCalendarAlt />,
      title: "Slot Booking",
      description:
        "Reserve your charging slot in advance to avoid waiting times and guarantee availability.",
      features: [
        "24/7 online booking",
        "Flexible cancellation",
        "Priority access",
      ],
      color: "#4ecdc4",
      action: () => navigate("/stations"),
    },
    {
      icon: <FaMobile />,
      title: "Mobile App",
      description:
        "Complete charging management from your smartphone with our feature-rich mobile application.",
      features: ["Station finder", "Payment integration", "Charging history"],
      color: "#45b7d1",
      action: () => window.open("https://play.google.com", "_blank"),
    },
    {
      icon: <FaBuilding />,
      title: "Corporate Plans",
      description:
        "Tailored charging solutions for businesses with multiple vehicles and specific requirements.",
      features: ["Bulk billing", "Employee benefits", "Custom rates"],
      color: "#feca57",
      action: () => navigate("/contact"),
    },
    {
      icon: <FaTruck />,
      title: "Fleet Management",
      description:
        "Comprehensive fleet charging solutions with advanced analytics and management tools.",
      features: ["Fleet dashboard", "Usage analytics", "Cost optimization"],
      color: "#ff9ff3",
      action: () => navigate("/contact"),
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you with any charging-related queries or issues.",
      features: ["Phone support", "Live chat", "Emergency assistance"],
      color: "#5f27cd",
      action: () => navigate("/contact"),
    },
  ];

  const additionalFeatures = [
    {
      icon: <FaClock />,
      title: "24/7 Availability",
      description:
        "Our charging network operates round the clock for your convenience.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description:
        "Bank-grade security for all your transactions and personal data.",
    },
    {
      icon: <FaLeaf />,
      title: "100% Green Energy",
      description: "All our stations are powered by renewable energy sources.",
    },
  ];

  return (
    <>
      <NavbarComponent />
      <div className="services-page">
        <div className="services-hero">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <h1>Our Services</h1>
                <p>
                  Comprehensive EV charging solutions designed to make electric
                  mobility simple, fast, and reliable for everyone.
                </p>
              </Col>
              <Col lg={6}>
                <img
                  src="https://images.pexels.com/photos/163945/tesla-electric-car-model-s-163945.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="EV Services"
                  className="hero-image"
                />
              </Col>
            </Row>
          </Container>
        </div>

        <Container>
          <div className="services-grid">
            <Row>
              {services.map((service, index) => (
                <Col lg={4} md={6} key={index} className="mb-4">
                  <Card
                    className="service-card"
                    style={{ "--accent-color": service.color }}
                  >
                    <Card.Body>
                      <div
                        className="service-icon"
                        style={{ backgroundColor: service.color }}
                      >
                        {service.icon}
                      </div>
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>

                      <ul className="service-features">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>

                      <Button
                        className="service-btn"
                        style={{ backgroundColor: service.color }}
                        onClick={service.action}
                      >
                        Learn More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="additional-features">
            <h2>Why Choose Evoltsoft</h2>
            <Row>
              {additionalFeatures.map((feature, index) => (
                <Col lg={4} md={6} key={index} className="mb-4">
                  <div className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <h5>{feature.title}</h5>
                    <p>{feature.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div className="cta-section">
            <Card className="cta-card">
              <Card.Body className="text-center">
                <h3>Ready to Get Started?</h3>
                <p>
                  Join thousands of satisfied customers who trust Evoltsoft for
                  their charging needs.
                </p>
                <div className="cta-buttons">
                  <Button
                    className="cta-btn primary"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up Now
                  </Button>
                  <Button
                    className="cta-btn secondary"
                    onClick={() => navigate("/contact")}
                  >
                    Contact Sales
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Services;
