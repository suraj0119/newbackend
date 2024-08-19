const Event = require('../models/Event');
const { upload } = require('../config/multerConfig');

// Create an event
exports.createEvent = async (req, res) => {
  const { title, description, date, capacity, price } = req.body;

  try {
    const newEvent = new Event({ title, description, date, capacity, price });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get events created by a specific user
exports.getEventsByUser = async (req, res) => {
  try {
    const events = await Event.find({ creator: req.params.userId });
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is sold out' });
    }

    event.attendees.push(userId);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cancel an event
exports.cancelEvent = async (req, res) => {
  const { eventId } = req.body;

  try {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event cancelled successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
