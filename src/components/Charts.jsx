import React from 'react'
import { Link } from 'react-router-dom'

export default function Charts(props) {




    return (
        <div>
            <h3>Charts</h3>
            {props.charts.map((chart) => (
                <>
                    <h1>{chart.name}</h1>
                    <p>{chart.description}</p>
                    <Link to={`/charts/${chart.id}`} > {chart.name} </Link>
                    {/* <img src={chart.image_url} /> */}
                </>
            ))}
            
        </div>
    )
}

