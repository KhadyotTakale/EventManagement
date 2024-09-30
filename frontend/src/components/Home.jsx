import React from "react";
import "./Home.css";
import event from "../assets/event1.png";
import logo from "../assets/logo.png";
import gps from "../assets/gps.png";

const Home = () => {
  const getFormattedMonth = () => {
    const date = new Date();
    return date.toLocaleString("default", { month: "short" }).toUpperCase(); // e.g., 'AUG'
  };
  const getFormattedDate = () => {
    const date = new Date();
    return date.getDate(); // e.g., '26'
  };
  return (
    <div>
      <div className="main">
        <div className="left">
          <img className="event" src={event} alt="Event" />
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
                <div className="month">{getFormattedMonth()}</div>
                <div className="day">{getFormattedDate()}</div>
              </div>
              <div className="event-details">
                <p>Thursday, October 3</p>
                <p>2:00 PM - 6:00 PM</p>
              </div>
            </div>
            <div className="gps">
              <img src={gps} alt="GPS" />
              <div className="location-details">
                <p>Elegant Office</p>
                <p>Pune, Maharashtra</p>
              </div>
            </div>
            <div className="about-event">
              <a
                href="https://ciiwrevents.in/NexGenMobilityShow2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-event-link"
              >
                About Event
              </a>
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
          <p>
            A/B, Dattaprasad, 1st Floor Laxmi Park, Near Bhide Hospital, 722,
            Navi Peth
            <br /> Pune, Maharashtra 411030, India
          </p>
          <div>
            <iframe
              className="map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5343313206986!2d73.8433034!3d18.5047407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c00ab847bcb1%3A0xa2fbe9f04f278599!2sElegant%20Enterprises!5e0!3m2!1sen!2sus!4v1727681056576!5m2!1sen!2sus"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
