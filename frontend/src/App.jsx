import React from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Events from "./components/Events";
import Pass from "./components/Pass";
import Login from "./components/Login";

const Layout = ({ children }) => {
  const location = useLocation();

  const showNavbar = location.pathname !== "/login";

  return (
    <div>
      {showNavbar && <Navbar />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/pass" element={<Pass />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
