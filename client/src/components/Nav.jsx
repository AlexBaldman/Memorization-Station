import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { removeToken } from '../services/auth'

export default function Nav(props) {
  const history = useHistory()

  const handleLogout = () => {
    props.setCurrentUser(null);
    localStorage.removeItem("authToken");
    removeToken();
    history.push('/');
  }

  return (
    <div>
      <nav>
     
          <Link to="/"><button className="nav-button"> home </button></Link> 

          <Link to="/About"><button className="nav-button"> about </button></Link>

          <Link to="/charts"><button className="nav-button"> charts </button></Link> 

          <Link to="/memory_objects"><button className="nav-button"> objects </button></Link>

          <div className="login-register">
                    <Link to="/Login"><button className="user-button"> login </button></Link>
                    <Link to="/Register"><button className="user-button"> register </button></Link>
          </div>

          <div className="login-register">
                {props.currentUser
                 ? (
                    <>
                      <p>{props.currentUser.username}</p>
                      <button onClick={handleLogout}> {"Logout"} </button>
                    </>
                        ) : (
                          "not logged in"
                        )
                    }
          </div> 
      </nav>
    </div>
    )

}

// <div className="login-register">
//                               <Link to="/Login"><button className="button-login"> Login </button></Link>
//                               <Link to="/Register"><button className="button-register"> Register </button></Link>
//                           </div>