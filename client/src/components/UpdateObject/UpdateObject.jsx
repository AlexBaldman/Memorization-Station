import React, { useState, useEffect } from 'react'
import { putObject } from '../services/objects'

export default function UpdateFood(props) {
  const [formData, setFormData] = useState({
    name: ""
  })

  useEffect(() => {
    defaultFormData()
  }, [props.foods])

  const defaultFormData = () => {

    const foodItem = props.foods.find((food) => {
      return food.id === parseInt(props.match.params.id)
    })
    if (foodItem) {
      setFormData({ name: foodItem.name })
    }
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ name: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {id} = props.match.params;
    const newFood = await putFood(id, formData);
    props.setFoods(
      props.foods.map((foodItem) => {
        return foodItem.id === parseInt(id) ? newFood : foodItem
      })
    )
    props.history.push('/foods')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Food</h3>
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
