import React from 'react';
import { Link } from 'react-router-dom';
import { destroyObject } from '../services/objects';

export default function ObjectsShow(props) {

  const handleClick = async (id) => {
    await destroyObject(id);
    props.setObjects(props.memory_objects.filter((memoryObject)=> {
      return memoryObject.id !== id
    }))
  }
  
  
  return (
    <div>
      <h3>Memory Objects</h3>
        {props.memory_objects.map((memoryObject) => (
          <>
            <Link to={`/memory_objects/${memoryObject.id}`} key={memoryObject.id}>{memoryObject.name}</Link>
            <Link to={`/memory_objects/${memoryObject.id}/edit`}><button>edit</button></Link>
            <button onClick={() => handleClick(memoryObject.id)}>delete</button>
            <br />
         </>
    ))}
    <Link to='/memory_objects/new'><button>Create</button></Link>
  </div>
    )
}