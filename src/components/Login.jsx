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

// TO DO :
  // use if / else or ternary or something to:
  // if not logged in, 
  // display login form 
  // if logged in, 
  // show user_image_url
  // (user_image_url would need to be added to the user table in database using a migration)

  return (
      <div>
        <form onSubmit={handleSubmit}>
          
          <div className="title-container"><h2> login </h2></div>
          <label>
            username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label>
            e-mail:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button>Submit</button>
          <Link to='/register'><button>Create a account! </button></Link>
          <br/>
          
        
        </form>
      </div>
  )
}
