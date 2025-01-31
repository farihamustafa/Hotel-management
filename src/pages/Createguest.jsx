import React from 'react';
import { FiX } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { apiService } from '../services/apiservice';

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  contact: Yup.string(), // Optional but will be sent as empty string if blank
  address: Yup.string().required('Address is required'),
  CNIC: Yup.string().required('Nationality is required'),
  status: Yup.string().required('Status is required'),
});

function Createguest() {
  const initialValues = {
    username: '',
    email: '',
    contact: '',
    address: '',
    CNIC: '',
    password:'',
    status: 'Active',
  };

  const handleSubmit = async (values, {resetForm }) => {
    try {
      const updatedValues = {
        ...values,
        contact: values.contact || "", 
      };

      console.log('Submitting Data:', updatedValues);
      const response = await apiService.postData(`auth/usercreate`, { role: "Guest", ...updatedValues });
      console.log(response)
      if (response.msg) {
        toast.success(response.msg);
        resetForm(); 
      } else {
        toast.error(`Failed to create guest: ${response.error}`);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.errors;
      
      if (Array.isArray(errorMessage)) {
        if (errorMessage[0]?.msg) {
          toast.error(`Error: ${errorMessage[0].msg}`);
          console.log(errorMessage[0].msg); 
        }
      } else {
        const errorMsg = errorMessage?.msg || error?.msg;
        if (errorMsg) {
          toast.error(`Error: ${errorMsg}`);
          console.log(errorMsg);
        }
      }
    } 
};


  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center px-4">
      {/* Toaster to display notifications */}
      
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-8 relative">
        {/* Cancel Icon Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Form Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-left border-b pb-4 border-gray-300">
          Add <span className="text-red-800">New</span> Guest
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Input Grid */}
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
                    placeholder="123-456-7890"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
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
                    placeholder="American"
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
                    <option value="InActive">InActive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-600 text-sm mt-1" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-left">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-secondary text-white font-medium hover:bg-hoverbutton transition shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Guest"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Createguest;
