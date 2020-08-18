import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {

  return (
    <div>
      <nav>
        <h2>|     
          <Link to="/">  Home  </Link>      |

          <Link to="/charts">  Charts   </Link>      |

          <Link to="/memory_objects">   Objects   </Link>     |

          <Link to="/memory_objects/new">   Create Object   </Link>     |

          <Link to="/memory_objects/:id/edit">   Update Object   </Link>     |

          <Link to="/About">   About   </Link>     |
        </h2>

      </nav>
    </div>
    )

}