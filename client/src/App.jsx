import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <nav className="flex items-center justify-between p-4 bg-gray-100 mb-4">
        <Link to="/" className="text-xl font-bold text-blue-700">EventBooker</Link>
        <div className="space-x-4">
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          {user && <Link to="/dashboard" className="text-blue-600 hover:underline">My Bookings</Link>}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        {/* Add more routes here */}
      </Routes>
      
    </Router>
  )
}

export default App
