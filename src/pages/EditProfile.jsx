import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EditProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    email: '',
    password: '',
    resetPassword: '',
  });

  useEffect(() => {
    if (state?.profile) {
      setProfile(state.profile);
    }
  }, [state]);

  const handleSave = (values) => {
    console.log(values);
    navigate('/profile');
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    resetPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full p-4 relative">
        <button
          onClick={() => navigate('/profile')}
          className="absolute top-8 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        <Formik
          initialValues={{
            email: profile.email,
            password: '',
            resetPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          <Form>
            {/* Profile Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="john@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-4">Account Settings</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="New Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <Field
                    type="password"
                    name="resetPassword"
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="resetPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 text-left">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-secondary text-white font-medium hover:bg-hoverbutton transition shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default EditProfile;
