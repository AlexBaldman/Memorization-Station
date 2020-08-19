import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {

  return (
    <div>
      <nav>
       
            
          <Link to="/"><button>Home</button></Link> 

          <Link to="/About"><button>About</button></Link>

          <Link to="/charts"><button>Charts</button></Link> 

          <Link to="/memory_objects"><button>Objects</button></Link>

      </nav>
    </div>
    )

}