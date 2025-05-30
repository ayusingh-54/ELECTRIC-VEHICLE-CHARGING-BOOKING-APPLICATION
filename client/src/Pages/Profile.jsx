import { useState } from "react";
import UserInfo from "../Components/UserInfo/userInfo.jsx";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ListBookings from "../Components/List-Bookings/list-bookings.jsx";
import "./styles/profile.css";

const ProfilePage = () => {
  const [renderdItem, setRenderdItem] = useState("ListOfBookings");
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-info-container">
        <div className="sidebar-options">
          <div className="settings-div">
            <div onClick={redirectHome}>
              <AiOutlineArrowLeft />
            </div>
            <AiOutlineSetting />
            <p>Settings</p>
          </div>
          <div className="sidebar-items">
            <div
              onClick={() => {
                setRenderdItem("ListOfBookings");
              }}
            >
              Booking List
            </div>
            <div
              onClick={() => {
                setRenderdItem("UserInfo");
              }}
            >
              Edit Profile
            </div>
            <div>Privacy & Security</div>
            <div>Notifications</div>
            <div>Help & Support</div>
          </div>
        </div>
        <>
          {renderdItem === "UserInfo" && <UserInfo />}
          {renderdItem === "ListOfBookings" && <ListBookings />}
        </>
      </div>
    </div>
  );
};
export default ProfilePage;
