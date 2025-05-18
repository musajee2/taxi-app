import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  // 🔁 Every time location changes, check role again
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/user-dashboard"
        element={role === 'user' ? <UserDashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/admin-dashboard"
        element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
