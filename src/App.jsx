import { useState } from 'react'
import { Button } from "flowbite-react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Staffmanagement from './pages/Staffmanagement';
import Navbar from './components/Navbar';
import Authlayout from './layouts/Authlayout';
import Guestmanagement from './pages/Guestmanagement';


function App() {


  return (<>
  <BrowserRouter>
  <Routes>
  <Route path='/staffmanagement' element={<Authlayout><Staffmanagement/></Authlayout>}  />
  <Route path='/guestmanagement' element={<Authlayout><Guestmanagement/></Authlayout>}  />
  </Routes>
  </BrowserRouter>

    </>
  )
}

export default App
