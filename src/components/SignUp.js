import React, { useState } from 'react';
import axios from 'axios';
import HomeNav from './HomeNav';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!username){
      alert("Invalid Username"); 
      return;
    }
    if(!name){
      alert("Invalid Display name"); 
      return;
    }
    if(!password){
      alert("Invalid Password"); 
      return;
    }
    try {
      console.log(username)
      const response = await axios.post('http://localhost:3000/api/v1/registrations', {
        username: username,
        name: name,
        password: password
      },{
        withCredentials: true,
      });
      navigate('/signin');
      alert("You have sucessfully signed up, please login to continue"); 
      console.log(response); // handle success (e.g., redirect to another page or show a success message)
    } catch (error) {
      alert("Username already exists, Try a different username"); 
      console.error(error); // handle error (e.g., show an error message)
    }
  };

  return (
    <>
    <HomeNav></HomeNav>
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="input-group flex-nowrap">
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
      <div className="input-group">
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
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form></>
  );
}

export default SignUp;
