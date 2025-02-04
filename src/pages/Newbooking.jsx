import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/apiservice';
import { BiCalendarStar } from 'react-icons/bi';

const NewBooking = () => {
  const [records, setRecords] = useState([]);
  const [additionalServicesOptions, setAdditionalServicesOptions] = useState([]);
  const [roomPrice, setRoomPrice] = useState(0); // Store the room price in state
  const [bill, setBill] = useState(0); // Store the total bill in state
  const { id } = useParams();
  const [newuser, setNewUser] = useState([]); // New user options
  const [loading, setLoading] = useState(true); // Loading state

  // Redirect if the id is undefined
  if (id === undefined) {
    window.location.href = '/';
  }

  // Fetch new users
  useEffect(() => {
    const fetchNewUser = async () => {
      try {
        const response = await apiService.postData('auth/list', { role_name: 'Guest' });
        console.log(response);
        setNewUser(response.data);
      } catch (error) {
        console.error('Error fetching new field options:', error);
        toast.error('Failed to load new field options.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewUser();
  }, []);

  // Fetch the booking data based on room id
  useEffect(() => {
    const bookingData = async () => {
      try {
        const response = await apiService.postData('booking/listbyroom', { room: id });
        if (response?.Bookingdata) {
          setRecords(response.Bookingdata);
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
        toast.error('Failed to fetch booking data.');
      }
    };

    bookingData();
  }, [id]);

  // Fetch room data and set roomPrice and initial bill
  useEffect(() => {
    const roomData = async () => {
      try {
        const response = await apiService.getData(`room/recordbyid/${id}`);
        if (response?.roomdata?.price) {
          setRoomPrice(response.roomdata.price); // Set room price to state
          setBill(response.roomdata.price); // Set initial bill with room price
        }
      } catch (error) {
        console.error('Error fetching room data:', error);
        toast.error('Failed to fetch room data.');
      }
    };
    roomData();
  }, [id]);

  // Fetch the additional services data
  useEffect(() => {
    const additionalServices = async () => {
      try {
        const response = await apiService.getData('a_service/list');
        if (response?.data) {
          const options = response.data.map(service => ({
            value: { _id: service._id, name: service.name, price: service.price },
            label: `${service.name} - $${service.price}`
          }));
          setAdditionalServicesOptions(options);
        } else {
          toast.error('Failed to load additional services.');
        }
      } catch (error) {
        console.error('Error fetching additional services:', error);
        toast.error('Failed to fetch additional services.');
      }
    };
    additionalServices();
  }, []);

  // Set initial values for the form
  const initialValues = {
    room: id,
    valid_from: '',
    valid_to: '',
    additionalServices: [],
    days: '',
    totalBill: bill,
    user: ''
  };

  // Validation schema
  const validationSchema = Yup.object({
    valid_from: Yup.string().required('Valid From date is required'),
    valid_to: Yup.string().required('Valid To date is required'),
    additionalServices: Yup.array().min(1, 'Please select at least one service').required(),
    days: Yup.number().min(1, 'Minimum 1 day').required('Number of days is required'),
    totalBill: Yup.number().required('Bill is required'),
    user: Yup.string().required('User is required') // Validate user selection
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    // Format the selected services to include only the _id
    const formattedServices = values.additionalServices.map(service => ({ service: service._id }));
    const requestBody = {
      room: id, // Assuming you pass room ID dynamically
      valid_from: values.valid_from,
      valid_to: values.valid_to,
      totalBill: values.bill,
      service: formattedServices,
      guest: values.user
    };

    console.log('Booking Request:', requestBody);

    try {
      const response = await apiService.postData('booking/createbydashboard', requestBody);
      console.log('Booking Data:', response);
      toast.success('Booking saved successfully!');
      window.location.href = `/newbooking/${id}`
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('An error occurred while saving the booking.');
    }
  };

  // Calculate the days difference between valid_from and valid_to
  const calculateDays = (validFrom, validTo) => {
    if (validFrom && validTo) {
      const fromDate = new Date(validFrom);
      const toDate = new Date(validTo);

      // Calculate the difference in time
      const diffTime = toDate - fromDate;

      // Convert time difference to days, and add 1 to include the first day
      const days = Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;

      return days;
    }
    return 0;
  };

  // Update the bill when services are selected
  const handleServiceChange = (selectedOptions, setFieldValue, values) => {
    const additionalPrice = selectedOptions.reduce((acc, option) => acc + option.value.price, 0);
    const totalPrice = roomPrice * values.days + additionalPrice; // Add room price for days to total
    setFieldValue('additionalServices', selectedOptions.map(option => option.value));
    setFieldValue('bill', totalPrice); // Update bill field with total price
    setBill(totalPrice); // Update the bill state dynamically
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-xl sm:text-3xl font-bold mb-4">
        New <span className="border-b-4 border-secondary-800">Booking</span>
      </h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Valid From Field */}
              <div>
                <label className="block text-sm font-medium mb-4">Valid From:</label>
                <Field
                  type="date"
                  name="valid_from"
                  className="w-full border rounded-md p-2"
                  onChange={e => {
                    const validFrom = e.target.value;
                    setFieldValue('valid_from', validFrom);
                    const days = calculateDays(validFrom, values.valid_to);
                    setFieldValue('days', days);
                    const totalBill = roomPrice * days + values.additionalServices.reduce((acc, service) => acc + service.price, 0);
                    setFieldValue('bill', totalBill);
                    setBill(totalBill);
                  }}
                />
                <ErrorMessage name="valid_from" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Valid To Field */}
              <div>
                <label className="block text-sm font-medium mb-4">Valid To:</label>
                <Field
                  type="date"
                  name="valid_to"
                  className="w-full border rounded-md p-2"
                  onChange={e => {
                    const validTo = e.target.value;
                    setFieldValue('valid_to', validTo);
                    const days = calculateDays(values.valid_from, validTo);
                    setFieldValue('days', days);
                    const totalBill = roomPrice * days + values.additionalServices.reduce((acc, service) => acc + service.price, 0);
                    setFieldValue('bill', totalBill);
                    setBill(totalBill);
                  }}
                />
                <ErrorMessage name="valid_to" component="div" className="text-red-600 text-sm" />
              </div>

              {/* User (Guest) Selection */}
              <div>
                <label className="block text-sm font-medium mb-4">Guest</label>
                <select
                  name="user"
                  className="w-full border rounded-md p-2"
                  onChange={e => setFieldValue('user', e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {newuser.map(option => (
                    <option key={option._id} value={option._id}>
                      {option.email}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="user" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Additional Services */}
              <div>
                <label className="block text-sm font-medium mb-4">Additional Services</label>
                <Select
                  isMulti
                  name="additionalServices"
                  options={additionalServicesOptions}
                  className="w-full"
                  onChange={selectedOptions => handleServiceChange(selectedOptions, setFieldValue, values)}
                />
                {errors.additionalServices && touched.additionalServices && (
                  <div className="text-red-600 text-sm">{errors.additionalServices}</div>
                )}
              </div>

              {/* Days */}
              <div>
                <label className="block text-sm font-medium mb-4">Days</label>
                <Field type="number" name="days" className="w-full border rounded-md p-2" readOnly />
                <ErrorMessage name="days" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Bill */}
              <div>
                <label className="block text-sm font-medium mb-4">Bill</label>
                <Field type="number" name="totalBill" value={bill} className="w-full border rounded-md p-2" readOnly />
                <ErrorMessage name="totalBill" component="div" className="text-red-600 text-sm" />
              </div>

              <br />
              <button type="submit" className="px-2 py-2 rounded-xl bg-secondary text-white font-medium hover:bg-hoverbutton transition shadow-lg mt-4">
                Create Booking
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Bookings Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 flex">
          Booked Dates <BiCalendarStar className="mt-1 mx-2" />
        </h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Booking Code</th>
              <th className="border border-gray-300 px-4 py-2">Guest</th>
              <th className="border border-gray-300 px-4 py-2">Valid From</th>
              <th className="border border-gray-300 px-4 py-2">Valid To</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map(record => (
                <tr key={record.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{record.booking_code}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.guest?.username || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.valid_from}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.valid_to}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No bookings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NewBooking;
