import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import { FaChargingStation } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { CgProfile } from "react-icons/cg";
import { FcBusinessman } from "react-icons/fc";
import "./navbar.css";

const NavbarComponent = () => {
  const { isUserLogin, setIsUserLogin } = useContext(LoginContext);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  // const isLaptop = useMediaQuery({
  //   query: "(min-width: 1224px)",
  // });
  // const isTab = useMediaQuery({
  //   query: "(min-width: 768px)",
  // });
  const isMobile = useMediaQuery({
    query: "(max-width: 570px)",
  });

  const redirectSignup = () => {
    navigate("/signup");
  };
  const redirectLogin = () => {
    navigate("/login");
  };

  const redirectHome = () => {
    navigate("/");
  };

  const redirectProfile = () => {
    navigate("/profile");
  };

  const userLogout = () => {
    localStorage.removeItem("user-data");
    localStorage.removeItem("Login");
    setIsUserLogin(false);
    navigate("/login");
  };

  const redirectStation = () => {
    if (isUserLogin) {
      navigate("/stations");
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <Navbar id="custom-navbar-styles" fixed="top" data-bs-theme="dark">
        <Nav className="nav-left me-auto">
          <Navbar.Brand className="navbar-brand-logo" onClick={redirectHome}>
            <Image
              className="logo"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTMwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1IiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwNzNiNiI+RVYgTG9jYXRvcjwvdGV4dD4KPC9zdmc+"
              alt="logo"
            />
          </Navbar.Brand>
        </Nav>

        <Nav
          className={`nav-right ${
            isMobile && isUserLogin && "nav-right-login"
          }`}
        >
          {!isMobile ? (
            <>
              <div className="find-stations" onClick={redirectStation}>
                Find stations <FaChargingStation className="charging-icon" />
              </div>

              {isUserLogin ? (
                <>
                  <Nav.Link>
                    <div onClick={redirectProfile}>
                      {" "}
                      Profile
                      {/* <FcBusinessman/> */}
                    </div>
                  </Nav.Link>

                  <Nav.Link>
                    <Button onClick={userLogout} className="login-btn-2">
                      {" "}
                      Log out
                    </Button>
                  </Nav.Link>
                </>
              ) : (
                <Stack direction="horizontal" className="nav-btns">
                  <Nav.Link>
                    <Button
                      onClick={redirectSignup}
                      className="signin-btn"
                      variant="outline-dark"
                    >
                      {" "}
                      Sign up
                    </Button>
                  </Nav.Link>
                  <Nav.Link>
                    <Button onClick={redirectLogin} className="login-btn-2">
                      {" "}
                      Log in
                    </Button>
                  </Nav.Link>
                </Stack>
              )}
            </>
          ) : (
            <>
              {isUserLogin ? (
                <>
                  <div className="find-stations" onClick={redirectStation}>
                    Find stations{" "}
                    <FaChargingStation className="charging-icon" />
                  </div>
                  <Nav.Link>
                    <Button onClick={userLogout} className="login-btn-2">
                      {" "}
                      Log out
                    </Button>
                  </Nav.Link>
                </>
              ) : (
                <Stack direction="horizontal" className="nav-btns">
                  <Nav.Link>
                    <Button onClick={redirectLogin} className="login-btn-2">
                      {" "}
                      Log in
                    </Button>
                  </Nav.Link>
                </Stack>
              )}
            </>
          )}
        </Nav>
      </Navbar>
      <ToastContainer position="top-center">
        <Toast
          className="toast-msg"
          bg="primary"
          onClose={() => setShowAlert(false)}
          show={showAlert}
          animation={true}
          delay={2000}
          autohide
        >
          <Toast.Body>Login First.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
export default NavbarComponent;
