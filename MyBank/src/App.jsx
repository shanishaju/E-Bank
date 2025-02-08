import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Employee from './pages/Employee'
import Registration from './pages/Registration'

function App() {
  return (
    <>
    <Routes>
        <Route path="/account" element={<Employee/>} />
        <Route path='/'  element={<Registration/>}/>
    </Routes>
      
    </>
  )
}

export default App
