const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get all events and create new event
router.route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

// Get featured events
router.get('/featured', eventController.getFeaturedEvents);

// Get events by category
router.get('/category/:category', eventController.getEventsByCategory);

// Get, update and delete event by ID
router.route('/:id')
  .get(eventController.getEventById)
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router; 