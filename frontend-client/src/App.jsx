// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import FounderDashboard from './pages/FounderDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import Unauthorized from './pages/Unauthorized'; // optional
import PrivateRoute from './components/PrivateRoute';
import ProposalForm from './pages/ProposalForm'; // 👈 Add this import

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={['founder', 'investor']}>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/founder-dashboard"
        element={
          <PrivateRoute allowedRoles={['founder']}>
            <FounderDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/investor-dashboard"
        element={
          <PrivateRoute allowedRoles={['investor']}>
            <InvestorDashboard />
          </PrivateRoute>
        }
      />

      {/* ✅ New Protected Route for Proposal Form */}
      <Route
        path="/create-proposal"
        element={
          <PrivateRoute allowedRoles={['founder']}>
            <ProposalForm />
          </PrivateRoute>
        }
      />

      {/* Optional Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default App;