
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import BlogFormPage from './pages/BlogFormPage'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/blogform' element={<BlogFormPage/>}/>
    </Routes>
    </>
  )
}

export default App
