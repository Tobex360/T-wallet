import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Uregister from './pages/auth/Uregister'
// import Aregister from './pages/auth/Aregister'
import Ulogin from './pages/auth/Ulogin'
import Alogin from './pages/auth/Alogin'
import Features from './pages/features/Features'
import AdminDashboard from './pages/admin/AdminDashboard'
import Store from './pages/store/Store'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import OrderSuccess from './pages/checkout/OrderSuccess'
import Orders from './pages/checkout/Orders'
import Navebar from './components/Navebar'
import Footer from './components/Footer'
import Bct from './components/bct'
import { CartProvider } from './context/CartContext'

// Layout for regular pages (with navbar and footer)
function MainLayout({ children }) {
  return (
    <>
      <Navebar />
      {children}
      <Bct />
      <Footer />
    </>
  )
}

// Layout for admin pages (no navbar/footer)
function AdminLayout({ children }) {
  return <>{children}</>
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Regular pages with Navbar and Footer */}
          <Route path='/' element={<MainLayout><Landing /></MainLayout>} />
          <Route path='/uregister' element={<MainLayout><Uregister /></MainLayout>} />
          {/* <Route path='/aregister' element={<MainLayout><Aregister /></MainLayout>} /> */}
          <Route path='/ulogin' element={<MainLayout><Ulogin /></MainLayout>} />
          <Route path='/alogin' element={<MainLayout><Alogin /></MainLayout>} />
          <Route path='/register' element={<MainLayout><Uregister /></MainLayout>} />
          <Route path='/features' element={<MainLayout><Features /></MainLayout>} />
          <Route path='/store' element={<MainLayout><Store /></MainLayout>} />
          <Route path='/cart' element={<MainLayout><Cart /></MainLayout>} />
          <Route path='/checkout' element={<MainLayout><Checkout /></MainLayout>} />
          <Route path='/order-success/:orderId' element={<MainLayout><OrderSuccess /></MainLayout>} />
          <Route path='/orders' element={<MainLayout><Orders /></MainLayout>} />
          
          {/* Admin pages without Navbar and Footer */}
          <Route path='/adash' element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App