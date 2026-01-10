import React, { useState } from 'react'
import axios from 'axios'
import AI from './AI'

const Add = () => {
    const [name,setName]=useState('')
    const [key,setKey]=useState('')
    const [lock,setLock]=useState(false)
    const [content,setContent]=useState('')
    const [success,setSuccess]=useState(false)
    const [Error,setErrors]=useState({})
    const [edit,setEdit]=useState(false)
    const [show,setShow]=useState(false)
    const handleSubmit=async (e)=>{
      e.preventDefault()
      const userdata={name:name,notes:content,passcode:key,edit:edit,islocked:!!key}
      try{
        const response= await axios.post('http://127.0.0.1:8000/api/',userdata)
        console.log('success',response.data)
        setContent('')
        setEdit(false)
        setName('')
        setLock(false)
        setSuccess(true)
      }catch(error){
        setErrors(error.response.data)
        console.log('errors',error.response.data)
      }
    }
    const toggleIt=(e)=>{
      e.preventDefault()
      setLock(!lock)
    }
    const togglePassword=(e)=>{
      e.preventDefault()
      // console.log('clicked')
      setShow(!show)
      // console.log(toString(show))
    }
    const toggleEdit=(e)=>{
      e.preventDefault()
      // console.log(!edit)
      setEdit(!edit)
    }
  return (
    <>
    {success && <div class="alert alert-warning" role="alert">
      Your Notes is Saved!
    </div>}
    <div className='container addform rounded position-relative'>
      <div className='d-flex'>
        <p className="flex-fill fs-4 my-2">Save once, Open anywhere!</p>
        <button className='btn btn-danger m-1 mx-3' onClick={toggleIt}>Set Password</button>
        <div className='m-2 bg-info rounded'>
          <small className='mx-1 h6'>Edit</small>
          <button className={`btn btn-info ${edit ? 'opacity-25': 'opacity-100  border border-black'}`} onClick={toggleEdit} >Off</button>
          <button className={`btn btn-info ${!edit ? 'opacity-25': 'opacity-100  border border-black'}`} onClick={toggleEdit} >On</button>
        </div>
        <div className="m-1 mx-3"><AI head={name} Con={content} /></div>
      </div>
      <form className='container addform rounded p-3 m-auto' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e)=>{setName(e.target.value)}} value={name} />
          <small>{ Error.name && <p className='text-danger'>{Error.name}</p> }</small>
        </div>
        { lock ? (<div className="mb-3">
          <label htmlFor="pass" className="form-label">Password</label>
          <div className='input-group'>
            <input type={ show ? "text":"password"} className="form-control" id="pass" onChange={(e)=>{setKey(e.target.value)}} value={key} />
            <button className="btn btn-outline-secondary" type="button" onClick={togglePassword}>Show</button>
          </div>
        </div>) : (<></>)}
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Content goes here!</label>
          <small>{ Error.notes && <p className='text-danger'>{Error.notes}</p> }</small>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="15"  onChange={(e)=>{setContent(e.target.value)}} value={content} ></textarea>
        </div>
        <div className='d-flex'>
          <button className='btn btn-outline-success' type="submit">Save</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Add