import {
  Container,
  Image,
  Form,
  Button,
  Stack,
  InputGroup,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import "./styles/login.css";
import "dotenv";

const Signup = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [toastColor, setToastColor] = useState("dark");
  const [isAdminActive, setIsAdminActive] = useState(false);

  const tabSize = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    console.log("path name", location.pathname);
    if (location.pathname === "/admin/signup") {
      setIsAdminActive(true);
      setRole("admin");
    }
  }, [location.pathname]);

  const handleChanges = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "name":
        setName(value);
        break;
      case "role":
        setRole(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "password":
        setPassword(value);
        setIsPasswordValid(value.length >= 6);
        break;
      default:
        break;
    }
  };

  const navigateLogin = () => {
    if (isAdminActive) {
      navigate("/admin/login");
      return;
    }
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    setValidated(true);
    if (!isPasswordValid) {
      setShowAlert(true);
      setAlertMsg("Password must be at least 6 characters long.");
      return;
    }

    if (
      form.checkValidity() === true &&
      name &&
      role &&
      email &&
      phoneNumber &&
      password
    ) {
      sendToServer();
    }
  };

  const sendToServer = () => {
    const userData = {
      name,
      role,
      email,
      phoneNumber,
      password,
    };
    axios
      .post(`${BASE_URL}/user/register`, userData)
      .then((response) => {
        if (response.status === 201) {
          setToastColor("success");
          setShowAlert(true);
          setAlertMsg("Registration completed.");
          setTimeout(() => {
            navigate("/login");
          }, 2400);
        } else {
          console.log("error: => ", response);
        }
      })
      .catch((err) => {
        console.log("error: => ", err);
        if (err.response && err.response.status === 400) {
          console.log("error: => ", err.response.data.message);
          setToastColor("danger");
          setShowAlert(true);
          setAlertMsg(err.response.data.message);
        } else {
          setToastColor("danger");
          setShowAlert(true);
          setAlertMsg(
            "Cannot connect to server. Please check if the server is running."
          );
        }
      });
  };

  return (
    <>
      <ToastContainer position="top-center">
        <Toast
          className="toast-msg"
          bg={toastColor}
          onClose={() => setShowAlert(false)}
          show={showAlert}
          animation={true}
          delay={2000}
          autohide
        >
          <Toast.Body>{alertMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container fluid className="login-page">
        <Container fluid className="trapezoid-box"></Container>
        <Container fluid className="login-container">
          {!tabSize && (
            <Container className="img-section">
              <Image
                src="https://www.cyient.com/hubfs/MicrosoftTeams-image_%2811%29.png"
                alt="img"
              />
            </Container>
          )}

          <Container className="login-form-container">
            <h1 className="login-welcome">Sign up</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="validationCustom01">
                <Form.Control
                  required
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChanges}
                  name="name"
                  value={name}
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Please enter your Full Name.
                </Form.Control.Feedback>
                <Form.Control.Feedback>
                  {" "}
                  Looks Good {name}!.
                </Form.Control.Feedback>
              </Form.Group>
              {!isAdminActive && (
                <Form.Group className="mb-2" controlId="formBasicSelect">
                  <Form.Select
                    size="sm"
                    onChange={handleChanges}
                    value={role}
                    name="role"
                  >
                    <option value="user">User</option>
                    <option value="ev-station">EV Station</option>
                    {/* <option value="admin">Admin</option> */}
                  </Form.Select>
                </Form.Group>
              )}

              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  onChange={handleChanges}
                  name="email"
                  value={email}
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  Email is required.
                </Form.Control.Feedback>
                <Form.Control.Feedback> Email is valid.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2" controlId="validationCustom02">
                <InputGroup hasValidation>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Phone Number"
                    onChange={handleChanges}
                    name="phoneNumber"
                    value={phoneNumber}
                    size="sm"
                  />
                  <Form.Control.Feedback type="invalid">
                    Phone Number is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={handleChanges}
                  name="password"
                  size="sm"
                  value={password}
                />
                {isPasswordValid && (
                  <Form.Control.Feedback>
                    {" "}
                    Password is strong ✅.
                  </Form.Control.Feedback>
                )}
                <Form.Control.Feedback type="invalid">
                  Password is required.
                </Form.Control.Feedback>
              </Form.Group>
              <p className="bottom-caption">
                Already have an account?{" "}
                <span onClick={navigateLogin}> Login </span>
              </p>
              <Button type="submit" className="login-btn">
                Signup
              </Button>
            </Form>

            {tabSize && (
              <div>
                <Stack className="footer" direction="horizontal" gap={3}>
                  <div>Copyright Policy</div>
                  <div>Privacy Policy</div>
                  <div>Send feedback</div>
                </Stack>
                <Stack className="footer-2" direction="horizontal" gap={3}>
                  <div>User</div>
                  <div>Privacy Policy</div>
                  <div>Send feedback</div>
                  <div className="ms-auto credit">EV Locator © 2023</div>
                </Stack>
              </div>
            )}
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Signup;
