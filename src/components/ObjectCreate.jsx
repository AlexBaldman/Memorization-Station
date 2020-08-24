import React, { useState, useEffect } from 'react'
import { postObject } from '../services/objects';

export default function ObjectCreate(props) {
  const [formData, setFormData] = useState({
    number: "",
    initials: "",
    name: "",
    description: "",
    image_url: "",
    chart_id: ""
  })

  useEffect(() => {
    setFormData({chart_id: props.match.params.id});
    
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
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
      <div className="content">
        <form onSubmit={handleSubmit}>
          <h2>create object</h2>
          <label>
            Number:
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </label><br/>
          <label>
            Initials:
            <input
              type="text"
              name="initials"
              value={formData.initials}
              onChange={handleChange}
            />
          </label><br/>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label><br/>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label><br/>
          <label>
            Image URL:
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </label><br/>
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}
