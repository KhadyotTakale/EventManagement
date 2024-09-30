import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate for redirection
import "./Navbar.css";
import elegance from "../assets/new-year.png";
import login from "../assets/login.png";

const Navbar = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    loggedIn: false, // Initially the user is not logged in
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // To programmatically navigate to other routes

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    setUser({ name: "", email: "", loggedIn: false }); // Reset user data
  };

  const handleSignInClick = () => {
    // Redirect to the login page if the user is not logged in
    if (!user.loggedIn) {
      navigate("/login"); // Redirects to login page
    }
  };

  return (
    <div className="navbar">
      <div>
        <img className="logo" src={elegance} alt="Elegant Enterprises" />
        <p>Presented by Elegant Enterprises</p>
      </div>

      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/events" className="nav-link">
            Events
          </Link>
        </li>
      </ul>

      <div className="login">
        {user.loggedIn ? (
          <div className="profile-menu">
            <button className="btn" onClick={handleDropdownToggle}>
              {user.name || "Profile"}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <ul>
                  <li>
                    <Link to="/profile">View Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li onClick={handleSignOut}>Sign Out</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          // Show the Sign In button if the user is not logged in
          <button className="btn" onClick={handleSignInClick}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
