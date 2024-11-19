import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import ManageEvents from "./ManageEvents";
import Settings from "./Settings";
import "./Admin.css";

const Admin = ({ onLogout }) => {
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
              <button onClick={onLogout}>Logout</button>
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
