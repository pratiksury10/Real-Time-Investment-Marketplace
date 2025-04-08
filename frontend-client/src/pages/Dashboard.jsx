// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'founder') {
      navigate('/founder');
    } else if (role === 'investor') {
      navigate('/investor');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div>Redirecting to your dashboard...</div>;
};

export default Dashboard;
