import React from "react";
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

const CreateRoom = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create a Room</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Room Title */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label htmlFor="roomTitle" className="block text-gray-700 mb-1">
            Room Title
          </label>
          <input
            type="text"
            id="roomTitle"
            name="roomTitle"
            placeholder="Enter Room Title"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Room Type */}
        <div>
          <label htmlFor="roomType" className="block text-gray-700 mb-1">
            Room Type
          </label>
          <input
            type="text"
            id="roomType"
            name="roomType"
            placeholder="Enter Room Type"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Size */}
        <div>
          <label htmlFor="size" className="block text-gray-700 mb-1">
            Size (sq. ft)
          </label>
          <input
            type="number"
            id="size"
            name="size"
            placeholder="Enter Size"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Max Person */}
        <div>
          <label htmlFor="maxPerson" className="block text-gray-700 mb-1">
            Max Person
          </label>
          <input
            type="number"
            id="maxPerson"
            name="maxPerson"
            placeholder="Enter Max Person"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Description"
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Facilities */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label className="block text-gray-700 mb-2">Facilities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
            {facilitiesData.map((facility) => (
              <label key={facility.name} className="flex items-center">
                <input
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
        <div>
          <label htmlFor="price" className="block text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter Price"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Images */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="file_input_1">
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              id="file_input_1"
              type="file"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="file_input_2">
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              id="file_input_2"
              type="file"
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
            className="px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 text-white transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateRoom;
