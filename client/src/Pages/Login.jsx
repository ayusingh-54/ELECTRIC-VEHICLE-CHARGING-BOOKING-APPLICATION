import {
  Container,
  Image,
  Form,
  Stack,
  Button,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import "dotenv";
import "./styles/login.css";

const Login = () => {
  const location = useLocation();

  // Better BASE_URL configuration with fallbacks
  const getBaseURL = () => {
    // Check if we're in development mode
    if (import.meta.env.DEV || window.location.hostname === "localhost") {
      return import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    }
    // Production URL
    return (
      import.meta.env.VITE_BASE_URL ||
      "https://electric-vehicle-charging-booking-a.vercel.app"
    );
  };

  const BASE_URL = getBaseURL();

  // Add debugging with better error context
  console.log("Login Environment debug:", {
    NODE_ENV: import.meta.env.MODE,
    VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
    BASE_URL: BASE_URL,
    hostname: window.location.hostname,
    isDev: import.meta.env.DEV,
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [toastColor, setToastColor] = useState("dark");
  const { setIsUserLogin, setUserInfo } = useContext(LoginContext);
  const [isAdminActive, setIsAdminActive] = useState(false);
  const tabSize = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    if (location.pathname === "/admin/login") {
      setIsAdminActive(true);
    }
  }, [location.pathname]);
  const handleChanges = (e) => {
    const value = e.target.value;

    switch (e.target.name) {
      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        setIsPasswordValid(value.length >= 6);
        break;
      default:
        break;
    }
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
    if (form.checkValidity() === true && email && password) {
      sendToServer();
    }
  };

  const navigateSignup = () => {
    if (isAdminActive) {
      navigate("/admin/signup");
      return;
    }
    navigate("/signup");
  };

  const sendToServer = () => {
    const userData = {
      email,
      password,
    };

    console.log("Attempting to login with URL:", BASE_URL);
    console.log("Login attempt for email:", email);

    // Validate BASE_URL before making request
    if (!BASE_URL || BASE_URL === "undefined") {
      setToastColor("danger");
      setShowAlert(true);
      setAlertMsg("Configuration error. Please contact support.");
      return;
    }

    // Add timeout and better error handling
    const axiosConfig = {
      timeout: 10000, // 10 second timeout
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/user/login`, userData, axiosConfig)
      .then((response) => {
        console.log("Login response:", response);
        if (response.status === 200) {
          const { token } = response.data;
          const { email, name, phoneNumber, role, _id } = response.data.user;
          const userLoginData = {
            token,
            _id,
            email,
            name,
            phoneNumber,
            role,
          };
          setUserInfo(userLoginData);
          setIsUserLogin(true);
          localStorage.setItem("Login", true);
          localStorage.setItem("user-data", JSON.stringify(userLoginData));

          setToastColor("success");
          setShowAlert(true);
          setAlertMsg("Login Successful.");
          setTimeout(() => {
            navigate("/");
          }, 2400);
        } else {
          console.log("Unexpected response:", response);
          setToastColor("warning");
          setShowAlert(true);
          setAlertMsg("Unexpected response from server.");
        }
      })
      .catch((err) => {
        console.error("Login error details:", {
          message: err.message,
          code: err.code,
          response: err.response?.data,
          status: err.response?.status,
          url: err.config?.url,
          baseURL: BASE_URL,
          timeout: err.code === "ECONNABORTED",
        });

        // Enhanced error handling
        if (err.code === "ECONNABORTED") {
          setToastColor("danger");
          setShowAlert(true);
          setAlertMsg(
            "Request timeout. Please check your connection and try again."
          );
        } else if (err.response && err.response.status) {
          const status = err.response.status;
          if (status === 401 || status === 404) {
            setToastColor("danger");
            setShowAlert(true);
            setAlertMsg(err.response.data.message || "Invalid credentials.");
          } else {
            setToastColor("danger");
            setShowAlert(true);
            setAlertMsg("Server Error. Please try again later.");
          }
        } else if (
          err.code === "ERR_NETWORK" ||
          err.message.includes("Network Error") ||
          err.message.includes("ERR_CONNECTION_REFUSED")
        ) {
          setToastColor("danger");
          setShowAlert(true);
          setAlertMsg(
            `Cannot connect to server. Please ensure the server is running on ${BASE_URL} or try again later.`
          );
        } else {
          setToastColor("danger");
          setShowAlert(true);
          setAlertMsg("Login failed. Please try again later.");
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
        <Container
          fluid
          className="trapezoid-box trapezoid-box-login"
        ></Container>

        <Container fluid className="login-container">
          {!tabSize && (
            <Container className="img-section login-img-section">
              <Image
                src="https://www.omanobserver.om/omanobserver/uploads/images/2022/03/21/1948788.jpg"
                alt="img"
              />
            </Container>
          )}
          <Container className="login-form-container">
            <h1 className="login-welcome">Log in</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  onChange={handleChanges}
                  name="email"
                  value={email}
                />
                <Form.Control.Feedback type="invalid">
                  Email is required.
                </Form.Control.Feedback>
                <Form.Control.Feedback> Email is valid.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={handleChanges}
                  name="password"
                  value={password}
                />
                {isPasswordValid && (
                  <Form.Control.Feedback> Good to go ✅.</Form.Control.Feedback>
                )}
                <Form.Control.Feedback type="invalid">
                  Password is required.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  className="remember-check-box"
                  type="checkbox"
                  label="Remember me ?"
                />
              </Form.Group>
              <p className="bottom-caption">
                Need an account? <span onClick={navigateSignup}> Sign up </span>
              </p>

              <Button type="submit" className="login-btn">
                Login
              </Button>
            </Form>

            {!tabSize && (
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
export default Login;
