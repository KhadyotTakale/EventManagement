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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") ? true : false
  );

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("authToken", "yourAuthTokenHere");
    } else {
      localStorage.removeItem("authToken");
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
