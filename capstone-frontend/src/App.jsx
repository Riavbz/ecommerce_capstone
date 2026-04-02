import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { Route, Routes } from 'react-router'
import Footer from './components/Footer'
import Home from './pages/Home'
import StoreNavbar from './components/StoreNavbar'
import NotFound from './pages/NotFound'
import Critters from './pages/Critters'
import Checkout from './pages/Checkout'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cancel from './pages/Cancel';
import Success from './pages/Success';

const App = () => {
  return (
    <section className='app'>
      <StoreNavbar />
      <div className="grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/critters" element={<Critters />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
    </section>
  )
}

export default App