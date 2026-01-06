import React, { useState } from 'react'
import axios from 'axios'
import AI from './AI'

const Add = () => {
    const [name,setName]=useState('')
    const [content,setContent]=useState('')
    const [success,setSuccess]=useState(false)
    const [Error,setErrors]=useState({})
    const handleSubmit=async (e)=>{
      e.preventDefault()
      const userdata={name:name,notes:content}
      try{
        const response= await axios.post('http://127.0.0.1:8000/api/',userdata)
        //console.log('success',response.data)
        setSuccess(true)
      }catch(error){
        setErrors(error.response.data)
        //console.log('errors',error.response.data)
      }
    }
  return (
    <>
    {success && <div class="alert alert-warning" role="alert">
      Your Notes is Saved!
    </div>}
    <div className='container position-relative'>
      <form className='container bg-info-subtle rounded p-3 m-auto' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e)=>{setName(e.target.value)}} value={name} />
          <small>{ Error.name && <p className='text-danger'>{Error.name}</p> }</small>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Content goes here!</label>
          <small>{ Error.notes && <p className='text-danger'>{Error.notes}</p> }</small>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="15"  onChange={(e)=>{setContent(e.target.value)}} value={content} ></textarea>
        </div>
        <div className='d-flex'>
          <button className='btn btn-outline-success' type="submit">Save</button>
        </div>
      </form>
      <div className="position-absolute top-0 end-0 m-1 mx-3"><AI head={name} Con={content} /></div>
    </div>
    </>
  )
}

export default Add