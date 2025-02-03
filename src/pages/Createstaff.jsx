import React from 'react';
import { FiX } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast'; // Import React Hot Toast
import { apiService } from '../services/apiservice';

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().required('Role is required'),
  address: Yup.string().required('Address is required'),
  CNIC: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in the format 12345-6789012-3')
    .required('CNIC is required'),
  status: Yup.string().required('Status is required'),
});

function Createstaff() {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    role: '', 
    contact: '',
    address: '',
    CNIC: '',
    status: 'Active',
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log('Form Values:', values);
    
    try {
      const updatedValues = { ...values, contact: values.contact || "" };
      console.log('Submitting Data:', updatedValues);  // Log data before sending it
    
      const response = await apiService.postData('auth/usercreate', { role: values.role, ...updatedValues });
    
      console.log('API Response:', response); // Log response for success
      if (response.msg) {
        toast.success("staff created Successfully");
        resetForm();
      } else {
        toast.error(`Failed to create staff: ${response.error}`);
      }
    } catch (error) {
      console.error('API POST Error:', error.response?.data || error.message);
      const errorMessage = error?.response?.data?.errors;
      if (Array.isArray(errorMessage)) {
        toast.error(`Error: ${errorMessage[0]?.msg}`);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
    
  };

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center px-4">
      <Toaster /> {/* Toast notification container */}
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-8 relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-left border-b pb-4 border-gray-300">
          Add <span className="text-red-800">New</span> Staff
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Name</label>
                  <Field
                    name="username"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="John Doe"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="john@example.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="********"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Role</label>
                  <Field
                    name="role"
                    as="select"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                  >
                    <option value="" disabled>Select a Role</option>
                    <option value="manager">Manager</option>
                    <option value="housekeeping">Housekeeping</option>
                    <option value="receptionist">Receptionist</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Phone</label>
                  <Field
                    name="contact"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="123-456-7890"
                  />
                  <ErrorMessage name="contact" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Address</label>
                  <Field
                    name="address"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="123 Main St"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">CNIC</label>
                  <Field
                    name="CNIC"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="12345-6789012-3"
                  />
                  <ErrorMessage name="CNIC" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Status</label>
                  <Field
                    name="status"
                    as="select"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                  >
                    <option value="Active">Active</option>
                    <option value="InActive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-600 text-sm mt-1" />
                </div>
              </div>

              <div className="text-left">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-secondary text-white font-medium hover:bg-hoverbutton transition shadow-lg"
                >
                  Create Staff
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Createstaff;
