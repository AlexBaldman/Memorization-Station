import React from 'react'
import { Link } from 'react-router-dom'

export default function Charts(props) {




    return (
        <div className="hone-content">
            <div className="title-container"><h2>Charts</h2></div>
            {props.charts.map((chart) => (
                <>
                    <div className="chart-card">
                        <p>{chart.description}</p>
                        <Link to={`/charts/${chart.id}`}> {chart.description} </Link>
                        {/* <img src={chart.image_url} /> */}
                    </div>
                </>
            ))}
            
        </div>
    )
}

