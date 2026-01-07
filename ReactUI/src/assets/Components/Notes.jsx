import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AI from './AI'
const Notes = (props) => {
  const compiler="https://www.online-ide.com/"
  const [url,setUrl]=useState(null)
  return (
    <>
    {props.name ? (
        <>
        <div className=''>     
          <div className='m-3'>
            <div className="offcanvas offcanvas-start w-100" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="com" aria-labelledby="offcanvasLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Online Compiler</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={()=>{setUrl(null)}} ></button>
              </div>
              <div className="offcanvas-body">
                <p>Try to run your code.</p>
                <iframe className='vh-100' width='100%' src={url} ></iframe>
              </div>
            </div>
          </div>

          <div className='container-xl bg-light min-vh-75 border border-black'>
            <div className="row">
              <div className="d-flex bg-warning">
                <nav class="navbar navbar-expand-lg bg-warning">
                  <div class="container-fluid">
                    <h3 className="navbar-brand fs-3">{props.name}</h3>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div class="navbar-nav">
                        <div className="nav-link">
                          <button className="btn btn-danger" type="button" onClick={()=>{setUrl(compiler)}} data-bs-toggle="offcanvas" data-bs-target="#com" aria-controls="offcanvasScrolling">Run Compiler</button>
                        </div>
                        <div className="nav-link">
                          <div className='mx-1' ><Link className='btn btn-info' to='/'>Back</Link></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
                <div className='m-3'><AI name={props.name} notes={props.notes} /></div>
              </div>
            </div>
              {/* using pre tag to preserve line breaks and spaces from uploaded text */}
              {/* <div className='row mb-3 p-3'><pre className='text-break'>{props.notes}</pre></div> */}
            <div className='row m-1'><textarea className='form-control bg-dark my-2 text-light text-break' readOnly rows={22} value={props.notes} ></textarea></div>
          </div>
        </div>
        </>
    ):(<Navigate to='/' />)}
    </>
  )
}

export default Notes