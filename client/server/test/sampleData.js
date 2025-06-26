const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const sampleEvents = [
  {
    title: "Avengers: Secret Wars",
    description: "The epic conclusion to the Marvel multiverse saga brings together heroes from across dimensions.",
    category: "Movie",
    date: "2025-07-15",
    time: "19:00",
    venue: {
      name: "IMAX Cinemas",
      address: "123 Movie Plaza",
      city: "Mumbai"
    },
    pricing: [
      {
        category: "Premium",
        price: 500,
        totalSeats: 100,
        availableSeats: 100
      },
      {
        category: "Standard",
        price: 300,
        totalSeats: 200,
        availableSeats: 200
      }
    ],
    image: "https://example.com/avengers.jpg",
    featured: true
  },
  {
    title: "AR Rahman Live in Concert",
    description: "Experience the magic of AR Rahman's soul-stirring music live in concert.",
    category: "Concert",
    date: "2025-08-20",
    time: "20:00",
    venue: {
      name: "Stadium Arena",
      address: "456 Music Street",
      city: "Bangalore"
    },
    pricing: [
      {
        category: "VIP",
        price: 5000,
        totalSeats: 50,
        availableSeats: 50
      },
      {
        category: "Gold",
        price: 3000,
        totalSeats: 200,
        availableSeats: 200
      }
    ],
    image: "https://example.com/concert.jpg",
    featured: true
  },
  {
    title: "IPL Final 2025",
    description: "The grand finale of Indian Premier League 2025.",
    category: "Sports",
    date: "2025-05-30",
    time: "19:30",
    venue: {
      name: "National Cricket Stadium",
      address: "789 Sports Complex",
      city: "Chennai"
    },
    pricing: [
      {
        category: "Premium Stand",
        price: 8000,
        totalSeats: 1000,
        availableSeats: 1000
      },
      {
        category: "General Stand",
        price: 4000,
        totalSeats: 5000,
        availableSeats: 5000
      }
    ],
    image: "https://example.com/ipl.jpg",
    featured: true
  }
];

// Function to add sample events
async function addSampleEvents() {
  try {
    for (const event of sampleEvents) {
      const response = await axios.post(`${API_URL}/events`, event);
      console.log(`Added event: ${event.title}`);
      console.log('Response:', response.data);
    }
    console.log('All sample events added successfully!');
  } catch (error) {
    console.error('Error adding sample events:', error.response ? error.response.data : error.message);
  }
}

// Run the function
addSampleEvents(); 