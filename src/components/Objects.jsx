import React from 'react';
import { Link } from 'react-router-dom';
import { destroyObject } from '../services/objects';

export default function Objects(props) {

  const handleClick = async (id) => {
    await destroyObject(id);
    props.setObjects(props.objects.filter((memoryObject)=> {
      return memoryObject.id !== id
    }))
  }
  
  
  return (
      <div className="content">

        <div className="title-container">
          <h1> MY MEMORY OBJECTS </h1>
        </div>

          {props.objects.map((memoryObject) => (
            <>

              <div className=''>

                  <h1>{memoryObject.number}</h1>
                  <h2>{memoryObject.name}</h2>
                  <Link to={`/memory_objects/${memoryObject.id}`} key={memoryObject.id}>
                    <img src={memoryObject.image_url} alt={ "memory object image" } /> 
                  </Link>
                  <h2>{memoryObject.description}</h2>
                  <button className='nav-button'>
                    <Link to={`/memory_objects/${memoryObject.id}/edit`}> 
                      edit object 
                    </Link>
                  </button>

                  <button className="nav-button" onClick={() => handleClick(memoryObject.id)}> 
                    delete Object 
                  </button>

              </div>
              
            </>
           ))
         }
      </div>

    )
}