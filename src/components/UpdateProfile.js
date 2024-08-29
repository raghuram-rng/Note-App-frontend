import { useState } from "react";
import NotesNav from "./NotesNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './UpdateProfile.css'; // Import the CSS file

function UpdateProfile() {
  const userLocal = localStorage.getItem('user');
  const userObject = JSON.parse(userLocal);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    name: userObject.name,
    password: '',
    new_password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(user.name === '') {
      alert(`Display Name can't be nil`);
      return;
    }
    try {
      console.log(user.name, user.password, user.new_password);
      const response = await axios.put(
        `http://localhost:3000/api/v1/registrations`, 
        { name: user.name, password: user.password, new_password: user.new_password },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('User Profile Updated!');
        navigate('/notes');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Invalid Password');
      } else {
        alert(`Couldn't save user`);
      }
      console.log(error);
    }
  };

  if (userLocal) {
    return (
      <> <NotesNav />
      <div className="container">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Display Name</label>
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="New Display Name"
              aria-label=".form-control-lg example"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="newPassword"
              name="new_password"
              value={user.new_password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="currentPassword"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
      </>
    );
  } else {
    return (
      <div className="container">
        <h1>Not authorized to access this page. Please Login First.</h1>
        <div className="link-container">
          <a href="/signin" className="card-link">Sign In</a>
          <br />
          <a href="/signup" className="card-link">Sign Up</a>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
