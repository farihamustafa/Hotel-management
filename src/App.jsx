
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Staffmanagement from './pages/Staffmanagement';
import Authlayout from './layouts/Authlayout';
import Guestmanagement from './pages/Guestmanagement';
import Home from './pages/Home';
import Createstaff from './pages/Createstaff';
import RoomInventory from './pages/Roominventory';
import RoomBooking from './pages/Roombooking';
import Createguest from './pages/Createguest';
import Newbooking from './pages/Newbooking';

import Notification from './pages/Notification';
import LoginPage from './pages/Loginpage';

import EditStaff from './pages/EditStaff';

import EditGuest from './pages/EditGuest';
import CreateRoom from './pages/Createroom';

import Task from './pages/Task';
import Taskdetail from './pages/Taskdetail';
import Additionalservice from './pages/Additionalservice';
import EditProfile from './pages/EditProfile';
import { apiService } from './services/apiservice';
import { createContext, useContext, useEffect ,useState} from 'react';
import EditRoom from './pages/EditRoom';
import Taskassign from './pages/Taskassign';

const context=createContext()
export function UseAPiContext(){
  return useContext(context)
}


function App() {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [user, setuser] = useState(false);
const [room, setRoom] = useState(false);
console.log("data : "+user)
  return (<context.Provider value={{user,setuser,room, setRoom}}>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Authlayout><Home/></Authlayout>}  />
  <Route path='/staffmanagement' element={<Authlayout><Staffmanagement/></Authlayout>}  />
  <Route path="/editstaff/:id" element={<Authlayout><EditStaff/></Authlayout>}/>
  <Route path="/editguest/:id" element={<Authlayout><EditGuest/></Authlayout>}/>
  <Route path="/roommanagement/editroom" element={<Authlayout><EditRoom/></Authlayout>}/>

  <Route path='/guestmanagement' element={<Authlayout><Guestmanagement/></Authlayout>}  />
  <Route path='/createstaff' element={<Authlayout><Createstaff/></Authlayout>}  />
    <Route path='/createguest' element={<Authlayout><Createguest/></Authlayout>}  />
  <Route path='/roommanagement/roominventory' element={<Authlayout><RoomInventory/></Authlayout>}  />
  <Route path='/roommanagement/roombooking' element={<Authlayout><RoomBooking/></Authlayout>}  />
  <Route path='/newbooking/:id' element={<Authlayout><Newbooking/></Authlayout>}  />
  <Route path='/roommanagement/createroom' element={<Authlayout><CreateRoom/></Authlayout>}  />
  <Route path='/housekeeping/tasks/taskdetails' element={<Authlayout><Taskdetail/></Authlayout>}  />

  <Route path='/notifications' element={<Authlayout><Notification/></Authlayout>}  />
  <Route path='/housekeeping/tasks' element={<Authlayout><Task/></Authlayout>}  />
  <Route path='/additionalservices' element={<Authlayout><Additionalservice/></Authlayout>}  />
  <Route path='/profile' element={<Authlayout><EditProfile/></Authlayout>}  />
  <Route path='/housekeeping/taskassign' element={<Authlayout><Taskassign/></Authlayout>}  />
 

    <Route path='/login' element={<LoginPage/>}/>
    </Routes></BrowserRouter>

    </context.Provider>
  )
}

export default App
