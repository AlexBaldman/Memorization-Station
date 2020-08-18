import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
    const { value } = e.target;
    setFormData({ name: value })
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
    <form onSubmit={handleSubmit}>
      <h3>Update Object</h3>
      <label>
        Number:
        <input
          type="string"
          value={formData.number}
          onChange={handleChange}
        />
      </label>
      <label>
        Initials:
        <input
          type="string"
          value={formData.initials}
          onChange={handleChange}
        />
      </label>
      <label>
        Name:
        <input
          type="string"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="string"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="string"
          value={formData.image_url}
          onChange={handleChange}
        />
      </label>
      <label>
        Chart:
        <input
          type="string"
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