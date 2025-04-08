import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/users/login', {
        email, password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      // ✅ Destructure directly from res.data
      const token = res.data.token;
      const emailFromServer = res.data.email;
      const role = res.data.role;

      localStorage.setItem('token', token);
      localStorage.setItem('email', emailFromServer);
      localStorage.setItem('role', role);

      console.log('✅ Login Success:', res.data);

      if (role === 'founder') navigate('/founder-dashboard');
      else if (role === 'investor') navigate('/investor-dashboard');
      else navigate('/dashboard');

    } catch (error) {
      console.error('❌ Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
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
          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>
        </form>
        <div style={styles.textCenter}>
          <p style={styles.text}>
            Don't have an account? <a href="/register" style={styles.link}>Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #1e3c72, #2a5298)',
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
    focusOutline: 'none',
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

export default Login;









