import { useState } from 'react'
import './App.css'
import Home from './assets/Components/Home'
import Notes from './assets/Components/Notes'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Header from './assets/Components/Header'
import Add from './assets/Components/Add'
import Login from './assets/Components/Login'

function App() {
  const [notes, setNotes] = useState({})

  return (
    <>
      <BrowserRouter>
      {
        notes.name ? (<Header name={notes.name} notes={notes.notes} />) : (<Header />)
      }
      
      <Routes>
        <Route path='/' element={<Home note={setNotes} />} />
        <Route path='/notes' element={<Notes name={notes.name} notes={notes.notes} />} />
        <Route path='/add' element={<Add />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
