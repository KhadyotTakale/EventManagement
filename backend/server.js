require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB using .env
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Connection Failed:", err));

// Event Schema
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventImage: { type: String, required: true },
  eventGeoLocation: { type: String, required: true },
  registrations: { type: Number, default: 0 },
  attendees: { type: Number, default: 0 },
});

const Event = mongoose.model("Event", eventSchema);

// Registration Schema
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  entryId: { type: String, unique: true, required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  attended: { type: Boolean, default: false },
});

const Registration = mongoose.model("Registration", registrationSchema);

// Create Event
app.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res
      .status(201)
      .json({ message: "✅ Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "❌ Error creating event", error });
  }
});

// Get All Events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching events", error });
  }
});

// Get Most Recent Event
app.get("/api/event", async (req, res) => {
  try {
    const event = await Event.findOne().sort({ _id: -1 });
    if (!event) return res.status(404).json({ message: "❌ No event found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching event", error });
  }
});

// Register for Event
app.post("/api/register", async (req, res) => {
  try {
    const { name, entryId, eventId } = req.body;
    const registration = new Registration({ name, entryId, eventId });
    await registration.save();
    await Event.findByIdAndUpdate(eventId, { $inc: { registrations: 1 } });
    res.status(201).json({ message: "✅ Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving registration", error });
  }
});

// Mark Attendance
app.post("/api/mark-attendance", async (req, res) => {
  try {
    const { entryId } = req.body;
    const registration = await Registration.findOne({ entryId });

    if (!registration)
      return res
        .status(404)
        .json({ success: false, message: "❌ Entry not found." });
    if (registration.attended)
      return res
        .status(400)
        .json({ success: false, message: "⚠️ Already marked as attended." });

    registration.attended = true;
    await registration.save();

    await Event.findByIdAndUpdate(registration.eventId, {
      $inc: { attendees: 1 },
    });

    res
      .status(200)
      .json({ success: true, message: "✅ Attendance marked successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "❌ Error marking attendance." });
  }
});

// Get Event Statistics
app.get("/api/event-stats", async (req, res) => {
  try {
    const stats = await Event.find().select(
      "eventName registrations attendees"
    );
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching event stats", error });
  }
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
