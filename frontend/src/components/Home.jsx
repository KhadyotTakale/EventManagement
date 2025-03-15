import React, { useState, useEffect } from "react";
import "./Home.css";
import event from "../assets/event1.png";
import logo from "../assets/logo.png";
import gps from "../assets/gps.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    loggedIn: false,
  });
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }

    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          "https://eventmanagement-backend-31sh.onrender.com/api/event",
          { timeout: 5000 } // Timeout after 5 seconds
        );
        console.log("Fetched event data:", res.data);
        setEventData(res.data);
      } catch (err) {
        console.error("Failed to fetch event data:", err);
      }
    };

    fetchEvent();

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser || { name: "", email: "", loggedIn: false });
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!eventData) return <p>Loading...</p>;

  const {
    eventName,
    eventDate,
    eventTime,
    eventLocation,
    eventImage,
    eventGeoLocation,
  } = eventData;

  const getFormattedMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short" }).toUpperCase();
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <div>
      <div className="main">
        <div className="left">
          <img className="event" src={eventImage} alt={eventName} />
          <p>Hosted By</p>
          <hr />
          <div className="host">
            <img className="hostedby" src={logo} alt="Host Logo" />
            <p>Elegant Enterprises</p>
          </div>
        </div>
        <div className="right">
          <div className="heading">
            <p>
              Experience unforgettable moments with Elegant Enterprises, where
              every event is a masterpiece.
            </p>
            <div className="date-container">
              <div className="date-box">
                <div className="month">{getFormattedMonth(eventDate)}</div>
                <div className="day">{getFormattedDate(eventDate)}</div>
              </div>
              <div className="event-details">
                <p>
                  {new Date(eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>{eventTime}</p>
              </div>
            </div>
            <div className="gps">
              <img src={gps} alt="GPS" />
              <div className="location-details">
                <p>{eventLocation}</p>
              </div>
            </div>
            <div className="buttons">
              <a
                href="https://ciiwrevents.in/NexGenMobilityShow2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-event-link"
              >
                About Event
              </a>
              {user.loggedIn && (
                <Link to="/pass" className="nav-link">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="get-pass-event"
                  >
                    Get Pass
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="venue">
        <div className="location">
          <p>Location</p>
          <hr />
        </div>
        <div className="map">
          <p>{eventLocation}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: eventGeoLocation,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
