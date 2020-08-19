import React from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <div className="header">
                <div className="app-title"><h1>Memorization Station</h1>
                <h3>A Metaphorical Mansion for Memory</h3></div>
                <div className="login-register">
                    <Link to="/Login">  Login  </Link> | 
                    <Link to="/Register">   Register  </Link>
                </div> 
            </div>
        </>
    )
}