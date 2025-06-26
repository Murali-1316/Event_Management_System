const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Movie', 'Concert', 'Theatre', 'Sports', 'Other']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  venue: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  pricing: [{
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    totalSeats: {
      type: Number,
      required: true
    },
    availableSeats: {
      type: Number,
      required: true
    }
  }],
  image: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema); 