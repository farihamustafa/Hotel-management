import React from 'react';
import { FiX } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast'; // Import React Hot Toast

// Validation schema
const validationSchema = Yup.object().shape({
  sno: Yup.number().required('S.No is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().required('Role is required'),
  phone: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in the format 123-456-7890')
    .required('Phone is required'),
  address: Yup.string().required('Address is required'),
  cnic: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in the format 12345-6789012-3')
    .required('CNIC is required'),
  status: Yup.string().required('Status is required'),
});

function Createstaff() {
  const initialValues = {
    sno: '',
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    cnic: '',
    status: 'active',
  };

  const handleSubmit = (values) => {
    console.log('Form Data:', values);

    // Show success toast
    toast.success('New staff created successfully!', {
      position: 'top-center',
      duration: 3000,
    });

    // Perform further actions like sending data to the server
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
                  <label className="block text-sm text-gray-600 mb-2">S.No</label>
                  <Field
                    name="sno"
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="1"
                  />
                  <ErrorMessage name="sno" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="John Doe"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
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
                  <label className="block text-sm text-gray-600 mb-2">Role</label>
                  <Field
                    name="role"
                    as="select"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                  >
                    <option value="">Select a Role</option>
                    <option value="manager">Manager</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="receptionist">Receptionist</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Phone</label>
                  <Field
                    name="phone"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="123-456-7890"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-600 text-sm mt-1" />
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
                    name="cnic"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                    placeholder="12345-6789012-3"
                  />
                  <ErrorMessage name="cnic" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Status</label>
                  <Field
                    name="status"
                    as="select"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:bg-white focus:border-blue-400 focus:outline-none transition"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-600 text-sm mt-1" />
                </div>
              </div>

              <div className="text-left">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-secondary text-white font-medium hover:bg-hoverbutton transition shadow-lg"
                >
                  Save Staff
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