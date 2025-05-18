import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  const token = localStorage.getItem('token');

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:4000/api/bookings', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(res.data);
  };

  const createBooking = async (e) => {
    e.preventDefault();
    await axios.post(
      'http://localhost:4000/api/bookings',
      { pickupLocation, dropoffLocation },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPickupLocation('');
    setDropoffLocation('');
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    await axios.delete(`http://localhost:4000/api/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
        <h2>User Dashboard</h2>
        <LogoutButton />

      <h2>User Dashboard</h2>
      <form onSubmit={createBooking}>
        <input value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} placeholder="Pickup" required />
        <input value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} placeholder="Dropoff" required />
        <button type="submit">Book</button>
      </form>

      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            {b.pickupLocation} → {b.dropoffLocation} ({b.status})
            <button onClick={() => deleteBooking(b._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
