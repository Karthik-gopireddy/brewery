import React, { useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { Navigate, Link, useNavigate } from "react-router-dom";
import url_24 from "../url";

const Registration = ({ onTokenChange }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = { ...formData };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(`${url_24}/register`, options);
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      navigate("/"); // Navigate to the login page
    } else {
      alert(data.message);
      console.error("Registration failed:", data);
    }
  };

  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="registercontainer">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <Link style={{ textDecoration: "none" }} to="/">
            <div style={{ width: "100%", textAlign: "center" }}>
              <p className="signup-button">Login</p>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Registration;
