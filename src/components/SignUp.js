import React, { useState } from 'react';
import axios from 'axios';
import HomeNav from './HomeNav';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the new CSS file

function SignUp() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      alert("Invalid Username");
      return;
    }
    if (!name) {
      alert("Invalid Display name");
      return;
    }
    if (!password) {
      alert("Invalid Password");
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/registrations',
        { username: username, name: name, password: password },
        { withCredentials: true }
      );
      navigate('/signin');
      alert("You have successfully signed up, please login to continue");
    } catch (error) {
      alert("Username already exists, Try a different username");
      console.error(error);
    }
  };

  return (
    <>
      <HomeNav />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 className="signup-title">Sign Up</h3>
          <div className="input-group flex-nowrap mb-3">
            <span className="input-group-text" id="addon-wrapping">@</span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Display Name</span>
            <input
              type="text"
              aria-label="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
