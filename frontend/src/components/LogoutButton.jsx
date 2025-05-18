import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.clear(); // Clear all stored values
    sessionStorage.clear(); // Just in case
    window.location.replace('/'); // ✅ Forces full reload without browser history
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
