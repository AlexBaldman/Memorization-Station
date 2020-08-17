import React from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <div className="header">
                <h1>Memorization Station</h1>
                <p><Link to="./Login">  Login  </Link> / <Link to="./Register">   Register  </Link> 
                    <br/>   
                </p>
            </div>
        </>
    )
}