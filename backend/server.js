const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Event Schema and Model
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  hostLogo: { type: String, required: true },
  eventImage: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  locationName: { type: String, required: true },
  address: { type: String, required: true },
  mapEmbedURL: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Fetch Event Details
app.get("/event", async (req, res) => {
  try {
    const event = await Event.findOne();
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update Event Details
app.put("/event/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a New Event (Optional)
app.post("/event", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
