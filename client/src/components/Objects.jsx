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
    <div className="home-content">
      <div className="title-container">
        <h2>Memory Objects</h2>
      </div>
      
        {props.objects.map((memoryObject) => (
          <>
            <Link to={`/memory_objects/${memoryObject.id}`} key={memoryObject.id}>{memoryObject.name}</Link>
            <Link to={`/memory_objects/${memoryObject.id}/edit`}><button>edit object</button></Link>
            <button onClick={() => handleClick(memoryObject.id)}>Delete Object</button>
            <br />
         </>
    ))}
  </div>
    )
}