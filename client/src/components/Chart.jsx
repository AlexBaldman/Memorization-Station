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
                        <Link to={`/memory_objects/${chart.id}/new`}>
                            <div className='title-container'>
                                <h1>{chart.description}</h1>
                            </div>
                            <div>
                                <button className='nav-button'>
                                    Add Memory Object
                                </button>
                            </div>
                        </Link>
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
                                    <button className='button'>
                                        <Link to={`/memory_objects/${object.id}/edit`}> 
                                            edit object 
                                        </Link>
                                    </button>
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
