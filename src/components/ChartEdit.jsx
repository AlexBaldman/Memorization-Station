import React, { useState, useEffect } from 'react'
import { putChart } from '../services/charts'

export default function ChartEdit(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: ""
  })

  useEffect(() => {
    defaultFormData()
  }, [props.charts])

  const defaultFormData = () => {

  const chart = props.charts.find((chart) => {
    return chart.id === parseInt(props.match.params.id)
      })
        if (chart) {
          setFormData({ 
            number: chart.name,
            description: chart.description,
            image_url: chart.image_url
          })
        }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {id} = props.match.params;
    const newChart = await putChart(id, formData);
    props.setCharts(
      props.charts.map((chart) => {
        return chart.id === parseInt(id) ? newChart : chart
      })
    )
    props.history.push('/charts')
  }

  return (
    <div className="content">

        <form onSubmit={handleSubmit}>
            <h3>edit chart</h3>
            <label>
            name:
            <input
                type="text"
                name="name"
                value={formData.name}
            onChange={handleChange}
            />
            </label>
            <label>
            description:
            <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            />
            </label>
            <label>
            image url:
            <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            />
            </label>
            <button>Submit</button>
        </form>

    </div>
  )
}