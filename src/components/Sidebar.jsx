import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { 
  FaTachometerAlt, FaUsers, FaHotel, FaDoorOpen, 
  FaBed, FaCalendarCheck, FaPlusSquare, FaBroom, 
  FaTasks, FaCog 
} from "react-icons/fa";

const SideNavigation = () => {
  const [isRoomDropdownOpen, setRoomDropdownOpen] = useState(false);
  const [isHousekeepingDropdownOpen, setHousekeepingDropdownOpen] = useState(false);
  const [role, setRole] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Decode token and set role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.rolename);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Helper function to check if the link is active
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="min-h-screen w-64 p-4 shadow-lg bg-white text-secondary">
      <ul className="space-y-2">
        {/* Logo */}
        <li className="flex justify-center">
          <Link to="/" className="w-full p-2">
            <img src="/assets/logo/logo.png" alt="Logo" className="w-56 h-56 object-contain" />
          </Link>
        </li>

        {/* Dashboard (Visible to all) */}
        <li>
          <Link to="/" className={`flex items-center p-2 rounded-lg transition-all ${isActive("/") ? "bg-primary text-white" : "hover:bg-primary hover:shadow-md hover:text-white"}`}>
            <FaTachometerAlt className="text-xl mr-4" />
            <span className="text-lg font-semibold">Dashboard</span>
          </Link>
        </li>

        {/* Staff Management (Only for SuperAdmin & Manager) */}
        {(role === "SuperAdmin" || role === "manager") && (
          <li>
            <Link to="/staffmanagement" className={`flex items-center p-2 rounded-lg transition-all ${isActive("/staffmanagement") ? "bg-primary text-white" : "hover:bg-primary hover:shadow-md hover:text-white"}`}>
              <FaUsers className="text-xl mr-4" />
              <span className="text-lg font-semibold">Staff Management</span>
            </Link>
          </li>
        )}

        {/* Guest Management (For SuperAdmin, Manager, Receptionist) */}
        {(role === "SuperAdmin" || role === "manager" || role === "receptionist") && (
          <li>
            <Link to="/guestmanagement" className={`flex items-center p-2 rounded-lg transition-all ${isActive("/guestmanagement") ? "bg-primary text-white" : "hover:bg-primary hover:shadow-md hover:text-white"}`}>
              <FaHotel className="text-xl mr-4" />
              <span className="text-lg font-semibold">Guest Management</span>
            </Link>
          </li>
        )}

        {/* Room Management (For SuperAdmin, Manager, Receptionist) */}
        {(role === "SuperAdmin" || role === "manager" || role === "receptionist") && (
          <li>
            <div onClick={() => setRoomDropdownOpen(!isRoomDropdownOpen)} className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${isRoomDropdownOpen ? "bg-primary text-white" : "hover:bg-primary hover:shadow-md hover:text-white"}`}>
              <FaDoorOpen className="text-xl mr-4" />
              <span className="text-lg font-semibold">Manage Room</span>
              <span className={`ml-auto text-sm transition-transform ${isRoomDropdownOpen ? "rotate-180" : ""}`}>▼</span>
            </div>
            {isRoomDropdownOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/roommanagement/roominventory" className={`flex items-center p-1 rounded-lg transition-all ${isActive("/roommanagement") ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}`}>
                    <FaBed className="text-xl mr-4" />
                    <span className="text-md">Room Inventory</span>
                  </Link>
                </li>
                <li>
                  <Link to="/roommanagement/roombooking" className={`flex items-center p-1 rounded-lg transition-all ${isActive("/roommanagement/roombooking") ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}`}>
                    <FaCalendarCheck className="text-xl mr-4" />
                    <span className="text-md">Room Booking</span>
                  </Link>
                </li>
                <li>
                  <Link to="/updatebooking" className={`flex items-center p-1 rounded-lg transition-all ${isActive("/updatebooking") ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}`}>
                    <FaCalendarCheck className="text-xl mr-4" />
                    <span className="text-md">Booking History</span>
                  </Link>
                </li>
                <li>
                  <Link to="/roommanagement/createroom" className={`flex items-center p-1 rounded-lg transition-all ${isActive("/roommanagement/createroom") ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}`}>
                    <FaPlusSquare className="text-xl mr-4" />
                    <span className="text-md">Create Room</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Housekeeping (Only for Housekeeping) */}
        {role === "housekeeping" && (
          <li>
            <div onClick={() => setHousekeepingDropdownOpen(!isHousekeepingDropdownOpen)} className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${isHousekeepingDropdownOpen ? "bg-primary text-white" : "hover:bg-primary hover:shadow-md hover:text-white"}`}>
              <FaBroom className="text-xl mr-4" />
              <span className="text-lg font-semibold">Housekeeping</span>
              <span className={`ml-auto text-sm transition-transform ${isHousekeepingDropdownOpen ? "rotate-180" : ""}`}>▼</span>
            </div>
            {isHousekeepingDropdownOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/housekeeping/tasks" className={`flex items-center p-1 rounded-lg transition-all ${isActive("/housekeeping/tasks") ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}`}>
                    <FaTasks className="text-xl mr-4" />
                    <span className="text-md">Tasks</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Additional Services (Only for SuperAdmin & Manager) */}
        {(role === "SuperAdmin" || role === "manager") && (
          <li>
            <Link to="/additionalservices" className={`flex items-center p-2 rounded-lg transition-all ${isActive("/additionalservices") ? "bg-primary text-white" : "hover:bg-primary hover:shadow-md hover:text-white"}`}>
              <FaCog className="text-xl mr-4" />
              <span className="text-lg font-semibold">Additional Services</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNavigation;
