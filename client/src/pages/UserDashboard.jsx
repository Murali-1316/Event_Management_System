import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    const fetchBookings = async () => {
      try {
        const res = await api.get(`/bookings/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user, token, navigate]);

  if (loading) return <div className="p-4">Loading your bookings...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-gray-600">You have no bookings yet.</div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg">{booking.event?.title}</div>
                <div className="text-gray-600">{booking.event?.venue?.name}, {booking.event?.venue?.city}</div>
                <div className="text-gray-500 text-sm">{new Date(booking.event?.date).toLocaleDateString()} at {booking.event?.time}</div>
                <div className="text-sm mt-1">Category: <span className="font-medium">{booking.category}</span></div>
                <div className="text-sm">Quantity: <span className="font-medium">{booking.quantity}</span></div>
                <div className="text-sm">Total: <span className="font-medium">₹{booking.totalPrice}</span></div>
              </div>
              <div className="text-xs text-gray-400 mt-2 md:mt-0">Booked on {new Date(booking.bookedAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard; 