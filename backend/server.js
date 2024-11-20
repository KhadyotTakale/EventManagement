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
  eventImage: { type: String, required: true },
  eventGeoLocation: { type: String, required: true },
  registrations: { type: Number, default: 0 }, // New field for total registrations
  attendees: { type: Number, default: 0 }, // Total attendees
});

//newscheme

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

//eventspage past upcoming

// Endpoint to increment registrations

//newchanegs

// Endpoint to mark attendance
app.post("/api/mark-attendance", async (req, res) => {
  const { entryId } = req.body;

  try {
    const registration = await Registration.findOne({ entryId });

    if (!registration) {
      return res
        .status(404)
        .json({ success: false, message: "Entry not found." });
    }

    if (registration.attended) {
      return res
        .status(400)
        .json({ success: false, message: "Already marked as attended." });
    }

    registration.attended = true;
    await registration.save();

    // Increment the attendees count in the event
    const event = await Event.findByIdAndUpdate(
      registration.eventId,
      { $inc: { attendees: 1 } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully.",
      eventId: registration.eventId,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res
      .status(500)
      .json({ success: false, message: "Error marking attendance." });
  }
});

//registeed candidates

app.post("/api/register", async (req, res) => {
  const { name, entryId, eventId } = req.body;

  try {
    const registration = new Registration({ name, entryId, eventId });
    await registration.save();

    await Event.findByIdAndUpdate(
      eventId,
      { $inc: { registrations: 1 } },
      { new: true }
    );

    res.status(201).json({ message: "Registration saved successfully." });
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ message: "Error saving registration.", error });
  }
});

//registration///
app.post("/api/mark-attendance", async (req, res) => {
  const { entryId } = req.body;

  try {
    const registration = await Registration.findOne({ entryId });

    if (!registration) {
      return res
        .status(404)
        .json({ success: false, message: "Entry not found." });
    }

    if (registration.attended) {
      return res
        .status(400)
        .json({ success: false, message: "Already marked as attended." });
    }

    registration.attended = true;
    await registration.save();

    res
      .status(200)
      .json({ success: true, message: "Attendance marked successfully." });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res
      .status(500)
      .json({ success: false, message: "Error marking attendance." });
  }
});

app.get("/api/event-stats", async (req, res) => {
  try {
    const stats = await Event.find().select(
      "eventName registrations attendees"
    );
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching event stats:", error);
    res.status(500).json({ message: "Error fetching event stats.", error });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
