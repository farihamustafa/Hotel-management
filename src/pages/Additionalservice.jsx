import React from 'react';
import { FaWifi, FaSwimmingPool, FaParking, FaCoffee, FaUtensils } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation Schema for Facilities and Additional Services
const facilityValidationSchema = Yup.object().shape({
  facility: Yup.string().required('Facility is required'),
  icon: Yup.string().required('Icon selection is required'),
});

const serviceValidationSchema = Yup.object().shape({
  service: Yup.string().required('Service is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
});

function Additionalservice() {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-6">
      
      {/* Facilities Column */}
      <div className="flex-1 flex flex-col space-y-4">

        {/* Add New Facility */}
        <div className="border border-gray-300 rounded-lg p-4 md:p-6 bg-gray-100">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Add New Facility</h2>

          <Formik
            initialValues={{ facility: '', icon: '' }}
            validationSchema={facilityValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // Handle form submission
              console.log('Facility added:', values);
              resetForm();
            }}
          >
            {() => (
              <Form className="flex flex-wrap gap-2">
                <Field
                  type="text"
                  name="facility"
                  placeholder="Add new facility"
                  className="flex-1 border border-gray-300 rounded p-2"
                />
                <ErrorMessage name="facility" component="div" className="text-red-500 text-sm" />
                
                <Field as="select" name="icon" className="flex-1 border border-gray-300 rounded p-2">
                  <option value="">Select Icon</option>
                  <option value="FaWifi">Free Wi-Fi</option>
                  <option value="FaSwimmingPool">Swimming Pool</option>
                  <option value="FaParking">Free Parking</option>
                  <option value="FaCoffee">Coffee</option>
                  <option value="FaUtensils">Restaurant</option>
                </Field>
                <ErrorMessage name="icon" component="div" className="text-red-500 text-sm" />

                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 md:py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
                >
                  Add Facility
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Existing Facilities */}
        <div className="border border-gray-300 rounded-lg p-4 md:p-6 bg-gray-100">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Existing Facilities</h2>
          <ul className="list-none space-y-2">
            <li className="flex items-center space-x-2">
              <FaWifi /> <span>Free Wi-Fi</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaSwimmingPool /> <span>Swimming Pool</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaParking /> <span>Free Parking</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Additional Services Column */}
      <div className="flex-1 flex flex-col space-y-4">

        {/* Add New Additional Service */}
        <div className="border border-gray-300 rounded-lg p-4 md:p-6 bg-gray-100">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Add New Additional Service</h2>

          <Formik
            initialValues={{ service: '', price: '' }}
            validationSchema={serviceValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // Handle form submission
              console.log('Service added:', values);
              resetForm();
            }}
          >
            {() => (
              <Form className="flex flex-wrap gap-2">
                <Field
                  type="text"
                  name="service"
                  placeholder="Add new service"
                  className="flex-1 border border-gray-300 rounded p-2"
                />
                <ErrorMessage name="service" component="div" className="text-red-500 text-sm" />

                <Field
                  type="text"
                  name="price"
                  placeholder="Price (USD)"
                  className="flex-1 border border-gray-300 rounded p-2"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />

                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 md:py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
                >
                  Add Service
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Existing Additional Services */}
        <div className="border border-gray-300 rounded-lg p-4 md:p-6 bg-gray-100">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Existing Additional Services</h2>
          <ul className="list-none space-y-2">
            <li className="flex justify-between">
              <span>Laundry</span>
              <span>$10.00</span>
            </li>
            <li className="flex justify-between">
              <span>Room Service</span>
              <span>$15.00</span>
            </li>
            <li className="flex justify-between">
              <span>Airport Shuttle</span>
              <span>$25.00</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Additionalservice;
