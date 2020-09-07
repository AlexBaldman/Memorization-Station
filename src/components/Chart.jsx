import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getOneChart } from '../services/charts'
import { destroyObject } from '../services/objects'


export default function Chart(props) {
    const [chart, setChart] = useState(null)
    const [objects, setObjects] = useState([])
    const [object, setObject] = useState([])

    useEffect(() => {
        getChart();
        
      }, [])
    
    const getChart = async () => {
        const newChart = await getOneChart(props.match.params.id)
        const objectArray = props.objects.filter(obj => {
        return obj.chart_id === newChart.id
        })
        setChart(newChart)
        setObjects(objectArray)
    }

    const handleClick = async (id) => {
    await destroyObject(id);
    props.setObjects(props.objects.filter((memoryObject)=> {
      return object.id !== id
    }))
  }


    return (
        <> 
            <div className="">
                {chart && 
                    <>
                        
                            <div className='title-container'>
                                <h1>{chart.description}</h1>
                                <img src={chart.image_url} />
                            </div>
                            <div>
                            <Link to={`/memory_objects/${chart.id}/new`}>
                                <button className='nav-button'>
                                    Add Memory Object
                                </button>
                            </Link>
                            </div>
                        
                    </>
                }
            
                <div className="charts">
                    {objects &&
                        objects.map(object => (
                            <div className='card-content'>
                                <h1>{object.number}</h1>
                                <h2>{object.name}</h2>
                                <img src={object.image_url} alt='memory object image' />
                                <p>{object.description}</p>
                                <div className='button-wrapper'>
                                     <Link to={`/memory_objects/${object.id}/edit`}> 
                                        <button className='button'>  
                                                edit object 
                                        </button>
                                    </Link>
                                    <button className="button" onClick={() => handleClick(object.id)}> 
                                        delete Object 
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
