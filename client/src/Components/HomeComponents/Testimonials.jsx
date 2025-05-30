import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./styles/testimonials.css";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Tesla Model 3 Owner",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Evoltsoft has revolutionized my electric vehicle experience. Finding charging stations is now effortless, and the app's real-time updates save me so much time. Highly recommended!",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Tata Nexon EV Owner",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The convenience of booking charging slots in advance is amazing! No more waiting in queues. The network coverage is excellent, and the charging speeds are impressive.",
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "MG ZS EV Owner",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Customer service is top-notch! When I had an issue with a charging station, their support team resolved it within minutes. The app is user-friendly and the pricing is transparent.",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Hyundai Kona Owner",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Love the eco-friendly approach! Knowing that I'm charging with 100% green energy makes me feel good about my environmental impact. The stations are clean and well-maintained.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="testimonials-section">
      <Container>
        <div className="testimonials-header">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied EV owners who trust Evoltsoft</p>
        </div>

        <Row className="testimonials-content">
          <Col lg={8} className="mx-auto">
            <div className="testimonials-slider">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={`testimonial-card ${
                    index === activeTestimonial ? "active" : ""
                  }`}
                >
                  <Card.Body>
                    <FaQuoteLeft className="quote-icon" />
                    <p className="testimonial-text">{testimonial.text}</p>

                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star-icon" />
                      ))}
                    </div>

                    <div className="testimonial-author">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="author-image"
                      />
                      <div className="author-info">
                        <h5>{testimonial.name}</h5>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <div className="testimonials-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${
                    index === activeTestimonial ? "active" : ""
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Testimonials;
