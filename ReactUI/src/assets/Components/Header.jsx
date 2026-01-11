import React,{useState} from 'react'
import { Link } from 'react-router-dom'
const Header = (props) => {
  return (
    <>
    <header className='mb-3'>
        <nav className="navbar bg-secondary">
        <div className="container-fluid">
            <Link className='navbar-brand fs-3' to='/'>CodedPadPro</Link>

            <ul className="nav nav-pills">
            <li className="nav-item">
                <Link className='nav-link active' to='/add'>+</Link>
            </li>
            </ul>
        </div>
        </nav>
    </header>
    </>
  )
}

export default Header