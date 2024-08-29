import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeNav from "./HomeNav";
import './SignIn.css';  // Import the new CSS file

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      alert("Invalid Username");
      return;
    }
    if (!password) {
      alert("Invalid Password");
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/sessions',
        { username: username, password: password },
        { withCredentials: true }
      );
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/notes');
    } catch (error) {
      alert("Invalid Credentials");
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <>
      <HomeNav />
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h3 className="signin-title">Sign In</h3>
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
