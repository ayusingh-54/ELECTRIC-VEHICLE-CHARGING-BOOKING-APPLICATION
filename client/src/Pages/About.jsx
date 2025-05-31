import { Container, Row, Col, Card } from "react-bootstrap";
import { FaLeaf, FaBolt, FaUsers, FaGlobe } from "react-icons/fa";
import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import { useContext, useEffect } from "react";
import { LoginContext } from "../Context/LoginContext";
import "./styles/about.css";

const About = () => {
  const { setUserInfo, setIsUserLogin } = useContext(LoginContext);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    }
  }, [setUserInfo, setIsUserLogin]);

  const stats = [
    { icon: <FaBolt />, number: "500+", label: "Charging Stations" },
    { icon: <FaUsers />, number: "10,000+", label: "Active Users" },
    { icon: <FaLeaf />, number: "1M+", label: "kWh Green Energy" },
    { icon: <FaGlobe />, number: "50+", label: "Cities Covered" },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Visionary leader with 15+ years in clean energy and sustainable transportation.",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Tech innovator specializing in IoT and smart charging infrastructure.",
    },
    {
      name: "Amit Patel",
      role: "VP Operations",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      bio: "Operations expert ensuring seamless charging experiences across our network.",
    },
  ];

  return (
    <>
      <NavbarComponent />
      <div className="about-page">
        {/* Hero Section */}
        <div className="about-hero">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <h1>Powering India's Electric Future</h1>
                <p>
                  At Evoltsoft, we're committed to building a comprehensive EV
                  charging infrastructure that makes electric mobility
                  accessible, convenient, and sustainable for everyone.
                </p>
              </Col>
              <Col lg={6}>
                <img
                  src="https://cdn.prod.website-files.com/65d8cefb4f46c79b3df8c46f/677caeb07704f6d53f263d2b_Evoltsoft%20Team_compressed-p-1080.webp"
                  alt="Evoltsoft Team"
                  className="hero-image"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400/667eea/ffffff?text=Evoltsoft+Team";
                  }}
                />
              </Col>
            </Row>
          </Container>
        </div>

        {/* Mission Section */}
        <Container>
          <div className="mission-section">
            <Row>
              <Col lg={8} className="mx-auto text-center">
                <h2>Our Mission</h2>
                <p>
                  To accelerate the adoption of electric vehicles by creating a
                  reliable, fast, and user-friendly charging network powered by
                  100% renewable energy. We believe in a future where clean
                  transportation is not just possible, but preferred.
                </p>
              </Col>
            </Row>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <Row>
              {stats.map((stat, index) => (
                <Col lg={3} md={6} key={index} className="text-center mb-4">
                  <div className="stat-card">
                    <div className="stat-icon">{stat.icon}</div>
                    <h3>{stat.number}</h3>
                    <p>{stat.label}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Values Section */}
          <div className="values-section">
            <h2>Our Values</h2>
            <Row>
              <Col lg={4} className="mb-4">
                <Card className="value-card">
                  <Card.Body>
                    <FaLeaf className="value-icon" />
                    <h4>Sustainability</h4>
                    <p>
                      Every decision we make is guided by our commitment to
                      environmental responsibility and sustainable practices.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} className="mb-4">
                <Card className="value-card">
                  <Card.Body>
                    <FaBolt className="value-icon" />
                    <h4>Innovation</h4>
                    <p>
                      We continuously innovate to provide cutting-edge charging
                      solutions that exceed user expectations.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} className="mb-4">
                <Card className="value-card">
                  <Card.Body>
                    <FaUsers className="value-icon" />
                    <h4>Community</h4>
                    <p>
                      We build strong relationships with our users, partners,
                      and communities to create lasting positive impact.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h2>Meet Our Team</h2>
            <Row>
              {team.map((member, index) => (
                <Col lg={4} md={6} key={index} className="mb-4">
                  <Card className="team-card">
                    <div className="team-image">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <Card.Body>
                      <h4>{member.name}</h4>
                      <h6>{member.role}</h6>
                      <p>{member.bio}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default About;
