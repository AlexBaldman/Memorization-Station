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
    <div className="card">
      <div className="title-container">
        <h2> memory objects </h2>
      </div>

        {props.objects.map((memoryObject) => (
          <>
            <div className='card'>
                <h1>{memoryObject.name}</h1>
                <Link to={`/memory_objects/${memoryObject.id}`} key={memoryObject.id}>
                  <img src={memoryObject.image_url} alt={ "memory object image" } /> 
                </Link>
                <h2>{memoryObject.description}</h2>
              <button>
              <Link to={`/memory_objects/${memoryObject.id}/edit`} > edit object </Link></button>
              <button onClick={() => handleClick(memoryObject.id)} > delete Object </button>
            </div>
         </>
    ))}

      </div>
    )
}