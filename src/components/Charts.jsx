import React from 'react'
import { Link } from 'react-router-dom'
// import { getAllCharts } from '../services/charts';

export default function Charts(props) {




    return (
        <div className="charts">
            <h3>Charts</h3>
        
        {props.charts.map((chart) => (
          <>
            <h1>{chart.name}</h1>
            <img src={chart.image_url} />
            <p>{chart.description}</p>
         </>
    ))}
            
        </div>
    )
}
