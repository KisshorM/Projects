import React, { useState } from 'react';
import Admin from "./Admin";
import Student from "./Student";
import Signup from './Signup';
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === "Admin" && password === "ssn") {
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else if (password === username) {
      setIsLoggedIn(true);
      setIsAdmin(false);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setRegistrationSuccess(false);
    setUsername("");
    setPassword("");
  };

  const handleSignupSuccess = () => {
    setRegistrationSuccess(true);
    setShowSignup(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        {isAdmin ? <Admin /> : <Student regNo={username} />}
      </div>
    );
  }

  return (
    <div className="login-container">
      {showSignup ? (
        <Signup 
          onSuccess={handleSignupSuccess} 
          onSwitchToLogin={toggleSignup} 
        />
      ) : (
        <>
          <h2>Login</h2>
          {registrationSuccess && (
            <div className="success-message">
              Registration successful! Please login with your credentials.
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button><br></br>
          </form>
          <button onClick={toggleSignup} className="toggle-btn">
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}

export default App;