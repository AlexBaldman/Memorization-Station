import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { loginUser } from '../services/auth';

export default function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const userData = await loginUser(formData);
    props.setCurrentUser(userData)
    props.history.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <h2> Login:</h2>

      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>

      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>

      <button onSubmit={handleSubmit}>Submit</button><br/>
      <br/>
      <h3><Link to='/register'> Or click here to sign up for a new account! </Link></h3>
      <br/>
      
     
    </form>
  )
}
