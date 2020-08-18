import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { postObject } from '../services/objects';

export default function ObjectCreate(props) {
  const [formData, setFormData] = useState({
    number: "",
    initials: "",
    name: "",
    description: "",
    image_url: ""
  })

  // NOT SURE IF NEED COMPUTED PROPERTY - DO I NEED ON ON [name] BELOW TO WORK AS INTENDED?

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ name: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newObject = await postObject(formData);
    props.setObjects([
      ...props.objects,
      newObject
    ])
    props.history.push('/memory_objects')
  }

  return (
    <>
      <h3>Create Object</h3>
      <form onSubmit={handleSubmit}>
      
        <label>
          Number:
          <input
            type="text"
            value={formData.number}
            onChange={handleChange}
          />
        </label><br/>
        <label>
          Initials:
          <input
            type="text"
            value={formData.initials}
            onChange={handleChange}
          />
        </label><br/>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </label><br/>
        <label>
          Description:
          <input
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
        </label><br/>
        <label>
          Image URL:
          <input
            type="text"
            value={formData.image_url}
            onChange={handleChange}
          />
        </label><br/>
        <label>
          Chart:
          <input
            type="text"
            value={formData.chart_id}
            onChange={handleChange}
          />
        </label><br/>
          <button>Submit</button>
      </form>
    </>
  )
}
