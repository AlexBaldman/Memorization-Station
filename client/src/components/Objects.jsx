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
      <>

        <div className="title-container">
          <h1> my memory objects </h1>
        </div>
        <div className="charts">
          {props.objects.map((memoryObject) => (
              <div className='card-content'>
                  <h1>{memoryObject.number}</h1>
                  <h2>{memoryObject.name}</h2>
                  <Link to={`/memory_objects/${memoryObject.id}`} key={memoryObject.id}>
                    <img src={memoryObject.image_url} alt= { "memory object image" } /> 
                  </Link>
                  <h2>{memoryObject.description}</h2>
                  <div className='button-wrapper'>
                    <button className='button'>
                      <Link to={`/memory_objects/${memoryObject.id}/edit`}> 
                        edit 
                      </Link>
                    </button>
                    <button className="button" onClick={() => handleClick(memoryObject.id)}> 
                      delete 
                    </button>
                  </div>
              </div>
            
            
           ))
         }
         </div>
      </>

    )
}