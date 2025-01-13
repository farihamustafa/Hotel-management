import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

function EditStaff() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    serialNo: '',
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    cnic: '',
    status: 'active',
  });

  useEffect(() => {
    if (state?.staff) {
      setStaff(state.staff);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save the updated staff data (e.g., API call or state update)
    navigate('/staffmanagement'); // Navigate back to Staff Management
  };

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-8 relative">
        <button
          onClick={() => navigate('/staffmanagement')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-left border-b pb-4 border-gray-300">
          Edit <span className="text-red-800">{staff.name}</span>
        </h1>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm text-gray-600 mb-2">S.No</label>
              <input
                type="number"
                name="serialNo"
                value={staff.serialNo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={staff.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={staff.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={staff.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="Manager"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={staff.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="123-456-7890"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={staff.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="123 Main St"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">CNIC</label>
              <input
                type="text"
                name="cnic"
                value={staff.cnic}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="12345-6789012-3"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Status</label>
              <select
                name="status"
                value={staff.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="text-left">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-secondary text-white font-medium hover:bg-hoverbutton transition shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStaff;
