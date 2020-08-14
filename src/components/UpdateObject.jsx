import React, { useState, useEffect } from 'react'
import { putObject } from '../services/objects'

export default function UpdateObject(props) {
  const [formData, setFormData] = useState({
    name: ""
  })

  useEffect(() => {
    defaultFormData()
  }, [props.memory_objects])

// Need to set the form to set all the different keys to the inputted values
// Again, is it possible to use a computed property here?
// Perhaps something similar to what's happening below, from login:

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({
//     ...formData,
//     [name]: value
//   })
// }

  const defaultFormData = () => {

    const memoryObject = props.memory_objects.find((memoryObject) => {
      return memoryObject.id === parseInt(props.match.params.id)
    })
    if (memoryObject) {
      setFormData({ name: memory_object.name })
    }
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ name: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {id} = props.match.params;
    const newObject = await putObject(id, formData);
    props.setObjects(
      props.memory_objects.map((memoryObject) => {
        return memoryObject.id === parseInt(id) ? newObject : foodItem
      })
    )
    props.history.push('/memory_objects')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Object</h3>
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
