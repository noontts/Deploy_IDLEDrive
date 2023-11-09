const Event = require("./event.model");
const EventImages = require("./eventImage.model");
// Create a new event
const createEvent = async (eventData, eventImages) => {
  const eventImagesURL = [];
  const events = await Event.create(eventData);

  if (eventImages) {
    for (const file of eventImages) {
      await EventImages.create({
        imageURL: file.filename,
        event_Id: events.id,
      });

      eventImagesURL.push(file.filename);
    }
  }

  return { events, eventImagesURL };
};

// Get all events
const getAllEvents = async () => {
  const allEvents = await Event.findAll({
    attributes: ["id", "eventName", "eventDate", "eventTime", "locationName"],
    include: [
      {
        model: EventImages,
        attributes: ["imageURL"],
      },
    ],
  });
  return allEvents;
};

// Get event by ID
const getEventById = async (eventId) => {
  return await Event.findByPk(eventId, {
    include: [
      {
        model: EventImages,
        attributes: ["imageURL"],
      },
    ],
  });
};

// Update event by ID
const updateEvent = async (eventId, eventData) => {
  const event = await Event.findByPk(eventId);
  if (!event) {
    return null;
  }

  for (const key in eventData) {
    event[key] = eventData[key];
  }

  await event.save();
  return event;
};

// Delete event by ID
const deleteEvent = async (eventId) => {
  const event = await Event.findByPk(eventId);
  if (event) {
    await event.destroy();
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
