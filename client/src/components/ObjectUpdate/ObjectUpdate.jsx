import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { putObject } from '../../services/objects'

export default function ObjectUpdate(props) {
  const [formData, setFormData] = useState({
    number: "",
    initials: "",
    name: "",
    description: "",
    image_url: ""
  })

  useEffect(() => {
    defaultFormData()
  }, [props.memory_objects])

  const defaultFormData = () => {

    const memoryObject = props.memory_objects.find((memoryObject) => {
      return memoryObject.id === parseInt(props.match.params.id)
    })
    if (memoryObject) {
      setFormData({ 
        number: memoryObject.number,
        initials: memoryObject.initials,
        name: memoryObject.name,
        description: memoryObject.description,
        image_url: memoryObject.image_url
      })
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
        return memoryObject.id === parseInt(id) ? newObject : memoryObject
      })
    )
    props.history.push('/memory_objects')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Object</h3>
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