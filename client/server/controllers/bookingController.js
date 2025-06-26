const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { eventId, category, quantity } = req.body;
    const userId = req.user?.userId;

    // Find event and pricing
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const priceCategory = event.pricing.find(p => p.category === category);
    if (!priceCategory) return res.status(400).json({ message: 'Invalid category' });
    if (priceCategory.availableSeats < quantity) return res.status(400).json({ message: 'Not enough seats available' });

    // Calculate total price
    const totalPrice = priceCategory.price * quantity;

    // Create booking
    const booking = new Booking({
      user: userId,
      event: eventId,
      category,
      quantity,
      totalPrice
    });
    await booking.save();

    // Update available seats
    priceCategory.availableSeats -= quantity;
    await event.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.userId;
    const bookings = await Booking.find({ user: userId }).populate('event');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get all bookings for an event (admin)
exports.getEventBookings = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const bookings = await Booking.find({ event: eventId }).populate('user');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event bookings', error: error.message });
  }
}; 