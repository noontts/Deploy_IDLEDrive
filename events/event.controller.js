const express = require("express");
const router = express.Router();
const eventsService = require("./events.service");
const { uploadImage } = require("../config/multerConfig");

// Create a new event
router.post(
  "/events",
  uploadImage.array("eventImages", 3),
  async (req, res) => {
    try {
      console.log(req.body.eventData);
      console.log(req.files);
      const eventData = JSON.parse(req.body.eventData);
      const eventImages = req.files;

      if (!eventData) {
        return res.status(400).json({ error: "event data is required" });
      }

      const { events, eventImagesURL } = await eventsService.createEvent(
        eventData,
        eventImages
      );

      res.status(201).json({
        message: "event created successfully",
        event: events,
        eventIMG: eventImagesURL,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await eventsService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get event by ID
router.get("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await eventsService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update event by ID
router.put("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const eventData = req.body;

    if (!eventData) {
      return res.status(400).json({ error: "Event data is required" });
    }

    const updatedEvent = await eventsService.updateEvent(eventId, eventData);

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete event by ID
router.delete("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    await eventsService.deleteEvent(eventId);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
