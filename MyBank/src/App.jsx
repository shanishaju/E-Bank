import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Employee from './pages/Employee'
import Registration from './pages/Registration'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import { Toaster } from 'sonner'
import Profile from './pages/Profile'
import KycVerification from './pages/KycVerification'
import './App.css'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Employee />} />
        <Route path='/register' element={<Registration />} />
        <Route path='login' element={<Login/>}/>
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/my-profile' element={<Profile/>}/>
        <Route path= '/kyc-verification' element={<KycVerification/>}/>

      </Routes>

      <Toaster richColors position="top-center" duration={2000}/>
 
    </>
  )
}

export default App
