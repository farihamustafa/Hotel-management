import React, { useState } from 'react';
import { FaWifi, FaSwimmingPool, FaParking } from 'react-icons/fa'; // Example icons

function Additionalservice() {
  // State to manage the facilities and additional services
  const [facilities, setFacilities] = useState([
    { id: 1, icon: <FaWifi />, text: 'Free Wi-Fi' },
    { id: 2, icon: <FaSwimmingPool />, text: 'Swimming Pool' },
    { id: 3, icon: <FaParking />, text: 'Free Parking' }
  ]);
  
  const [additionalServices, setAdditionalServices] = useState([
    'Laundry', 'Room Service', 'Airport Shuttle'
  ]);

  const [facilityInput, setFacilityInput] = useState('');
  const [serviceInput, setServiceInput] = useState('');

  // Handler for adding a new facility
  const addFacility = () => {
    if (facilityInput.trim()) {
      setFacilities([...facilities, { id: facilities.length + 1, icon: null, text: facilityInput }]);
      setFacilityInput(''); // Clear input after adding
    }
  };

  // Handler for adding a new additional service
  const addService = () => {
    if (serviceInput.trim()) {
      setAdditionalServices([...additionalServices, serviceInput]);
      setServiceInput(''); // Clear input after adding
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Facilities Block */}
      <div className="border border-gray-300 rounded-lg p-6 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Facilities</h2>
        <ul className="list-none space-y-2">
          {facilities.map((facility) => (
            <li key={facility.id} className="flex items-center space-x-2">
              {facility.icon} <span>{facility.text}</span>
            </li>
          ))}
        </ul>
        {/* Input and button to add a new facility */}
        <div className="mt-4">
          <input
            type="text"
            value={facilityInput}
            onChange={(e) => setFacilityInput(e.target.value)}
            placeholder="Add new facility"
            className="border border-gray-300 rounded p-2 mr-2"
          />
          <button
            onClick={addFacility}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Facility
          </button>
        </div>
      </div>

      {/* Additional Services Block */}
      <div className="border border-gray-300 rounded-lg p-6 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Additional Services</h2>
        <ul className="list-none space-y-2">
          {additionalServices.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
        {/* Input and button to add a new additional service */}
        <div className="mt-4">
          <input
            type="text"
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            placeholder="Add new service"
            className="border border-gray-300 rounded p-2 mr-2"
          />
          <button
            onClick={addService}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default Additionalservice;
