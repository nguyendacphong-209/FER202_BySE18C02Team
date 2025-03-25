import React from "react";
import { Link } from "react-router-dom";
import user from "../../images/image.png";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        Phim Cu
      </Link>

      <div className="user-section">
        <Link to="/about">About Us</Link>
        <Link to="/login" className="login-link">
          Login
        </Link>
        <Link to="/profile">
          <div className="user-image">
            <img src={user} alt="user" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
