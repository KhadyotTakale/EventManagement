import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import elegance from "../assets/new-year.png";

const Navbar = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    loggedIn: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleSignOut = () => {
    setUser({ name: "", email: "", loggedIn: false });
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage")); // Manually trigger storage event
    navigate("/"); // Redirect to home after sign-out
  };

  const handleSignInClick = () => {
    if (!user.loggedIn) {
      navigate("/login");
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
        {user.loggedIn && ( // Only show Events if logged in
          <li>
            <Link to="/events" className="nav-link">
              Events
            </Link>
          </li>
        )}
      </ul>

      <div className="signin">
        {user.loggedIn ? (
          <button className="btn" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <button className="btn" onClick={handleSignInClick}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
