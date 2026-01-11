import React, { useState } from 'react'
import axios from 'axios'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'
const Home = (props) => {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [Error,setErrors]=useState(false)
    const [pass,usePass]=useState(false)
    const navigate=useNavigate()
    const [notesdata,setData]=useState(null)
    const [id,setId]=useState(null)
    const handleInput=(e)=>{
        setName(e.target.value)
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const response=await axios.get('http://127.0.0.1:8000/api/',{
                params : {name:name}
            })
            if(!response.data.islocked){
                props.note(response.data)
                // console.log(response.data)
                navigate('/notes')
            }else{
                setId(response.data.id)
                setData(response.data)
                // console.log(response.data,id,notesdata)
                usePass(true)
            }
        }catch(error){
            // console.log(error.response.data)
            setErrors(true)
        }
    }
    const handlePass=async (e)=>{
        e.preventDefault()
        const data={pk:id,passcode:password}
        // console.log('passing = ',data)
        try{
            const resbool=await axios.post('http://127.0.0.1:8000/api/check/',data)
            // console.log(resbool.data)
            if(resbool.data.passed){
                props.note(notesdata)
                navigate('/notes')
            }
        }catch(error){
            setErrors(true)
        }
    }
  return (
    <>
    {   !pass? (
        <div className='container position-absolute top-50 start-50 translate-middle'>
            <p className='display-3 m-3' >The only f1 way to save notes anywhere</p>
            <h3 className='m-3'>No accounts. No signups. No installs. Just choose a code.</h3>
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
        </div>):(
            <div className='container d-flex position-absolute top-50 start-50 translate-middle'>
            <div className='container bg-secondary align-items-center rounded my-3 p-3'>
                <p className='fs-3'>This notes is protected. Enter Password to open notes.</p>
                <form className='row g-3 my-3' onSubmit={handlePass} method="get">
                    <div className='col-10 mx-3' >
                        <input className='form-control' type="text" onChange={(e)=>{setPassword(e.target.value)}} value={password} />
                        <small>{ Error && <p className='text-danger'>Invalid Password!</p> }</small>
                    </div>
                    <div className='col'>
                        <button className='btn btn-info' type="submit">Open</button>
                    </div>
                </form>
            </div>
        </div>)}
    </>
  )
}

export default Home