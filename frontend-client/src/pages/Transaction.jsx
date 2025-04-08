// src/pages/Transaction.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../redux/userSlice';

const Transaction = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const selectedServices = useSelector((state) => state.service.selectedServices);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5005/api/services/transaction',
        {
          userDetails: { name, email, phone, note },
          services: selectedServices
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('✅ Transaction complete:', res.data);

      // Optional: clear Redux state or reset if needed
      dispatch(logout()); // Logout user
      navigate('/'); // Go back to main page
    } catch (error) {
      console.error('❌ Transaction Error:', error.response?.data || error.message);
      alert('Transaction failed');
    }
  };

  return (
    <div>
      <h2>Transaction Page</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
        <br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <br />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
        <br />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Investment Note" />
        <br />
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
};

export default Transaction;