const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate } = require('../middleware/authMiddleware');

// Create an event
router.post('/', authenticate, eventController.createEvent);

// Get all events
router.get('/', authenticate, eventController.getAllEvents);

// Get events by user
router.get('/user/:userId', authenticate, eventController.getEventsByUser);

// Register for an event
router.post('/register', authenticate, eventController.registerForEvent);

// Cancel an event
router.delete('/cancel', authenticate, eventController.cancelEvent);

module.exports = router;
