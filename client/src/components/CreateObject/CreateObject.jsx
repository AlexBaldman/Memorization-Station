import React, { useState } from 'react'
import { postObject } from '../services/foods';

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
    const newFood = await postFood(formData);
    props.setFoods([
      ...props.foods,
      newFood
    ])
    props.history.push('/foods')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Food</h3>
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
