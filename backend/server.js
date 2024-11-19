const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://elegantpvt:elegant123@cluster0.woxtf.mongodb.net/myDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error("Connection failed:", err));

// Create a schema for events
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventImage: { type: String, required: true }, // New field for image URL
  eventGeoLocation: { type: String, required: true }, // New field for embedded geo location
});

// Create a model for the event
const Event = mongoose.model("Event", eventSchema);

// Create an endpoint to add a new event
app.post("/events", async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventImage,
      eventGeoLocation,
    } = req.body;
    const newEvent = new Event({
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventImage,
      eventGeoLocation,
    });
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ message: "Error creating event", error });
  }
});

// Create an endpoint to fetch all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

//home.jsx get

// Fetch the most recent event
app.get("/api/event", async (req, res) => {
  try {
    // Sort by creation date in descending order and get the first document
    const event = await Event.findOne().sort({ _id: -1 }); // Sort by `_id` works as it increments with time
    if (!event) {
      return res.status(404).json({ message: "No event found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Error fetching event", error });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
