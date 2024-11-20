import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import ManageEvents from "./ManageEvents";
import Settings from "./Settings";
import Login from "./Login"; // Import Login component
import "./Admin.css";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    localStorage.setItem("authToken", "yourAuthTokenHere"); // You will replace this token with the actual one
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />; // Pass handleLogin to Login component
  }

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/manage-events">Manage Events</Link>
            </li>
            <li>
              <Link to="/admin/settings">Settings</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
