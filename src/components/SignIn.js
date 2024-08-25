import HomeNav from "./HomeNav";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignIn() {
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
    if(!password){
      alert("Invalid Password"); 
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/v1/sessions', {
        username: username,
        password: password
      },{
        withCredentials: true,
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log(response.data); // handle success (e.g., redirect to another page or show a success message)
      navigate('/notes');
    } catch (error) {
      alert("Invalid Credentials");
      console.error('There was an error logginin!', error); // handle error (e.g., show an error message)
    }
  };

  return (
    <>
    <HomeNav></HomeNav>
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>
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
      <button type="submit" className="btn btn-primary">Sign In</button>
    </form></>
  );
}

export default SignIn;