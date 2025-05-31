import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Badge,
  Modal,
} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import {
  FaArrowLeft,
  FaCog,
  FaCalendarAlt,
  FaEdit,
  FaShieldAlt,
  FaBell,
  FaQuestionCircle,
  FaTrash,
  FaMapMarkerAlt,
  FaClock,
  FaBolt,
} from "react-icons/fa";
import NavbarComponent from "../Components/Navbar/navbar";
import Footer from "../Components/HomeComponents/footer";
import { LoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/profile.css";

const ProfilePage = () => {
  const { userInfo, setUserInfo, isUserLogin, setIsUserLogin } =
    useContext(LoginContext);
  const [activeSection, setActiveSection] = useState("booking");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
      setProfileData({
        name: userData.name || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        role: userData.role || "",
      });
      fetchBookings(userData._id);
    } else {
      navigate("/login");
    }
  }, []);

  const fetchBookings = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/booking/user/get-all-bookings/${userId}`
      );
      if (response.status === 200) {
        setBookings(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/booking/delete-slot-by-id/${bookingId}`
      );
      if (response.status === 200) {
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
        setAlertMessage("Booking cancelled successfully!");
        setAlertType("success");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Error cancelling booking. Please try again.");
      setAlertType("danger");
      setShowAlert(true);
    }
    setShowDeleteModal(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically update the profile via API
      const updatedUserData = { ...userInfo, ...profileData };
      localStorage.setItem("user-data", JSON.stringify(updatedUserData));
      setUserInfo(updatedUserData);
      setAlertMessage("Profile updated successfully!");
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage("Error updating profile. Please try again.");
      setAlertType("danger");
      setShowAlert(true);
    }
  };

  const sidebarItems = [
    { id: "booking", label: "Booking List", icon: <FaCalendarAlt /> },
    { id: "edit", label: "Edit Profile", icon: <FaEdit /> },
    { id: "privacy", label: "Privacy & Security", icon: <FaShieldAlt /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "help", label: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  const renderBookingList = () => (
    <div className="booking-section">
      <div className="section-header">
        <h2>List of Bookings</h2>
        <p>Manage your EV charging station bookings</p>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : bookings.length === 0 ? (
        <Card className="empty-state">
          <Card.Body className="text-center py-5">
            <FaCalendarAlt size={60} className="text-muted mb-3" />
            <h4>No Bookings Found</h4>
            <p className="text-muted">You haven't made any bookings yet.</p>
            <Button
              variant="primary"
              onClick={() => navigate("/stations")}
              className="mt-3"
            >
              Find Charging Stations
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col lg={6} key={booking._id} className="mb-4">
              <Card className="booking-card">
                <Card.Body>
                  <div className="booking-header">
                    <h5>{booking.evStation?.stationName}</h5>
                    <Badge bg="success">Active</Badge>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>{booking.evStation?.location}</span>
                    </div>
                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <span>
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <FaBolt className="detail-icon" />
                      <span>₹{booking.evStation?.pricePerHour}/hr</span>
                    </div>
                    <div className="detail-item">
                      <strong>Vehicle:</strong> {booking.vehicleType} -{" "}
                      {booking.vehicleNumber}
                    </div>
                  </div>

                  <div className="booking-actions">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setDeleteBookingId(booking._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash /> Cancel Booking
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );

  const renderEditProfile = () => (
    <div className="edit-section">
      <div className="section-header">
        <h2>Edit Profile</h2>
        <p>Update your personal information</p>
      </div>

      <Card>
        <Card.Body>
          <Form onSubmit={handleProfileUpdate}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={profileData.phoneNumber}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        phoneNumber: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileData.role}
                    disabled
                    className="bg-light"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

  const renderPrivacySecurity = () => (
    <div className="privacy-section">
      <div className="section-header">
        <h2>Privacy & Security</h2>
        <p>Manage your privacy settings and account security</p>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <h5>Change Password</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
              />
            </Form.Group>
            <Button variant="primary">Update Password</Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5>Privacy Settings</h5>
          <Form.Check
            type="switch"
            label="Allow location tracking for better service"
            className="mb-3"
            defaultChecked
          />
          <Form.Check
            type="switch"
            label="Share usage data for service improvement"
            className="mb-3"
            defaultChecked
          />
          <Form.Check
            type="switch"
            label="Marketing communications"
            className="mb-3"
          />
        </Card.Body>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-section">
      <div className="section-header">
        <h2>Notifications</h2>
        <p>Choose what notifications you want to receive</p>
      </div>

      <Card>
        <Card.Body>
          <div className="notification-group">
            <h5>Email Notifications</h5>
            <Form.Check
              type="switch"
              label="Booking confirmations"
              className="mb-2"
              defaultChecked
            />
            <Form.Check
              type="switch"
              label="Charging session updates"
              className="mb-2"
              defaultChecked
            />
            <Form.Check
              type="switch"
              label="Payment receipts"
              className="mb-2"
              defaultChecked
            />
            <Form.Check
              type="switch"
              label="Promotional offers"
              className="mb-4"
            />
          </div>

          <div className="notification-group">
            <h5>Push Notifications</h5>
            <Form.Check
              type="switch"
              label="Charging complete alerts"
              className="mb-2"
              defaultChecked
            />
            <Form.Check
              type="switch"
              label="Station availability updates"
              className="mb-2"
              defaultChecked
            />
            <Form.Check
              type="switch"
              label="Maintenance notifications"
              className="mb-2"
            />
          </div>

          <Button variant="primary" className="mt-3">
            Save Preferences
          </Button>
        </Card.Body>
      </Card>
    </div>
  );

  const renderHelpSupport = () => (
    <div className="help-section">
      <div className="section-header">
        <h2>Help & Support</h2>
        <p>Get help and contact our support team</p>
      </div>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h5>Contact Support</h5>
              <p>Get direct help from our support team</p>
              <Button variant="primary" onClick={() => navigate("/contact")}>
                Contact Us
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h5>FAQ</h5>
              <p>Find answers to common questions</p>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/faq")}
              >
                View FAQ
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <h5>Send Feedback</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select>
                <option>General Feedback</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Service Issue</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Tell us about your experience..."
              />
            </Form.Group>
            <Button variant="primary">Send Feedback</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "booking":
        return renderBookingList();
      case "edit":
        return renderEditProfile();
      case "privacy":
        return renderPrivacySecurity();
      case "notifications":
        return renderNotifications();
      case "help":
        return renderHelpSupport();
      default:
        return renderBookingList();
    }
  };

  if (!isUserLogin) {
    return null;
  }

  return (
    <>
      <NavbarComponent />
      <div className="profile-page">
        <Container fluid>
          <Row>
            <Col lg={3} className="sidebar-col">
              <div className="profile-sidebar">
                <div className="sidebar-header">
                  <Button
                    variant="link"
                    className="back-btn"
                    onClick={() => navigate("/")}
                  >
                    <FaArrowLeft /> Back
                  </Button>
                  <h4>
                    <FaCog className="me-2" />
                    Settings
                  </h4>
                </div>

                <div className="sidebar-menu">
                  {sidebarItems.map((item) => (
                    <div
                      key={item.id}
                      className={`sidebar-item ${
                        activeSection === item.id ? "active" : ""
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col lg={9} className="content-col">
              <div className="profile-content">
                {showAlert && (
                  <Alert
                    variant={alertType}
                    dismissible
                    onClose={() => setShowAlert(false)}
                    className="mb-4"
                  >
                    {alertMessage}
                  </Alert>
                )}

                {renderContent()}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this booking? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Keep Booking
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteBooking(deleteBookingId)}
          >
            Cancel Booking
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default ProfilePage;
