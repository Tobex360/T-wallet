import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Features from './pages/features/Features'
import Navebar from './components/Navebar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Navebar />
      <Routes>
        <Route path='/' element={<Landing />} index/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/features' element={<Features />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App