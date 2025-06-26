require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Use your MongoDB URI from .env or hardcoded for now
const uri = process.env.MONGO_URI || "mongodb+srv://murali1316:rLhmpWNLOH4BcvZJ@cluster0.8ji869q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Event Management API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 