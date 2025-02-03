import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as favicon from "react-icons/fa";
import axios from "axios";
import { apiService } from "../services/apiservice";
import toast from "react-hot-toast";
import { UseAPiContext } from "../App";
import { useNavigate } from "react-router-dom";

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

const EditRoom = () => {
  const [facilitiesData, setFacilities] = useState([]);
  const { room } = UseAPiContext(); // Get the room from context
  const navigate = useNavigate();

  // Fetch facilities data
  useEffect(() => {
    const facilitiesList = async () => {
      try {
        const response = await apiService.getData("facility/list");
        setFacilities(response.data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
    facilitiesList();
  }, []);

  // Redirect if no room is selected
  useEffect(() => {
    if (!room) {
      navigate("/roommanagement/roominventory");
    }
  }, [room, navigate]);

  const id = room?._id;
  // Initial form values
  const initialValues = {
    roomTitle: room?.roomTitle || "",
    roomCode: room?.roomCode || "",
    roomType: room?.roomType || "",
    size: room?.size || "",
    maxPerson: room?.person || "",
    description: room?.description || "",
    facilities: room?.facilities || [],
    price: room?.price || "",
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("Selected Facilities:", values.facilities);

    const formData = new FormData();
    formData.append("roomTitle", values.roomTitle);
    formData.append("roomType", values.roomType);
    formData.append("description", values.description);
    formData.append("size", values.size);
    formData.append("person", values.maxPerson);
    formData.append("price", values.price);

  
    // Append facilities
    formData.append("facility", JSON.stringify(values.facilities));

    try {
      const response = await apiService.putData(`room/update/${id}`, formData);
      console.log("Response:", response.data);
      toast.success("Room updated successfully");
      navigate("/roommanagement/roominventory")
    } catch (error) {
      console.error("Error:", error.response?.data?.msg || error.message);
      toast.error("Error:", error.response?.data?.msg || error.message);
    }
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
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit a Room</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Room Title */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-1">
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
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <label htmlFor="description" className="block text-gray-700 mb-1">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Enter Description"
                className="w-full p-3 border border gray-300 rounded-lg"
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


            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end items-center col-span-1 sm:col-span-2 lg:col-span-3 space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
              >
                Update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditRoom;