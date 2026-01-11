import { useState } from 'react'
import './App.css'
import Home from './assets/Components/Home'
import Notes from './assets/Components/Notes'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Header from './assets/Components/Header'
import Add from './assets/Components/Add'

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
        <Route path='/notes' element={<Notes id={notes.id} name={notes.name} notes={notes.notes} edit={notes.edit} del={notes.del_after} islock={notes.islocked} />} />
        <Route path='/add' element={<Add />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
