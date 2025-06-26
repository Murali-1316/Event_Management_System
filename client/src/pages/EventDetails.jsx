import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
        if (res.data.pricing.length > 0) setCategory(res.data.pricing[0].category);
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError(null);
    setBookingSuccess(null);
    try {
      await api.post(
        '/bookings',
        { eventId: id, category, quantity: Number(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookingSuccess('Booking successful!');
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading event...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!event) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={event.image} alt={event.title} className="w-full md:w-1/2 h-80 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-1">{event.venue?.name}, {event.venue?.city}</p>
          <p className="text-gray-500 mb-2">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
          <p className="mb-2">{event.description}</p>
          <div className="mb-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{event.category}</span>
            {event.featured && <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Featured</span>}
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Pricing:</h2>
            <ul>
              {event.pricing.map((p) => (
                <li key={p.category} className="mb-1">
                  <span className="font-medium">{p.category}:</span> ₹{p.price} &mdash; {p.availableSeats} seats left
                </li>
              ))}
            </ul>
          </div>
          {/* Booking form */}
          <div className="mt-4 p-4 bg-gray-100 rounded">
            {user && token ? (
              <form onSubmit={handleBooking} className="space-y-3">
                <div>
                  <label className="block mb-1 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    {event.pricing.map((p) => (
                      <option key={p.category} value={p.category}>{p.category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={event.pricing.find(p => p.category === category)?.availableSeats || 1}
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Booking...' : 'Book Now'}
                </button>
                {bookingError && <div className="text-red-500 text-sm">{bookingError}</div>}
                {bookingSuccess && <div className="text-green-600 text-sm">{bookingSuccess}</div>}
              </form>
            ) : (
              <div>
                <span className="text-gray-700">Please </span>
                <button className="text-blue-600 underline" onClick={() => navigate('/login')}>log in</button>
                <span className="text-gray-700"> to book tickets.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 