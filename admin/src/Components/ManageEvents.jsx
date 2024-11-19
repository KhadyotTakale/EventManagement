import React from "react";
import "./ManageEvents.css";

const ManageEvents = () => {
  return (
    <form className="admin-form">
      <h1>Update Event Details</h1>
      <div className="form-group">
        <label>Event Image URL:</label>
        <input type="text" placeholder="Enter image URL" />
      </div>
      <div className="form-group">
        <label>Event Date:</label>
        <input type="date" />
      </div>
      <div className="form-group">
        <label>Event Time:</label>
        <input type="time" />
      </div>
      <div className="form-group">
        <label>Event Location:</label>
        <textarea placeholder="Enter event location"></textarea>
      </div>
      <button type="submit" className="submit-btn">
        Save Changes
      </button>
    </form>
  );
};

export default ManageEvents;
