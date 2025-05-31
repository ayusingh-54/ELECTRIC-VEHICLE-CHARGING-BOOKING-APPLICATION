import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { Toast, ToastContainer } from "react-bootstrap";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { isUserLogin, setIsUserLogin, setUserInfo } = useContext(LoginContext);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-data"));
    if (userData?.token) {
      setUserInfo(userData);
      setIsUserLogin(true);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, []);

  if (!isUserLogin) {
    return (
      <>
        <div
          style={{
            padding: "150px 20px",
            textAlign: "center",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            minHeight: "100vh",
          }}
        >
          <h2>Authentication Required</h2>
          <p>Please login to access this feature.</p>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              color: "white",
              border: "none",
              padding: "12px 30px",
              borderRadius: "25px",
              cursor: "pointer",
            }}
          >
            Login Now
          </button>
        </div>
        <ToastContainer position="top-center">
          <Toast
            bg="warning"
            onClose={() => setShowAlert(false)}
            show={showAlert}
            animation={true}
            delay={3000}
            autohide
          >
            <Toast.Body>Please login to access this feature.</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
