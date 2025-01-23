import React, { useState, useEffect } from 'react';
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
    <div className="bg-slate-200 min-h-screen flex items-start justify-center px-4 py-8">
   
        <div className="max-w-3xl w-full p-6 bg-white shadow-md rounded-lg">
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
          <Form className="space-y-6">
            {/* Profile Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-700">Profile Information</h2>
              <div className="max-w-3xl w-full p-6 bg-white shadow-md rounded-lg">
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
        
            {/* Space between Profile Information and Reset Password */}
            <div className="my-6 border-t border-gray-300"></div>

            {/* Reset Password */}
            <div className="max-w-3xl w-full p-6 bg-white shadow-md rounded-lg">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-700">Reset Password</h2>
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
