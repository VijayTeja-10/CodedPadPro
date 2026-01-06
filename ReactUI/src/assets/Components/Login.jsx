import React from 'react'

const Login = () => {
  return (
    <>
    <div className='container bg-warning p-3 m-auto rounded'>
      <h3 className='text-center'>Login Your Account!</h3>
        <form action="">
            <label className='form-label' htmlFor="un">Username</label>
            <input className='form-control' type="text" id='un' />
            <label className='form-label' htmlFor="em">Email</label>
            <input className='form-control' type="email" id='em' />
            <label className='form-label' htmlFor="pw">Password</label>
            <input className='form-control' type="password" name="" id="pw" />
            <div className='d-flex justify-content-center'>
              <button className='btn btn-info my-3' type="submit">Login</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default Login