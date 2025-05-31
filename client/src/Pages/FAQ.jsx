import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import {
  FaSearch,
  FaQuestionCircle,
  FaBolt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";
import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import { LoginContext } from "../Context/LoginContext";
import "./styles/faq.css";

const FAQ = () => {
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }
  }, [setUserInfo, setIsUserLogin]);

  const faqData = [
    {
      id: 1,
      category: "general",
      question: "What is Evoltsoft?",
      answer:
        "Evoltsoft is a comprehensive EV charging platform that helps you find, book, and pay for electric vehicle charging stations across the country. We provide a network of fast, reliable, and eco-friendly charging solutions.",
    },
    {
      id: 2,
      category: "general",
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button in the top navigation. Fill in your details including name, email, phone number, and choose your role (user or EV station owner). You'll receive a confirmation email to activate your account.",
    },
    {
      id: 3,
      category: "charging",
      question: "How do I find charging stations near me?",
      answer:
        "Use our 'Find Stations' feature in the navigation menu or on the homepage. You can search by location, view stations on our interactive map, or use your current location to find the nearest charging points.",
    },
    {
      id: 4,
      category: "charging",
      question: "What types of charging connectors do you support?",
      answer:
        "Our network supports all major charging standards including CCS, CHAdeMO, Type 2, and standard AC charging. Each station listing shows the available connector types and charging speeds.",
    },
    {
      id: 5,
      category: "charging",
      question: "How fast can I charge my EV?",
      answer:
        "Charging speeds vary by station type. Our DC fast chargers can charge most EVs from 0-80% in 30-45 minutes, while AC chargers typically take 4-8 hours for a full charge. Check individual station specifications for exact charging speeds.",
    },
    {
      id: 6,
      category: "booking",
      question: "How do I book a charging slot?",
      answer:
        "Select a charging station from our map or list view, choose your preferred time slot, select your vehicle type, and confirm your booking. You'll receive a confirmation with booking details and the station location.",
    },
    {
      id: 7,
      category: "booking",
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking up to 30 minutes before your scheduled time without any charges. Go to your Profile > Booking List to manage your reservations.",
    },
    {
      id: 8,
      category: "booking",
      question: "What if I'm late for my booking?",
      answer:
        "We provide a 15-minute grace period. If you arrive later than 15 minutes after your booking time, your slot may be released to other users. Contact support if you're running late.",
    },
    {
      id: 9,
      category: "payment",
      question: "How much does it cost to charge?",
      answer:
        "Pricing varies by location and charging speed. Typically, DC fast charging costs ₹12-15 per kWh, while AC charging costs ₹8-12 per kWh. Check our pricing page for detailed information on subscription plans.",
    },
    {
      id: 10,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, net banking, and digital wallets. Payments are processed securely through our encrypted payment gateway.",
    },
    {
      id: 11,
      category: "payment",
      question: "Do you offer subscription plans?",
      answer:
        "Yes! We offer monthly passes for ₹999/month with unlimited sessions and 15% discount, and corporate plans with custom pricing. Check our pricing page for all available plans.",
    },
    {
      id: 12,
      category: "technical",
      question: "What if a charging station is not working?",
      answer:
        "Report the issue immediately through our app or website. Our technical team will be notified and work to resolve the issue quickly. You'll be redirected to the nearest available station.",
    },
    {
      id: 13,
      category: "technical",
      question: "Is my vehicle compatible with your charging network?",
      answer:
        "Our network supports all major EV brands including Tesla, Tata, MG, Hyundai, and more. Check the connector type on your vehicle and match it with station specifications.",
    },
    {
      id: 14,
      category: "technical",
      question: "Do you provide 24/7 support?",
      answer:
        "Yes, we provide 24/7 technical support for charging-related issues. For general inquiries, our support team is available Monday-Friday, 9 AM-6 PM. Emergency support is always available.",
    },
    {
      id: 15,
      category: "general",
      question: "Is the energy you provide really green?",
      answer:
        "Yes! All our charging stations are powered by 100% renewable energy sources including solar and wind power. We're committed to making EV charging truly sustainable.",
    },
  ];

  const categories = [
    { id: "all", label: "All Categories", icon: <FaQuestionCircle /> },
    { id: "general", label: "General", icon: <FaQuestionCircle /> },
    { id: "charging", label: "Charging", icon: <FaBolt /> },
    { id: "booking", label: "Booking", icon: <FaMapMarkerAlt /> },
    { id: "payment", label: "Payment", icon: <FaCreditCard /> },
    { id: "technical", label: "Technical", icon: <FaHeadset /> },
  ];

  useEffect(() => {
    let filtered = faqData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFAQs(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <NavbarComponent />
      <div className="faq-page">
        <Container>
          <div className="faq-header">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about Evoltsoft</p>
          </div>

          <Row className="mb-5">
            <Col lg={8} className="mx-auto">
              <div className="search-container">
                <Form.Group className="search-group">
                  <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <Form.Control
                      type="text"
                      placeholder="Search for answers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </Form.Group>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={3}>
              <div className="category-sidebar">
                <h5>Categories</h5>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`category-item ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                    <span className="count">
                      (
                      {category.id === "all"
                        ? faqData.length
                        : faqData.filter((faq) => faq.category === category.id)
                            .length}
                      )
                    </span>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={9}>
              <div className="faq-content">
                {filteredFAQs.length === 0 ? (
                  <Card className="no-results">
                    <Card.Body className="text-center py-5">
                      <FaQuestionCircle size={60} className="text-muted mb-3" />
                      <h4>No Results Found</h4>
                      <p className="text-muted">
                        Try adjusting your search terms or browse different
                        categories.
                      </p>
                    </Card.Body>
                  </Card>
                ) : (
                  <Accordion>
                    {filteredFAQs.map((faq, index) => (
                      <Accordion.Item
                        eventKey={index.toString()}
                        key={faq.id}
                        className="faq-item"
                      >
                        <Accordion.Header>
                          <span className="question-text">{faq.question}</span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>{faq.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                )}
              </div>
            </Col>
          </Row>

          <div className="contact-support">
            <Card className="support-card">
              <Card.Body className="text-center">
                <h3>Still have questions?</h3>
                <p>
                  Can't find what you're looking for? Our support team is here
                  to help!
                </p>
                <div className="support-buttons">
                  <Button variant="primary" href="/contact" className="me-3">
                    Contact Support
                  </Button>
                  <Button
                    variant="outline-primary"
                    href="mailto:support@evoltsoft.com"
                  >
                    Email Us
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

export default FAQ;
