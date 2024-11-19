import React, { useState } from "react";
import axios from "axios";
import "./ManageEvents.css";

const ManageEvents = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventImage: "",
    eventGeoLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/events", formData);
      alert("Event has been added successfully!");
      setFormData({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        eventImage: "",
        eventGeoLocation: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    }
  };

  return (
    <div>
      <h2>Manage Events</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Event Date:</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Event Time:</label>
          <input
            type="time"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Event Location:</label>
          <input
            type="text"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Event Image (URL):</label>
          <input
            type="text"
            name="eventImage"
            value={formData.eventImage}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Event Geo Location (Embed URL):</label>
          <input
            type="text"
            name="eventGeoLocation"
            value={formData.eventGeoLocation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default ManageEvents;
