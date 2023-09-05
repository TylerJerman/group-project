import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Frontend/Home'
import SignUp from './Frontend/SignUp'
import LogIn from './Frontend/LogIn'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<LogIn/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
