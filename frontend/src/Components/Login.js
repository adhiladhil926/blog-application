
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './registration.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/login', { username, password })
      .then(response => {
        alert('User logged in successfully');
        localStorage.setItem('token', response.data.token);
        setUsername('');
        setPassword('');
        navigate('/blog'); 
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className='login'>
      <h1><u><b>Login</b></u></h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;