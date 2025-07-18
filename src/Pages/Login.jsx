import React, { useState } from 'react';
import '../assets/CSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    if (!user) {
      setAlertMsg('User not found');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
      return;
    }
    if (user.password !== password) {
      setAlertMsg('Invalid password');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
      return;
    }
    localStorage.setItem('loggedInEmail', email);
    navigate('/home');
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card p-4 rounded bg-transparent w-100" style={{maxWidth: 400}}>
        <h2 className="text-center mb-4" style={{fontWeight: 600}}>Login</h2>
        {showAlert && (
          <div className="alert alert-danger text-center" role="alert">
            {alertMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control border-1 border-dark bg-transparent"
              id="email"
              placeholder="Enter your Email Id"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control border-1 border-dark bg-transparent"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <Link to="/register" className="text-decoration-none register-link  mx-auto d-block text-center fs-6 text-dark">Don't have an account? Register here</Link>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn w-50 d-block mx-auto" style={{background: '#d9f24b', color: '#222', fontWeight: 600, fontSize: '1.1rem'}}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login