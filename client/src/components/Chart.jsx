import React from 'react'
import { useEffect, useState } from 'react'
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
        <div>
           

            {chart && 
                <>
                    <Link to={`/memory_objects/${chart.id}/new`}> Add Memory Object </Link>
                    <h2>{chart.name}</h2>
                    <h3>{chart.description}</h3>
                    <img src={chart.image_url} />
                </>
            }
            {objects &&
                objects.map(object => (
                <>
                    <p>{object.name}</p>
                    <p>{object.description}</p>
                </>
                ))
            }
        </div>
    )
}
