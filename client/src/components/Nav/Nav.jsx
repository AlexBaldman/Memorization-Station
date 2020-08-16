import React from 'react'
import { Link, Route } from 'react-router-dom'

export default function Nav() {

  return (
    <h2>|     
        <Link to="/">  Home  </Link>     |   
        <Link to="./UserCreate">   Create User   </Link>    |     
        <Link to="./Charts">  Charts   </Link>      |
        <Link to="./Objects">   Objects   </Link>     |
        <Link to="./About">   About   </Link>     |
    </h2>
    )

}