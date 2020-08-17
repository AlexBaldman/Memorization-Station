import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { postObject } from '../../services/objects';

export default function ObjectCreate(props) {
  const [formData, setFormData] = useState({
    number: "",
    initials: "",
    name: "",
    description: "",
    image_url: ""
  })

  // NOT SURE IF NEED COMPUTED PROPERTY ON NAME BELOW TO WORK AS INTENDED?:

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ name: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newObject = await postObject(formData);
    props.setObjects([
      ...props.memory_objects,
      newObject
    ])
    props.history.push('/memory_objects')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Object</h3>
      <label>
        Number:
        <input
          type="text"
          value={formData.number}
          onChange={handleChange}
        />
      </label>
      <label>
        Initials:
        <input
          type="text"
          value={formData.initials}
          onChange={handleChange}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={formData.image_url}
          onChange={handleChange}
        />
      </label>
      <label>
        Chart:
        <input
          type="text"
          value={formData.chart_id}
          onChange={handleChange}
        />
      </label>
        <button>Submit</button>
    </form>
  )
}
