import React,{useState} from 'react'
import Header from './Header'
import axios from 'axios'

const AI = (props) => {
    const [req,setReq]=useState('')
    const [resp,setResp]=useState('')
    let user='Generate'
    const Submits= async (e)=>{
        e.preventDefault()
        if(props.name){
          user=`Context => Analysis/Summarization/Help, Notes name => ${props.name} and notes/text content=> ${props.notes}`
        }
        if(props.Con || props.head){
          console.log(props.Con)
          user=`Context => Notes Generation/help, This is the notes content =>${props.Con} // usergoal=> user wants to save or edit read his content, your task => understand user query and notes name/title=>${props.head}`
        }
        
        const data={req:req,con:user}
        // console.log(data)
        try{
            const response=await axios.post('http://127.0.0.1:8000/api/ai/',data)
            setResp(response.data.rsp)
          }catch(error){
            setResp("Sorry, I'm unable to process your request. Please try again!")
        }finally{
          setReq('')
        }
    }
  return (
    <>
        <div className=''>
              <div className="offcanvas offcanvas-end w-50" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="ai" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Ask for help by AI</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
                </div>
                <div className="offcanvas-body">
                  <p>Try, Summarize this text!</p>
                  <p>Try, Explain this code!</p>
                  <textarea className='form-control bg-secondary-subtle my-5' rows='15' readOnly value={resp} ></textarea>
                  <div className='container'>
                    <form className='d-flex my-4' onSubmit={Submits} >
                    <input className='form-control' type="text" placeholder='Ask here!' onChange={(e)=>{setReq(e.target.value)}} value={req} />
                    &nbsp;
                    <button id='askai' className='btn btn-outline-info' type="submit">ASK</button>
                  </form>
                  </div>
                </div>
              </div>
              <button className="btn btn-danger" type="button" data-bs-toggle="offcanvas" data-bs-target="#ai" aria-controls="offcanvasScrolling">Ask AI</button>
        </div>
    </>
  )
}

export default AI