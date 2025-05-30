import "bootstrap/dist/css/bootstrap.min.css";
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
            <Route path="/stations" element={<Station />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/book-slot/:evStationObjectId" element={<BookSlot />}>
              {" "}
            </Route>
            <Route path="/admin" element={<Home />}></Route>
            <Route path="/admin/login" element={<Login />}></Route>
            <Route path="/admin/signup" element={<Signup />}></Route>
            <Route path="/admin/stations" element={<Station />}></Route>
            <Route path="/admin/profile" element={<ProfilePage />}></Route>
            <Route
              path="/admin/*"
              element={
                <h1> 404 - check the URLS / /login /signup /stations </h1>
              }
            >
              {" "}
            </Route>
            <Route
              path="/*"
              element={
                <h1> 404 - check the URLS / /login /signup /stations </h1>
              }
            >
              {" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </>
  );
}

export default App;
