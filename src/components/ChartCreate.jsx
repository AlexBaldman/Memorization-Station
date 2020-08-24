import React, { useState, useEffect } from 'react'
import { postChart } from '../services/charts';


export default function ChartCreate(props) {
    const [formData, setFormData] = useState ({
        name: '',
        description: '',
        image_url: ''
    })


    useEffect(() => {
        setFormData({chart_id: props.match.params.id});
        
      }, [])
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newChart = await postChart(formData);
        props.setCharts([
          ...props.charts,
          newChart
        ])
        props.history.push('/charts')
      }
    
      return (
        <>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <h1> Create Chart </h1>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label><br/>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label><br/>
              <label>
                Image URL:
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                />
              </label><br/>
              <button className="button-submit">Submit</button>
            </form>
          </div>
        </>
      )
    }
    


