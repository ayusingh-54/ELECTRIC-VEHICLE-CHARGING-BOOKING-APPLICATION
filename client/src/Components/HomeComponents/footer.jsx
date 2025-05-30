import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChargingStation,
  FaBolt,
  FaLeaf,
  FaArrowUp,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import "./styles/footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      {/* Main Footer Content */}
      <Container className="footer-content">
        <Row>
          {/* Company Info */}
          <Col lg={4} md={6} className="footer-section">
            <div className="footer-brand">
              <div className="brand-logo">
                <FaBolt className="logo-icon" />
                <h3>Evoltsoft</h3>
              </div>
              <p className="brand-description">
                Powering the future of electric mobility with smart, sustainable,
                and reliable charging solutions. Join the green revolution today!
              </p>
              <div className="footer-stats">
                <div className="stat">
                  <FaChargingStation />
                  <span>500+ Stations</span>
                </div>
                <div className="stat">
                  <FaLeaf />
                  <span>100% Green</span>
                </div>
                <div className="stat">
                  <FaBolt />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="footer-section">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/stations">Find Stations</a>
              </li>
              <li>
                <a href="/map">Station Map</a>
              </li>
              <li>
                <a href="/pricing">Pricing</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </Col>

          {/* Services */}
          <Col lg={2} md={6} className="footer-section">
            <h5 className="footer-title">Services</h5>
            <ul className="footer-links">
              <li>
                <a href="/fast-charging">Fast Charging</a>
              </li>
              <li>
                <a href="/booking">Slot Booking</a>
              </li>
              <li>
                <a href="/mobile-app">Mobile App</a>
              </li>
              <li>
                <a href="/corporate">Corporate Plans</a>
              </li>
              <li>
                <a href="/fleet">Fleet Management</a>
              </li>
              <li>
                <a href="/support">24/7 Support</a>
              </li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col lg={4} md={6} className="footer-section">
            <h5 className="footer-title">Stay Connected</h5>
            <p className="newsletter-text">
              Get the latest updates on new charging stations and exclusive offers.
            </p>

            {subscribed ? (
              <div className="subscription-success">
                <FaHeart className="success-icon" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <Form onSubmit={handleSubscribe} className="newsletter-form">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <Button type="submit" className="newsletter-btn">
                    Subscribe
                  </Button>
                </InputGroup>
              </Form>
            )}

            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>support@evoltsoft.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Social Media & Bottom Bar */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="social-links">
                <a href="#" className="social-link facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-link twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link linkedin">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="social-link youtube">
                  <FaYoutube />
                </a>
              </div>
            </Col>
            <Col md={6}>
              <div className="footer-bottom-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/cookies">Cookie Policy</a>
              </div>
            </Col>
          </Row>

          <hr className="footer-divider" />

          <div className="copyright">
            <p>
              © {currentYear} Evoltsoft. All rights reserved. Made with{" "}
              <FaHeart className="heart-icon" /> for a sustainable future.
            </p>
          </div>
        </Container>
      </div>

      {/* Scroll to Top Button */}
      <button className="scroll-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
