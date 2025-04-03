
import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './Blog';
import Register from './Components/Registration'; 
import Login from './Components/Login'; 
import Navbar from './Components/Navbar';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={< Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/" element={<Register />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;