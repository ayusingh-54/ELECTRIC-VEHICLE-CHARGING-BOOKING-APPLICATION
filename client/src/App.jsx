import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Station from "./Pages/Station";
import { LoginContext } from "./Context/LoginContext";
import { useState } from "react";
import ProfilePage from "./Pages/Profile";
import "./App.css";
import BookSlot from "./Pages/BookSlot";
import MapView from "./Pages/MapView";
import Pricing from "./Pages/Pricing";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import FAQ from "./Pages/FAQ";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    token: "",
  });

  return (
    <>
      <LoginContext.Provider
        value={{ isUserLogin, setIsUserLogin, userInfo, setUserInfo }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/stations"
              element={
                <ProtectedRoute>
                  <Station />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <MapView />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/pricing" element={<Pricing />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/faq" element={<FAQ />}></Route>
            <Route path="/fast-charging" element={<Services />}></Route>
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <Station />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/mobile-app" element={<Services />}></Route>
            <Route path="/corporate" element={<Services />}></Route>
            <Route path="/fleet" element={<Services />}></Route>
            <Route path="/support" element={<Contact />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/book-slot/:evStationObjectId"
              element={
                <ProtectedRoute>
                  <BookSlot />
                </ProtectedRoute>
              }
            ></Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<Home />}></Route>
            <Route path="/admin/login" element={<Login />}></Route>
            <Route path="/admin/signup" element={<Signup />}></Route>
            <Route path="/admin/stations" element={<Station />}></Route>
            <Route path="/admin/map" element={<MapView />}></Route>
            <Route path="/admin/profile" element={<ProfilePage />}></Route>

            {/* Legal Pages */}
            <Route path="/privacy" element={<About />}></Route>
            <Route path="/terms" element={<About />}></Route>
            <Route path="/cookies" element={<About />}></Route>

            {/* 404 Routes */}
            <Route
              path="/admin/*"
              element={
                <div style={{ padding: "100px 20px", textAlign: "center" }}>
                  <h1>404 - Page Not Found</h1>
                  <p>
                    Available admin routes: /admin/login, /admin/signup,
                    /admin/stations, /admin/map
                  </p>
                </div>
              }
            ></Route>
            <Route
              path="/*"
              element={
                <div style={{ padding: "100px 20px", textAlign: "center" }}>
                  <h1>404 - Page Not Found</h1>
                  <p>
                    Go back to <a href="/">Home</a>
                  </p>
                </div>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </>
  );
}

export default App;
