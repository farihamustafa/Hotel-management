import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmer,
  FaUtensils,
  FaDumbbell,
  FaGlassCheers,
  FaTshirt,
} from "react-icons/fa";

// Facilities data
const facilitiesData = [
  { name: "WiFi", icon: <FaWifi /> },
  { name: "Coffee", icon: <FaCoffee /> },
  { name: "Bath", icon: <FaBath /> },
  { name: "Parking Space", icon: <FaParking /> },
  { name: "Swimming Pool", icon: <FaSwimmer /> },
  { name: "Breakfast", icon: <FaUtensils /> },
  { name: "Gym", icon: <FaDumbbell /> },
  { name: "Drinks", icon: <FaGlassCheers /> },
  { name: "Laundry", icon: <FaTshirt /> },
];

// Validation schema using Yup
const validationSchema = Yup.object({
  roomTitle: Yup.string().required("Room title is required"),
  roomCode: Yup.string().required("Room code is required"),
  roomType: Yup.string().required("Room type is required"),
  size: Yup.number().required("Size is required"),
  maxPerson: Yup.number().required("Max person is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
});

const CreateRoom = () => {
  const initialValues = {
    roomTitle: "",
    roomCode: "",
    roomType: "",
    size: "",
    maxPerson: "",
    description: "",
    facilities: [],
    price: "",
    image:"",
    imagelg:""
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Submit form data to backend or perform desired actions
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create a Room</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Room Title */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <label htmlFor="roomTitle" className="block text-gray-700 mb-1">
                Room Title
              </label>
              <Field
                type="text"
                id="roomTitle"
                name="roomTitle"
                placeholder="Enter Room Title"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="roomTitle" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Room Code */}
            <div className="col-span-1">
              <label htmlFor="roomCode" className="block text-gray-700 mb-1">
                Room Code
              </label>
              <Field
                type="text"
                id="roomCode"
                name="roomCode"
                placeholder="Enter Room Code"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="roomCode" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Room Type */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-1">
              <label htmlFor="roomType" className="block text-gray-700 mb-1">
                Room Type
              </label>
              <Field
                type="text"
                id="roomType"
                name="roomType"
                placeholder="Enter Room Type"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="roomType" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Size */}
            <div className="col-span-1">
              <label htmlFor="size" className="block text-gray-700 mb-1">
                Size (sq. ft)
              </label>
              <Field
                type="number"
                id="size"
                name="size"
                placeholder="Enter Size"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="size" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Max Person */}
            <div className="col-span-1">
              <label htmlFor="maxPerson" className="block text-gray-700 mb-1">
                Max Person
              </label>
              <Field
                type="number"
                id="maxPerson"
                name="maxPerson"
                placeholder="Enter Max Person"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="maxPerson" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Description */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label htmlFor="description" className="block text-gray-700 mb-1">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Enter Description"
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
              />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Facilities */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="block text-gray-700 mb-2">Facilities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                {facilitiesData.map((facility) => (
                  <label key={facility.name} className="flex items-center">
                    <Field
                      type="checkbox"
                      name="facilities"
                      value={facility.name}
                      className="mr-2 rounded w-5 h-5 border border-gray-300"
                    />
                    <span className="flex items-center space-x-2">
                      {facility.icon}
                      <span>{facility.name}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-1">
              <label htmlFor="price" className="block text-gray-700 mb-1">
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                placeholder="Enter Price"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage name="price" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Images */} 
<div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 mb-1" htmlFor="image">
      Upload Image
    </label>
    <input
      type="file"
      id="image"
      name="image"
      onChange={(event) => setFieldValue("image", event.currentTarget.files)}
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
    />
  </div>
  <div>
    <label className="block text-gray-700 mb-1" htmlFor="imagelg">
      Upload Large Image
    </label>
    <input
      type="file"
      id="imagelg"
      name="imagelg"
      onChange={(event) => setFieldValue("imagelg", event.currentTarget.files)}
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
    />
  </div>
</div>


            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end items-center col-span-1 sm:col-span-2 lg:col-span-3 space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
              >
                Create
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateRoom;
