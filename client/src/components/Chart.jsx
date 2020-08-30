import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getOneChart } from '../services/charts'


export default function Chart(props) {
    const [chart, setChart] = useState(null)
    const [objects, setObjects] = useState([])

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


    return (
        <> 
            <div className="">
                <div className="title-container"> chart </div>

                {chart && 
                    <>
                    <div className="chart-title">
                        <h1>{chart.name}</h1>
                        <p>{chart.description}</p>
                        <img src={chart.image_url} />
                        <Link to={`/memory_objects/${chart.id}/new`}> 
                            <button>Add Memory Object</button><br/>
                        </Link>
                    </div>
                    </>
                }
            
                <div className="object-card">
                    {objects &&
                        objects.map(object => (
                        <>
                            <h2>{object.name}</h2>
                            <img src={object.image_url} />
                            {/* <p>{object.description}</p> */}
                        </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
