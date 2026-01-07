import React from 'react'

const Register = () => {
  return (
    <>
    <div className='container bg-warning p-3 m-auto rounded'>
      <h3 className='text-center'>Create an Account!</h3>
        <form action="">
            <label className='form-label' htmlFor="un">Username</label>
            <input className='form-control' type="text" id='un' />
            <label className='form-label' htmlFor="pw">Password</label>
            <input className='form-control' type="password" name="" id="pw" />
            <div className='d-flex justify-content-center'>
              <button className='btn btn-info my-3' type="submit">Register</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default Register