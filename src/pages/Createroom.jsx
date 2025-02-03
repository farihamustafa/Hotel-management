import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as favicon from "react-icons/fa";
import axios from "axios";
import { apiService } from "../services/apiservice";

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
  const [facilitiesData, setFacilities] = useState([]);

  // Fetch facilities data
  useEffect(() => {
    const facilitiesList = async () => {
      try {
        const response = await apiService.getData("facility/list");
        console.log(response.data);
        setFacilities(response.data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
    facilitiesList();
  }, []);

  // Initial form values
  const initialValues = {
    roomTitle: "",
    roomCode: "",
    roomType: "",
    size: "",
    maxPerson: "",
    description: "",
    facilities: [],
    price: "",
    image: "",
    imagelg: "",
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("Selected Facilities:", values.facilities);  // Log the selected facilities

    const formData = new FormData();
    formData.append("roomTitle", values.roomTitle);
    formData.append("roomCode", values.roomCode);
    formData.append("roomType", values.roomType);
    formData.append("description", values.description);
    formData.append("size", values.size);
    formData.append("person", values.maxPerson);
    formData.append("price", values.price);

    // Convert image files to Base64 if provided
    if (values.image) {
        const base64Image = await encodeImageToBase64(values.image[0]);
        formData.append("image", base64Image);
    }

    if (values.imagelg) {
        const base64ImageLg = await encodeImageToBase64(values.imagelg[0]);
        formData.append("imagelg", base64ImageLg);
    }

    // Log facilities before appending them
    console.log("Formatted Facilities:", values.facilities);

    // Append facilities (ensure it's an array)
    formData.append("facility", JSON.stringify(values.facilities));

    try {
        const response = await axios.post("http://localhost:90/api/v1/room/create", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error:", error.response?.data?.msg || error.message);
    }
};


  // Function to encode images to Base64
  const encodeImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Handle facility checkbox changes
  const handleFacilityChange = (e, setFieldValue, facilities) => {
    const { checked, value } = e.target;

    if (checked) {
      setFieldValue("facilities", [...facilities, value]);
    } else {
      setFieldValue("facilities", facilities.filter((facilityId) => facilityId !== value));
    }
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a Room</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
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
                as="select"
                id="roomType"
                name="roomType"
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Room Type</option>
                <option value="doubleBed">doubleBed</option>
                <option value="singleBed">singleBed</option>
                <option value="Luxury">Luxury Room</option>
              </Field>
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
                {facilitiesData.map((facility) => {
                  const IconComponent = favicon[facility.icon];
                  return (
                    <label key={facility._id} className="flex items-center">
                      <Field
                        type="checkbox"
                        name="facilities"
                        value={facility._id}
                        onChange={(e) => handleFacilityChange(e, setFieldValue, values.facilities)}
                        className="mr-2 w-5 h-5 border border-gray-300"
                      />
                      {IconComponent && <IconComponent className="text-gray-700" />}
                      <span> - {facility.name}</span>
                    </label>
                  );
                })}
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateRoom;
