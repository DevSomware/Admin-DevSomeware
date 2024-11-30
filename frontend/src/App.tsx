import React from 'react'
import { Loader } from './utils/utils-lib/Loader';
import { Routes, Route } from 'react-router-dom';
import Home from './utils/home/AdminLogin';
import About from './utils/home/About';
import AdminReset from './utils/home/AdminReset';
import Admin from './utils/admin/Admin';
import AdminForgot from './utils/home/AdminForgot';
const App = () => {
  return (
    <>
    <Loader/>
   <Routes>
   
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/reset" element={<AdminReset />} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/forgot" element={<AdminForgot/>} />
    </Routes>
    </>
  )
}

export default App
