import React, { useState } from "react";
import "./ProfileComponent.scss";
import defaultAvatar from "../../images/image.png"; // Ảnh mặc định
import { Link } from "react-router-dom";

const ProfileComponent = () => {
  const [profile, setProfile] = useState({
    name: "Dom Dom",
    birthdate: "1997-01-01",
    address: "Ben Tre, Việt Nam",
    email: "trinhtranphuongtuan@example.com",
    avatar: defaultAvatar,
  });

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(profile.name);
  const [newBirthdate, setNewBirthdate] = useState(profile.birthdate);
  const [newAddress, setNewAddress] = useState(profile.address);
  const [newEmail, setNewEmail] = useState(profile.email);
  const [newAvatar, setNewAvatar] = useState(null);

  const handleSave = () => {
    setProfile({
      name: newName,
      birthdate: newBirthdate,
      address: newAddress,
      email: newEmail,
      avatar: newAvatar || profile.avatar,
    });
    setEditing(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <div className="profile-card">
        <img src={newAvatar || profile.avatar} alt="Avatar" className="profile-avatar" />
        <Link to="/favorite" className="favorite-list-btn">
          📌 Danh sách phim yêu thích
        </Link>
        
        {editing ? (
          <div className="profile-edit">
            <label>Tên:</label>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />

            <label>Ngày sinh:</label>
            <input type="date" value={newBirthdate} onChange={(e) => setNewBirthdate(e.target.value)} />

            <label>Địa chỉ:</label>
            <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />

            <label>Email:</label>
            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

            <label>Ảnh đại diện:</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />

            <button onClick={handleSave}>Lưu</button>
          </div>
        ) : (
          <div className="profile-info">
            <p><strong>Tên:</strong> {profile.name}</p>
            <p><strong>Ngày sinh:</strong> {profile.birthdate}</p>
            <p><strong>Địa chỉ:</strong> {profile.address}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <button onClick={() => setEditing(true)}>Chỉnh sửa</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
