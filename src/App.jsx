import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Frontend/Home'
import SignUp from './Frontend/SignUp'
import LogIn from './Frontend/LogIn'
import RecipePage from './src/Frontend/RecipePage.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<LogIn/>}></Route>
          <Route path='/recipes' element={<RecipePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
