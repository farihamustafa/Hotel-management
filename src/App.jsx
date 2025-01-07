import { useState } from 'react'
import { Button } from "flowbite-react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Staffmanagement from './pages/Staffmanagement';
import Navbar from './components/Navbar';
import Authlayout from './layouts/Authlayout';
import Guestmanagement from './pages/Guestmanagement';
import Home from './pages/Home';
import Createstaff from './pages/Createstaff';
import RoomInventory from './pages/Roominventory';
import RoomBooking from './pages/Roombooking';
import Createguest from './pages/Createguest';
import Newbooking from './pages/Newbooking';


function App() {


  return (<>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Authlayout><Home/></Authlayout>}  />
  <Route path='/staffmanagement' element={<Authlayout><Staffmanagement/></Authlayout>}  />
  <Route path='/guestmanagement' element={<Authlayout><Guestmanagement/></Authlayout>}  />
  <Route path='/createstaff' element={<Authlayout><Createstaff/></Authlayout>}  />
  <Route path='/createguest' element={<Authlayout><Createguest/></Authlayout>}  />
  <Route path='/roommanagement/roominventory' element={<Authlayout><RoomInventory/></Authlayout>}  />
  <Route path='/roombooking' element={<Authlayout><RoomBooking/></Authlayout>}  />
  <Route path='/newbooking' element={<Authlayout><Newbooking/></Authlayout>}  />
  v
  </Routes>
  </BrowserRouter>

    </>
  )
}

export default App
