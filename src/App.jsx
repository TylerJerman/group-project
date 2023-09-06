import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Timeline from './Frontend/Timeline'
import Home from './Frontend/Home'
import SignUp from './Frontend/SignUp'
import LogIn from './Frontend/LogIn'
import RecipePage from './src/Frontend/RecipePage.jsx'
import axios from 'axios'
import { NavLink, Outlet } from 'react-router-dom'
import RecipePage from './Frontend/RecipePage'

function App() {

  return (
    <>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/recipes">timeline</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign up</NavLink>
          </li>
        </ul>
      </nav> 









{/* 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<LogIn/>}></Route>
          <Route path='/recipes' element={<Timeline/>}
            loader={async () => {
              const res = await axios.get("/api/recipes");
              {
                
              }
              return { recipes: res.data };
            }}
          
          ></Route>
        </Routes>
      </BrowserRouter> */}



      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
