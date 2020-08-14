import React, { useState } from 'react'
import { postObject } from '../services/objects';

export default function CreateFood(props) {
  const [formData, setFormData] = useState({
    name: ""
  })

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ name: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newObject = await postFood(formData);
    props.setFoods([
      ...props.memory_objects,
      newObject
    ])
    props.history.push('/memory_objects')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Object</h3>
      <label>
        Name:
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
        <button>Submit</button>
    </form>
  )
}
