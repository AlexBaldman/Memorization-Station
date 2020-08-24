import React from 'react'
import { Link } from 'react-router-dom'
import { destroyChart } from '../services/charts';


export default function Charts(props) {


// class ChartTitle {
//     style=

// }

    return (
        <div className="">
            <div className="title-container">
                <h1> charts </h1>
            </div>
            <div className="charts">
            {props.charts.map((chart) => (
                <>
                    <div className="card">
                        <h1>{chart.name}</h1> 
                        <Link to={`/charts/${chart.id}`}> 
                            <img src={chart.image_url} /> 
                        </Link>
                    </div>
                </>
            ))}
            </div>
            
        </div>
    )
}

