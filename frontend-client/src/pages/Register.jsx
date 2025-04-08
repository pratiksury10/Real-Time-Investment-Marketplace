import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5005/api/users/register', {
        email, password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('✅ Register Success:', res.data);

      navigate('/login'); // After successful registration, redirect to Login page

    } catch (error) {
      console.error('❌ Register Error:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={styles.input}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={styles.input}
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
          >
            Register
          </button>
        </form>
        <div style={styles.textCenter}>
          <p style={styles.text}>
            Already have an account? <a href="/login" style={styles.link}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #8e44ad, #3498db)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    transition: '0.2s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3498db',
    color: 'white',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  textCenter: {
    textAlign: 'center',
    marginTop: '16px',
  },
  text: {
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#3498db',
    textDecoration: 'underline',
  },
};

export default Register;
