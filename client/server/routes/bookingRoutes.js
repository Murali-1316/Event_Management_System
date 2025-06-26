const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a booking (protected)
router.post('/', authMiddleware, bookingController.createBooking);

// Get all bookings for a user (protected)
router.get('/user/:userId', authMiddleware, bookingController.getUserBookings);

// Get all bookings for an event (admin, protected)
router.get('/event/:eventId', authMiddleware, bookingController.getEventBookings);

module.exports = router; 