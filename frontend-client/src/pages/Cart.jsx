// src/pages/Cart.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const selectedServices = useSelector((state) => state.service.selectedServices);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5005/api/services/submit',
        { services: selectedServices },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('✅ Submitted:', res.data);
      navigate('/transaction'); // go to next step
    } catch (error) {
      console.error('❌ Submission error:', error.response?.data || error.message);
      alert('Failed to submit services');
    }
  };

  return (
    <div>
      <h2>Your Selected Services</h2>
      <ul>
        {selectedServices.map((service, index) => (
          <li key={index}>{service.name}</li>
        ))}
      </ul>
      {selectedServices.length > 0 ? (
        <button onClick={handleConfirm}>Confirm & Submit</button>
      ) : (
        <p>No services selected.</p>
      )}
    </div>
  );
};

export default Cart;