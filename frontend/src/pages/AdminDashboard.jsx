import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const [userRes, bookingRes] = await Promise.all([
      axios.get('http://localhost:4000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get('http://localhost:4000/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);
    setUsers(userRes.data);
    setBookings(bookingRes.data);
  };

  const updateStatus = async (bookingId, newStatus) => {
    await axios.put(
      `http://localhost:4000/api/admin/bookings/${bookingId}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
        <h2>Admin Dashboard</h2>
            <LogoutButton />

      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.email} ({user.role})</li>
        ))}
      </ul>

      <h3>Bookings</h3>
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            {b.userId?.email || 'N/A'}: {b.pickupLocation} → {b.dropoffLocation} [{b.status}]
            <select
              defaultValue=""
              onChange={(e) => updateStatus(b.bookingId, e.target.value)}
            >
              <option value="" disabled>Update status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
