import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaEnvelope, FaBell, FaGift } from "react-icons/fa";
import { useState } from "react";
import "./styles/newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="newsletter-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="newsletter-content">
              <div className="newsletter-icon">
                <FaEnvelope />
              </div>
              <h2>Stay Updated with Evoltsoft</h2>
              <p>
                Subscribe to our newsletter and get the latest updates on new
                charging stations, special offers, and EV industry news
                delivered straight to your inbox.
              </p>

              <div className="newsletter-benefits">
                <div className="benefit-item">
                  <FaBell className="benefit-icon" />
                  <span>New station alerts</span>
                </div>
                <div className="benefit-item">
                  <FaGift className="benefit-icon" />
                  <span>Exclusive discounts</span>
                </div>
                <div className="benefit-item">
                  <FaEnvelope className="benefit-icon" />
                  <span>Monthly EV tips</span>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="newsletter-form-container">
              {subscribed ? (
                <Alert variant="success" className="success-message">
                  <h4>🎉 Welcome to Evoltsoft!</h4>
                  <p>
                    Thank you for subscribing! You'll receive our latest updates
                    soon.
                  </p>
                </Alert>
              ) : (
                <Form onSubmit={handleSubscribe} className="newsletter-form">
                  <h3>Get Started Today</h3>
                  <div className="form-group">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="email-input"
                    />
                    <Button
                      type="submit"
                      className="subscribe-btn"
                      disabled={loading}
                    >
                      {loading ? "Subscribing..." : "Subscribe Now"}
                    </Button>
                  </div>
                  <small className="privacy-text">
                    We respect your privacy. Unsubscribe at any time.
                  </small>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Newsletter;
