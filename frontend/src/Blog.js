

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

 

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/blogs', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setBlogs(response.data);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser(decodedToken.username);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newBlog = { title, content, author };
  
    if (editMode) {
      axios.put(`http://localhost:5000/api/blogs/${editId}`, newBlog, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setBlogs(blogs.map(blog => (blog._id === editId ? response.data : blog)));
          setEditMode(false);
          setEditId(null);
          setTitle('');
          setContent('');
          setAuthor('');
        })
        .catch(error => {
          console.error('Error updating blog:', error);
        });
    } else {
      axios.post('http://localhost:5000/api/blogs', newBlog, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setBlogs([...blogs, response.data]); 
          setTitle('');
          setContent('');
          setAuthor('');
        })
        .catch(error => {
          console.error('Error creating blog:', error);
        });
    }
  };
  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); 
    axios.delete(`http://localhost:5000/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, 
    })
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== id)); 
       
      })
      .catch(error => {
        console.error('Error deleting blog:', error); 
      });
  };

  const handleEdit = (blog) => {
    setEditMode(true);
    setEditId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
  };

  return (
    <div className="blog-page">
      <div className="blog-container">
        <h1><b><u>Blog Posts</u></b></h1>
        <h2>{editMode ? 'Edit Blog' : 'Add a Blog'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <button type="submit">{editMode ? 'Update Blog' : 'Add Blog'}</button>
        </form>
        <div>
          {blogs.map(blog => (
            <div key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <small>{blog.author} | {new Date(blog.createdAt).toLocaleString()}</small>
              {blog.createdBy === currentUser && (
                <>
                  <button onClick={() => handleEdit(blog)}>Edit</button>
                  <button onClick={() => handleDelete(blog._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
