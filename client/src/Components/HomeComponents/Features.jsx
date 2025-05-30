import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaBolt,
  FaMapMarkerAlt,
  FaMobile,
  FaLeaf,
  FaStar,
  FaWallet,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import "./styles/features.css";

const Features = () => {
  const features = [
    {
      icon: <FaBolt />,
      title: "Ultra-Fast Charging",
      description:
        "Experience lightning-fast charging with our DC fast chargers. Get 80% charge in just 30 minutes.",
      color: "#ff6b6b",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Smart Location Finder",
      description:
        "AI-powered location finder that suggests the best charging stations based on your route and preferences.",
      color: "#4ecdc4",
    },
    {
      icon: <FaMobile />,
      title: "Mobile App Integration",
      description:
        "Control everything from your smartphone. Start charging, monitor progress, and make payments seamlessly.",
      color: "#45b7d1",
    },
    {
      icon: <FaLeaf />,
      title: "100% Green Energy",
      description:
        "All our charging stations are powered by renewable energy sources. Drive clean, charge cleaner.",
      color: "#96ceb4",
    },
    {
      icon: <FaStar />,
      title: "Premium Experience",
      description:
        "Enjoy premium amenities including WiFi, refreshments, and comfortable waiting areas at select locations.",
      color: "#feca57",
    },
    {
      icon: <FaWallet />,
      title: "Flexible Pricing",
      description:
        "Choose from multiple pricing plans including pay-per-use, monthly subscriptions, and corporate packages.",
      color: "#ff9ff3",
    },
    {
      icon: <FaClock />,
      title: "24/7 Availability",
      description:
        "Our charging network operates round the clock. Charge your vehicle anytime, anywhere.",
      color: "#54a0ff",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Reliable",
      description:
        "Advanced security features and 99.9% uptime guarantee. Your vehicle and data are always safe.",
      color: "#5f27cd",
    },
  ];

  return (
    <div className="features-section">
      <Container>
        <div className="features-header">
          <h2>Why Choose Evoltsoft?</h2>
          <p>
            Discover the advantages that make us the preferred choice for EV
            charging
          </p>
        </div>

        <Row className="features-grid">
          {features.map((feature, index) => (
            <Col lg={3} md={6} sm={12} key={index} className="feature-col">
              <Card
                className="feature-card"
                style={{ "--accent-color": feature.color }}
              >
                <Card.Body>
                  <div
                    className="feature-icon"
                    style={{ backgroundColor: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Features;
