import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./Dashboard.css";

const Dashboard = () => {
  const [eventStats, setEventStats] = useState([]);
  const [uniqueCode, setUniqueCode] = useState("");
  const [message, setMessage] = useState("");
  const [totalRegistered, setTotalRegistered] = useState(0);
  const [totalAttended, setTotalAttended] = useState(0);

  useEffect(() => {
    const fetchEventStats = async () => {
      const res = await axios.get(
        "https://eventmanagement-backend-31sh.onrender.com/api/event-stats"
      );
      updateEventStats(res.data);
    };

    fetchEventStats();

    // Add event listener for registration updates
    const handleUpdate = () => {
      fetchEventStats(); // Refetch the data when a new registration is recorded
    };

    window.addEventListener("registrationUpdated", handleUpdate);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener("registrationUpdated", handleUpdate);
    };
  }, []);

  const updateEventStats = (data) => {
    setEventStats(data);

    // Calculate totals for all events
    const totalReg = data.reduce((sum, event) => sum + event.registrations, 0);
    const totalAtt = data.reduce((sum, event) => sum + event.attendees, 0);
    setTotalRegistered(totalReg);
    setTotalAttended(totalAtt);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://eventmanagement-backend-31sh.onrender.com/api/mark-attendance",
        {
          entryId: uniqueCode,
        }
      );

      if (res.data.success) {
        setMessage("Entry marked successfully!");
        setEventStats((prevStats) => {
          return prevStats.map((event) => {
            if (event._id === res.data.eventId) {
              return {
                ...event,
                attendees: event.attendees + 1,
              };
            }
            return event;
          });
        });
        setTotalAttended((prev) => prev + 1); // Increment total attendees
      } else {
        setMessage(res.data.message || "Error marking entry.");
      }
    } catch (error) {
      console.error("Error marking entry:", error);
      setMessage("Error: Could not mark entry.");
    }
  };

  const data = {
    labels: eventStats.map((event) => event.eventName),
    datasets: [
      {
        label: "Registered",
        data: eventStats.map((event) => event.registrations),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Attended",
        data: eventStats.map((event) => event.attendees),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Event Dashboard</h1>

      {/* Total Counts */}
      <div className="totals">
        <p>Total Registered: {totalRegistered}</p>
        <p>Total Attended: {totalAttended}</p>
      </div>

      {/* Console for Marking Entries */}
      <div className="console">
        <h2>Mark Attendance</h2>
        <form onSubmit={handleCodeSubmit}>
          <input
            type="text"
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
            placeholder="Enter Unique Code"
            required
          />
          <button type="submit">Mark Entry</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      {/* Graph */}
      <div className="graph-section">
        <h2>Event Statistics</h2>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
