import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState(""); // State to store email input
  const navigate = useNavigate(); // To navigate to another page

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailLogin = () => {
    if (email) {
      // Simulate authentication (You can replace this with your actual auth logic)
      const user = { email: email, loggedIn: true };

      // Store user data in localStorage (optional)
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the home page after login
      navigate("/");
    } else {
      alert("Please enter a valid email");
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login logic (You can replace this with actual Google authentication)
    const user = { email: "googleuser@example.com", loggedIn: true };

    // Store user data in localStorage (optional)
    localStorage.setItem("user", JSON.stringify(user));

    // Navigate to the home page after Google login
    navigate("/");
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2>Welcome to Elegant</h2>
        <p>Please sign in or sign up below</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="email-input"
          value={email}
          onChange={handleEmailChange} // Handle email input change
        />
        <button className="login-btn email-btn" onClick={handleEmailLogin}>
          Continue with Email
        </button>
        <hr />
        <button className="login-btn google-btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
