import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  if (loading) return <div className="p-4">Loading events...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Link to={`/events/${event._id}`} key={event._id} className="block">
            <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded mb-2" />
              <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
              <p className="text-gray-600 mb-1">{event.venue?.name}, {event.venue?.city}</p>
              <p className="text-gray-500 mb-2">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
              <p className="mb-2 line-clamp-2">{event.description}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{event.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 