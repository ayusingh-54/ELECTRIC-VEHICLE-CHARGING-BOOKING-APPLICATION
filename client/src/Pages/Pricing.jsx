import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaCheck, FaCrown, FaBolt, FaStar } from "react-icons/fa";
import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import { useContext, useEffect } from "react";
import { LoginContext } from "../Context/LoginContext";
import "./styles/pricing.css";

const Pricing = () => {
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }
  }, [setUserInfo, setIsUserLogin]);

  const plans = [
    {
      name: "Pay-Per-Use",
      icon: <FaBolt />,
      price: "₹12",
      period: "/kWh",
      description: "Perfect for occasional users",
      features: [
        "No monthly commitment",
        "Access to all stations",
        "Standard charging speeds",
        "Mobile app support",
        "24/7 customer support",
      ],
      color: "#4ecdc4",
      popular: false,
    },
    {
      name: "Monthly Pass",
      icon: <FaStar />,
      price: "₹999",
      period: "/month",
      description: "Best value for regular users",
      features: [
        "Unlimited charging sessions",
        "15% discount on charging",
        "Priority slot booking",
        "Fast charging access",
        "Premium customer support",
        "Mobile app premium features",
      ],
      color: "#667eea",
      popular: true,
    },
    {
      name: "Corporate Plan",
      icon: <FaCrown />,
      price: "Custom",
      period: "pricing",
      description: "Tailored for businesses & fleets",
      features: [
        "Fleet management dashboard",
        "Bulk charging discounts",
        "Dedicated account manager",
        "Custom billing solutions",
        "API integration",
        "24/7 priority support",
        "Analytics & reporting",
      ],
      color: "#ff6b6b",
      popular: false,
    },
  ];

  return (
    <>
      <NavbarComponent />
      <div className="pricing-page">
        <Container>
          <div className="pricing-header">
            <h1>Choose Your Charging Plan</h1>
            <p>Flexible pricing options to suit every need</p>
          </div>

          <Row className="pricing-cards">
            {plans.map((plan, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <Card
                  className={`pricing-card ${plan.popular ? "popular" : ""}`}
                  style={{ "--accent-color": plan.color }}
                >
                  {plan.popular && (
                    <Badge className="popular-badge">Most Popular</Badge>
                  )}
                  <Card.Body>
                    <div
                      className="plan-icon"
                      style={{ backgroundColor: plan.color }}
                    >
                      {plan.icon}
                    </div>
                    <h3>{plan.name}</h3>
                    <div className="price">
                      <span className="amount">{plan.price}</span>
                      <span className="period">{plan.period}</span>
                    </div>
                    <p className="description">{plan.description}</p>

                    <ul className="features-list">
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>
                          <FaCheck className="check-icon" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="select-plan-btn"
                      style={{ backgroundColor: plan.color }}
                    >
                      {plan.name === "Corporate Plan"
                        ? "Contact Sales"
                        : "Select Plan"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="pricing-faq">
            <h2>Frequently Asked Questions</h2>
            <Row>
              <Col lg={6}>
                <div className="faq-item">
                  <h5>How does pay-per-use work?</h5>
                  <p>
                    You're charged based on the actual energy consumed (kWh).
                    Simply plug in, charge, and pay for what you use.
                  </p>
                </div>
                <div className="faq-item">
                  <h5>Can I cancel my monthly pass?</h5>
                  <p>
                    Yes, you can cancel anytime. Your plan remains active until
                    the end of the current billing cycle.
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="faq-item">
                  <h5>What's included in corporate plans?</h5>
                  <p>
                    Corporate plans include fleet management tools, bulk
                    discounts, dedicated support, and custom billing solutions.
                  </p>
                </div>
                <div className="faq-item">
                  <h5>Do you offer discounts for long-term commitments?</h5>
                  <p>
                    Yes, we offer attractive discounts for annual subscriptions
                    and corporate clients. Contact us for details.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
