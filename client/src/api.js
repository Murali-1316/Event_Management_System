import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch all events
export const fetchEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

// You can add more API functions here (fetchEventById, register, login, bookEvent, etc.)

export default api; 