import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Uregister from './pages/auth/Uregister'
import Ulogin from './pages/auth/Ulogin'
import Features from './pages/features/Features'
import Store from './pages/store/Store'
import Navebar from './components/Navebar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Navebar />
      <Routes>
        <Route path='/' element={<Landing />} index/>
        <Route path='/uregister' element={<Uregister />} />
        <Route path='/ulogin' element={<Ulogin />} />
        <Route path='/register' element={<Uregister />} />
        <Route path='/features' element={<Features />} />
        <Route path='/store' element={<Store />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App