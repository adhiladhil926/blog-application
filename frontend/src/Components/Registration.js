

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './registration.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting registration:', { username, password }); // Debugging log
    axios.post('http://localhost:5000/api/users/register', { username, password })
      .then(response => {
        alert('User registered successfully');
        setUsername('');
        setPassword('');
        navigate('/login'); 
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <div className='register'>
      <h1><u><b>Registeration</b></u></h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;