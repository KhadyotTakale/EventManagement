import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Events.css"; // Add your CSS file for styling

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://eventmanagement-backend-31sh.onrender.com/events"
        );
        const events = res.data;

        // Debugging: Log fetched events
        console.log("Fetched events:", events);

        // Sort events by event date (descending order)
        const sortedEvents = events.sort(
          (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
        );

        // Get current date
        const now = new Date();

        // Filter upcoming events and pick the most recently updated one
        const upcomingEvents = sortedEvents.filter(
          (event) => new Date(event.eventDate) >= now
        );
        console.log("Upcoming events:", upcomingEvents);

        const latestUpcomingEvent =
          upcomingEvents.length > 0 ? upcomingEvents[0] : null;

        // Filter past events and limit to a maximum of 3
        const past = sortedEvents
          .filter((event) => new Date(event.eventDate) < now)
          .slice(0, 3); // Limit to the first 3 most recent past events

        console.log("Past events (up to 3):", past);

        // Set state
        setUpcomingEvent(latestUpcomingEvent);
        setPastEvents(past);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="events-container">
      <h1>Events</h1>
      <div className="tabs">
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={activeTab === "past" ? "active" : ""}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>
      <div className="events-list">
        {activeTab === "upcoming" && upcomingEvent && (
          <div className="event-card">
            <img src={upcomingEvent.eventImage} alt={upcomingEvent.eventName} />
            <h3>{upcomingEvent.eventName}</h3>
            <p>{formatDate(upcomingEvent.eventDate)}</p>
            <p>{upcomingEvent.eventTime}</p>
          </div>
        )}
        {activeTab === "upcoming" && !upcomingEvent && (
          <p>No upcoming events found.</p>
        )}

        {activeTab === "past" &&
          pastEvents.length > 0 &&
          pastEvents.map((event, index) => (
            <div key={index} className="event-card">
              <img src={event.eventImage} alt={event.eventName} />
              <h3>{event.eventName}</h3>
              <p>{formatDate(event.eventDate)}</p>
              <p>{event.eventTime}</p>
            </div>
          ))}
        {activeTab === "past" && pastEvents.length === 0 && (
          <p>No past events found.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
