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
      <div className="main">
        <form onSubmit={handleSubmit}>
          
          <div className="title-container"><h2> Login </h2></div>

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

          <button onSubmit={handleSubmit}>Submit</button>
          <Link to='/register'><button>Create a account! </button></Link>
          <br/>
          
        
        </form>
      </div>
  )
}
