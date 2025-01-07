import React from 'react'
import { FiX } from 'react-icons/fi'; 

function Createguest() {
  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-8 relative">
        {/* Cancel Icon Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FiX className="h-6 w-6" aria-hidden="true" /> 
        </button>

        {/* Form Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-left border-b pb-4 border-gray-300">
          Add <span className="text-red-800">New</span> Guest
        </h1>
        <form>
          {/* Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm text-gray-600 mb-2">S.No</label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Role</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="Guest"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="123-456-7890"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Address</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="123 Main St"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Nationality</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="American"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Status</label>
              <select
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          {/* Submit Button */}
          <div className="text-left">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gray-600 text-white font-medium hover:bg-red-800 transition shadow-lg"
            >
              Save Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Createguest