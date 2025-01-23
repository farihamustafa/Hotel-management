import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';

const NewBooking = () => {
  const initialValues = {
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    roomType: 'Single Room',
    roomNumber: '',
    clientName: '',
    address: '',
    country: '',
    email: '',
    phone: '',
    additionalServices: [],
    price: 150,
    paid: '',
    balance: '',
  };

  const validationSchema = Yup.object({
    checkInDate: Yup.date().required('Check-in date is required'),
    checkOutDate: Yup.date()
      .required('Check-out date is required')
      .min(Yup.ref('checkInDate'), 'Check-out date must be after check-in date'),
    guests: Yup.number().min(1, 'Minimum 1 guest').required('Number of guests is required'),
    roomType: Yup.string().required('Room type is required'),
    roomNumber: Yup.string().required('Room number is required'),
    clientName: Yup.string().required('Client name is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    additionalServices: Yup.array().min(1, 'Please select at least one service').required(),
    price: Yup.number().required('Price is required'),
    paid: Yup.string().required('Payment method is required'),
    balance: Yup.string().required('Balance is required'),
  });

  const handleSubmit = (values) => {
    console.log('Booking Data:', values);
    toast.success('Booking saved successfully!');
  };

  const additionalServicesOptions = [
    { value: 'Room Service', label: 'Room Service' },
    { value: 'Wake-up Call', label: 'Wake-up Call' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Laundry', label: 'Laundry' },
    { value: 'Meal Service', label: 'Meal Service' },
  ];

  return (
   <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          New <span className="border-b-4 border-red-800">Booking</span>
        </h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* About Booking Section */}
              <div>
                <h2 className="text-lg font-semibold mb-4">About Booking</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Check-in Date</label>
                    <Field type="date" name="checkInDate" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="checkInDate" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Check-out Date</label>
                    <Field type="date" name="checkOutDate" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="checkOutDate" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Guests</label>
                    <Field type="number" name="guests" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="guests" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Room Type</label>
                    <Field as="select" name="roomType" className="w-full border rounded-md p-2">
                      <option value="Single Room">Single Room</option>
                      <option value="Double Room">Double Room</option>
                    </Field>
                    <ErrorMessage name="roomType" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Room number</label>
                    <Field type="text" name="roomNumber" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="roomNumber" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
              </div>

              {/* About Client Section */}
              <div>
                <h2 className="text-lg font-semibold mb-4">About Client</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <Field type="text" name="clientName" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="clientName" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Address</label>
                    <Field type="text" name="address" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Country</label>
                    <Field type="text" name="country" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="country" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <Field type="email" name="email" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <Field type="text" name="phone" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Additional Services</label>
                    <Select
                      isMulti
                      name="additionalServices"
                      options={additionalServicesOptions}
                      className="w-full"
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          'additionalServices',
                          selectedOptions.map((option) => option.value)
                        )
                      }
                    />
                    {errors.additionalServices && touched.additionalServices && (
                      <div className="text-red-600 text-sm">{errors.additionalServices}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* About Balance Section */}
              <div>
                <h2 className="text-lg font-semibold mb-4">About Balance</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Price</label>
                    <Field type="number" name="price" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="price" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Paid</label>
                    <Field as="select" name="paid" className="w-full border rounded-md p-2">
                      <option value="">Select Payment Method</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Checkout">Checkout</option>
                    </Field>
                    <ErrorMessage name="paid" component="div" className="text-red-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Balance</label>
                    <Field type="text" name="balance" className="w-full border rounded-md p-2" />
                    <ErrorMessage name="balance" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-right">
              <button
                type="submit"
                className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Book Now
              </button>
            </div>
          </Form>
        )}
      </Formik>
      </>
  );
};

export default NewBooking;
