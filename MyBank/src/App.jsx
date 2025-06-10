import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Employee from './pages/Employee'
import Registration from './pages/Registration'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Employee />} />
        <Route path='/register' element={<Registration />} />
        <Route path='login' element={<Login/>}/>
        <Route path='/about' element={<AboutUs/>} />

      </Routes>

    </>
  )
}

export default App
