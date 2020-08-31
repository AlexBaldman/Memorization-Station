import React from 'react'
import { Link } from 'react-router-dom'
import { destroyChart } from '../services/charts';


export default function Charts(props) {

    return (
        <div className="">
            <div className="title-container">
                <h1> memory charts </h1>
            </div>
            <div className="charts">
            {props.charts.map((chart) => (
                <>
                    <div className="">
                        <h2>{chart.name}</h2>
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

