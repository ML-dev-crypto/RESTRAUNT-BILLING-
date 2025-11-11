import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials
  const credentials = {
    admin: { password: 'admin123', role: 'admin' },
    employee: { password: 'emp123', role: 'employee' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      const user = credentials[username.toLowerCase()];
      
      if (user && user.password === password) {
        onLogin({
          username: username,
          role: user.role
        });
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleDemoLogin = (demoUsername, demoPassword) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>

      <div className="login-box">
        <div className="login-header">
          <div className="login-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#ff8c42">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
            </svg>
          </div>
          <h1>Restaurant Billing</h1>
          <p>Sign in to continue</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials (Click to autofill):</p>
          <div className="demo-cards">
            <button 
              type="button"
              className="demo-card"
              onClick={() => handleDemoLogin('admin', 'admin123')}
            >
              <span className="demo-role">Admin</span>
              <span className="demo-user">admin / admin123</span>
              <span className="click-hint">Click to autofill</span>
            </button>
            <button 
              type="button"
              className="demo-card"
              onClick={() => handleDemoLogin('employee', 'emp123')}
            >
              <span className="demo-role">Employee</span>
              <span className="demo-user">employee / emp123</span>
              <span className="click-hint">Click to autofill</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
