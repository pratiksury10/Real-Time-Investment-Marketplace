// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Real-Time Investment Marketplace 🚀</h1>
      <p style={styles.text}>Connect Startup Founders with Investors in real-time.</p>
      <div style={styles.buttonGroup}>
        <Link to="/login"><button style={styles.button}>Login</button></Link>
        <Link to="/register"><button style={styles.button}>Register</button></Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #3498db, #8e44ad)', 
    color:'white',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#1e293b',
    textAlign: 'center',
  },
  text: {
    fontSize: '1.1rem',
    color: '#475569',
    marginBottom: '2rem',
    textAlign: 'center',
    maxWidth: '600px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
  }
};

export default Home;
