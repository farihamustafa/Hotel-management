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
    // Handle form submission (e.g., save profile changes)
    console.log(values);
    navigate('/profile');
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    resetPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-8 relative">
        <button
          onClick={() => navigate('/profile')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4 text-center border-gray-400">
          Edit Profile
        </h1>

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
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Profile Information</label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-xl border bg-gray-200 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="john@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="New Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Reset Password Field */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Confirm Password</label>
              <Field
                type="password"
                name="resetPassword"
                className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="resetPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="text-left">
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
