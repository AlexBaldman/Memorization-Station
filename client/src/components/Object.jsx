import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOneObject } from '../services/objects';


export default function Object(props) {

    const [objects, setObjects] = useState([])

    useEffect(() => {
        getObject();
      }, [])
    
    const getObject = async () => {
        const object = await getOneObject(props.match.params.id)
        const objectArray = props.objects.filter(obj => {
            return obj.memory_object.id === memory_object.id
        })
        setObject(newObject)
        setObjects(objectArray)
    }


    return (
        <> 
            <div className="content">
                <div className="title-container"> 
                    charts 
                </div>

                {object && 
                    <>
                    <div className="card">
                        <h2> {object.name} </h2>
                        <p> {object.description} </p>
                        <img src= {object.image_url} />
                        <Link to= {`/memory_objects/${chart.id}/new`} > 
                            <button> 
                                add object 
                            </button>
                        </Link>
                    </div>
                    </>
                }
            
                <div className="object-card">
                    {objects &&
                        objects.map(object => (
                        <>
                            <h3> {object.name} </h3>
                            <img src= {object.image_url} />
                            <p> {object.description} </p>
                        </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
