import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./Components/Admin";
import Login from "./Components/Login";

const App = () => {
  // Initialize state based on local storage to persist login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") ? true : false
  );

  // Save login state to local storage when it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("authToken", "yourAuthTokenHere"); // Set the token when logged in
    } else {
      localStorage.removeItem("authToken"); // Remove the token when logged out
    }
  }, [isLoggedIn]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
        )}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/admin/dashboard" : "/"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
