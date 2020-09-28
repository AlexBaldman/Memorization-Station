import React from 'react'
import { Link } from 'react-router-dom'
import { destroyChart } from '../services/charts';


export default function Charts(props) {
    const { currentUser } = props;


    return (
        <div className='home'>

            <div className="title-container">
                <h2> memory charts </h2>
            </div>
            
            <div className="charts">
                {props.charts.map((chart) => (
                    <div>
                        <Link to={`/charts/${chart.id}`}> 
                            <div className="card-content">
                                <h2>{chart.name}</h2>
                                <img src={chart.image_url} alt='chart image' />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

