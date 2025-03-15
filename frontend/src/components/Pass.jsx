import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import eventImage from "../assets/event1.png"; // This can be dynamic if you pull from event data
import axios from "axios";
import "./Pass.css";

const Pass = () => {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });
  const [eventData, setEventData] = useState(null); // New state for event data
  const [entryId, setEntryId] = useState(""); // New state to store entry ID
  const passRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          "https://eventmanagement-backend-31sh.onrender.com/events"
        );
        console.log("Fetched event data for Pass page:", res.data); // Debug log
        setEventData(res.data);

        // Automatically set the date in formData to the latest event date
        if (res.data && res.data.eventDate) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            date: res.data.eventDate,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch event data for Pass page:", err);
      }
    };

    fetchEvent();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePass = (e) => {
    e.preventDefault();
    const newEntryId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setEntryId(newEntryId); // Generate and set the entry ID
    setShowForm(false);
  };

  const downloadPass = async () => {
    if (passRef.current) {
      html2canvas(passRef.current).then(async (canvas) => {
        const link = document.createElement("a");
        link.download = "event_pass.png";
        link.href = canvas.toDataURL();
        link.click();

        try {
          const saveResponse = await axios.post(
            "http://localhost:4000/api/register",
            {
              name: formData.name,
              entryId,
              eventId: eventData._id,
            }
          );
          console.log("Registration saved successfully.");

          // Notify any listener or update global state here
          // For example, using a simple event bus or a state management library
          window.dispatchEvent(new CustomEvent("registrationUpdated"));
        } catch (error) {
          console.error("Error saving registration:", error);
        }
      });
    }
  };

  const resetForm = () => {
    setShowForm(true);
    setFormData({ name: "", date: eventData?.eventDate || "" });
    setEntryId(""); // Reset entry ID
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container">
      {showForm ? (
        <form onSubmit={generatePass} className="input-form">
          <h2>Enter Pass Details</h2>
          <div className="input-group">
            <label className="n-me" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="input-group">
            <label className="n-me" htmlFor="date">
              Date
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formatDate(formData.date)}
              disabled
              required
            />
          </div>
          <button type="submit" className="generate-btn">
            Generate Pass
          </button>
        </form>
      ) : (
        <div className="pass-wrapper">
          <div className="pass-container" ref={passRef}>
            <div className="ticket">
              <div className="ticket-left">
                <div className="event-info">
                  <h2>{formData.name}</h2>
                  <p className="pass-date">{formatDate(formData.date)}</p>
                </div>
                <div className="ticket-id">
                  <p>Entry ID: {entryId}</p> {/* Display Entry ID */}
                </div>
              </div>
              <div className="ticket-right">
                <QRCodeSVG
                  value={`Name: ${formData.name}, Date: ${formData.date}, Entry ID: ${entryId}`}
                />{" "}
                {/* QR code includes Entry ID */}
              </div>
            </div>
          </div>

          {/* Add the buttons here */}
          <div className="button-group">
            <button onClick={downloadPass} className="download-btn">
              Download Pass
            </button>
            <button onClick={resetForm} className="reset-btn">
              Create New Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pass;
