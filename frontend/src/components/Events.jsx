import React, { useState } from "react";
import "./Events.css";

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = [
    {
      id: 1,
      title: "Event 1",
      date: "2024-10-10",
      location: "New York",
      guests: 10,
    },
    {
      id: 2,
      title: "Event 2",
      date: "2024-11-15",
      location: "Los Angeles",
      guests: 20,
    },
    {
      id: 3,
      title: "Event 3",
      date: "2024-12-20",
      location: "Chicago",
      guests: 30,
    },
  ];

  const pastEvents = [
    {
      id: 1,
      title: "Event A",
      date: "2024-08-10",
      location: "Boston",
      guests: 5,
    },
    {
      id: 2,
      title: "Event B",
      date: "2024-07-15",
      location: "San Francisco",
      guests: 15,
    },
    {
      id: 3,
      title: "Event C",
      date: "2024-06-20",
      location: "Seattle",
      guests: 25,
    },
  ];

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
        {activeTab === "upcoming" && upcomingEvents.length === 0 && (
          <div className="no-events">
            <img src="path/to/your/image.png" alt="No Upcoming Events" />
            <p>No Upcoming Events</p>
            <button className="create-event">+ Create Event</button>
          </div>
        )}
        {activeTab === "upcoming" &&
          upcomingEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>Guests: {event.guests}</p>
            </div>
          ))}
        {activeTab === "past" &&
          pastEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>Guests: {event.guests}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Events;
