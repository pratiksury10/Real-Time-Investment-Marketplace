import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProposalForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    fundingGoal: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5005/api/proposals', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Proposal submitted!');
      navigate('/founder-dashboard');
    } catch (err) {
      console.error('Error submitting proposal:', err);
      alert('Failed to submit proposal');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Investment Proposal</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          style={styles.textarea}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="number"
          name="fundingGoal"
          placeholder="Funding Goal"
          value={form.fundingGoal}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: '#ecfccb',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#166534',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '500px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    height: '100px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default ProposalForm;