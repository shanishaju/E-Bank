import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Employee from './pages/Employee'

function App() {
  return (
    <>
    <Routes>
        <Route path="/account" element={<Employee/>} />
    </Routes>
      
    </>
  )
}

export default App
