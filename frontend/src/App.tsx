import React from 'react'

import { Routes, Route } from 'react-router-dom';
import Home from './utils/home/Home';
import About from './utils/home/About';
const App = () => {
  return (
    <>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </>
  )
}

export default App
