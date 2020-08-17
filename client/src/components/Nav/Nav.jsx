import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {

  return (
    <div>
      <nav>
        <h2>|     
          <Link to="/">  Home  </Link>      |

          <Link to="/Charts">  Charts   </Link>      |

          <Link to="/Objects">   Objects   </Link>     |

          <Link to="/objects/new">   New Object   </Link>     |

          <Link to="/About">   About   </Link>     |
        </h2>

      </nav>
    </div>
    )

}