import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import { LoginContext } from "../Context/LoginContext";
import "./styles/contact.css";

const Contact = () => {
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }
  }, [setUserInfo, setIsUserLogin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Contact form submitted:", formData);
    setShowAlert(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setShowAlert(false), 5000);
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"],
      color: "#667eea",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["support@evoltsoft.com", "sales@evoltsoft.com"],
      color: "#4ecdc4",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      details: ["123 Tech Park, Bandra", "Mumbai, Maharashtra 400051"],
      color: "#ff6b6b",
    },
    {
      icon: <FaClock />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "24/7 Technical Support"],
      color: "#feca57",
    },
  ];

  return (
    <>
      <NavbarComponent />
      <div className="contact-page">
        <Container>
          <div className="contact-header">
            <h1>Get in Touch</h1>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>

          <Row>
            <Col lg={8}>
              <Card className="contact-form-card">
                <Card.Body>
                  <h3>Send us a Message</h3>

                  {showAlert && (
                    <Alert variant="success" className="mb-4">
                      Thank you for your message! We'll get back to you soon.
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject *</Form.Label>
                      <Form.Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us more about your inquiry..."
                      />
                    </Form.Group>

                    <Button type="submit" className="submit-btn">
                      Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <div className="contact-info">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="contact-info-card">
                    <Card.Body>
                      <div
                        className="contact-icon"
                        style={{ backgroundColor: info.color }}
                      >
                        {info.icon}
                      </div>
                      <h5>{info.title}</h5>
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>

          {/* Map Section */}
          <div className="map-section">
            <h3>Find Us</h3>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8267761638086!2d72.8258315153445!3d19.06093258710744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b9f%3A0x7b2b9b7b7b7b7b7b!2sBandra%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Evoltsoft Office Location"
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
