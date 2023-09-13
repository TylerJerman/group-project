
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Frontend/NavBar';



function App() {

  return (
    <>

      <NavBar/>

      <main>
        <Outlet/>
      </main>
    
    </>
  )
}

export default App
