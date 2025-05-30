import { useState, useEffect } from "react";
import { GrFormUpload } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import "./userinfo.css";
const UserInfo = () => {
  const [userInfo, setuserInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    profilePicture:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT5p4_tWehsK48da06XVBCme8pyhxX3XF84dSG403cFCA7JZlKx",
  });
  useEffect(() => {
    const { name, email, phoneNumber, role } = JSON.parse(
      localStorage.getItem("user-data")
    );
    let newObj = { name, email, phoneNumber, role };

    setuserInfo({
      ...userInfo,
      ...newObj,
    });
  }, []);

  const removePhonenumber = () => {
    setuserInfo({
      ...userInfo,
      phoneNumber: "",
    });
  };
  const removeEmail = () => {
    setuserInfo({
      ...userInfo,
      email: "",
    });
  };

  const removeProfilePicture = () => {
    setuserInfo({
      ...userInfo,
      profilePicture: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
    })
  }
  return (
    <div className="userinfo-container">
      <h5> Personal Profile </h5>
      <div className="profile-img-section">
        <div className="item-1">
          <img src={userInfo.profilePicture} alt="profile-img" />
        </div>
        <div className="item-2">
          <GrFormUpload />
          <h6>Upload a new one </h6>
        </div>
        <div onClick={removeProfilePicture} className="item-3">
          <MdOutlineDeleteOutline />
          <h6>Remove</h6>
        </div>
      </div>
      <div className="user-details">
        <div>
          <p className="user-title">Full Name</p>
          <p className="user-data">{userInfo.name}</p>
        </div>
        <div>
          <p className="user-title">Role</p>
          <p className="user-data">{userInfo.role}</p>
        </div>

        <div>
          <p className="user-title"> Contact Information</p>
          <div className="contact-links-container">
            <div>
              <div className="contact">
                <AiOutlineMail />
                <p>Mail ID:</p>
                <p>{userInfo.email}</p>
              </div>
              <button onClick={removeEmail}>Remove</button>
            </div>
            <div>
              <div className="contact">
                <BiPhoneCall />
                <p>Phone Number:</p>
                <p>{userInfo.phoneNumber}</p>
              </div>
              <button onClick={removePhonenumber}>Remove</button>
            </div>
            <button id="edit-profile-btn">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
