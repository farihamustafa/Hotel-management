import React from "react";

const CreateRoom = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Create a Room</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-700">
            {[
              "WiFi",
              "Coffee",
              "Bath",
              "Parking Space",
              "Swimming Pool",
              "Breakfast",
              "Gym",
              "Drinks",
              "Laundry",
            ].map((facility) => (
              <label key={facility} className="flex items-center">
                <input
                  type="checkbox"
                  name="facilities"
                  value={facility}
                  className="mr-2"
                />
                {facility}
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

        {/* Images (Side by side) */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex space-x-4">
          <div className="w-full">
            <label className="block text-gray-700 mb-1" htmlFor="file_input_1">
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input_1"
              type="file"
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 mb-1" htmlFor="file_input_2">
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input_2"
              type="file"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center col-span-1 sm:col-span-2 lg:col-span-3">
          <button
            type="button"
            className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
          >
            Create Room
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateRoom;
