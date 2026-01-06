import React, { useState } from 'react'
import axios from 'axios'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'
const Home = (props) => {
    const [name,setName]=useState('')
    const [Error,setErrors]=useState(false)
    const navigate=useNavigate()
    const handleInput=(e)=>{
        setName(e.target.value)
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const response=await axios.get('http://127.0.0.1:8000/api/',{
                params : {name:name}
            })
            props.note(response.data)
            // console.log(response.data)
            navigate('/notes')
        }catch(error){
            // console.log(error.response.data)
            setErrors(true)
        }
    }
  return (
    <>
    <div className='container d-flex position-absolute top-50 start-50 translate-middle'>
        <div className='container bg-secondary align-items-center rounded my-3 p-3'>
            <p className='fs-3'>Let's try. Enter a code to open notes, or click "+" to save notes.</p>
            <form className='row g-3 my-3' onSubmit={handleSubmit} method="get">
                <div className='col-10 mx-3' >
                    <input className='form-control' type="text" onChange={handleInput} value={name} />
                    <small>{ Error && <p className='text-danger'>This code doesnot exist!</p> }</small>
                </div>
                <div className='col'>
                    <button className='btn btn-info' type="submit">Open</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Home