import React from 'react'

export default function Charts(props) {




    return (
        <div className="charts">
            <h3>Charts</h3>
                {props.charts.map((chart) => (
                <>
                    <h1>{chart.name}</h1>
                    <p>{chart.description}</p>
                    <img src={chart.image_url} />
                </>
            ))}
            
        </div>
    )
}

{/* <Link to='charts/{chart.id}' > {chart.name} </Link> */}