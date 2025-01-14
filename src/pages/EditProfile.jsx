import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

function EditProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    image: null, // Add image state
  });

  useEffect(() => {
    if (state?.profile) {
      setProfile(state.profile);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevState) => ({
          ...prevState,
          image: reader.result, // Store base64 string of image
        }));
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    navigate('/profile'); 
  };

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-8 relative">
        <button
          onClick={() => navigate('/profile')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-left border-b pb-4 border-gray-300">
          Edit Profile
        </h1>

        {/* Image Upload Section */}
        <div className="mb-6 text-center">
          <label htmlFor="profile-image" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
              {profile.image ? (
                <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Upload Image</span>
                </div>
              )}
            </div>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
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
                value={profile.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="john@example.com"
              />
            </div>
  
           
            <div>
              <label className="block text-sm text-gray-600 mb-2">Status</label>
              <select
                name="status"
                value={profile.status}
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

export default EditProfile;
