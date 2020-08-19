import React, { useState, useEffect } from 'react'
import { putObject } from '../services/objects'

export default function ObjectUpdate(props) {
  const [formData, setFormData] = useState({
    number: "",
    initials: "",
    name: "",
    description: "",
    image_url: "",
    chart_id: ""
  })

  useEffect(() => {
    defaultFormData()
  }, [props.objects])

  const defaultFormData = () => {

  const memoryObject = props.objects.find((memoryObject) => {
    return memoryObject.id === parseInt(props.match.params.id)
      })
        if (memoryObject) {
          setFormData({ 
            number: memoryObject.number,
            initials: memoryObject.initials,
            name: memoryObject.name,
            description: memoryObject.description,
            image_url: memoryObject.image_url,
            chart_id: memoryObject.chart_id
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
    const newObject = await putObject(id, formData);
    props.setObjects(
      props.objects.map((memoryObject) => {
        return memoryObject.id === parseInt(id) ? newObject : memoryObject
      })
    )
    props.history.push('/memory_objects')
  }

  return (
    <div className="objects">
      <form onSubmit={handleSubmit}>
        
        <h3>Update Object</h3>
        <label>
          Number:
          <input
            type="text"
            name="number"
            value={formData.number}
          onChange={handleChange}
        />
      </label>
      <label>
        Initials:
        <input
          type="text"
          name="initials"
          value={formData.initials}
          onChange={handleChange}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
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