import React, { useState } from 'react';

function NewBooking() {
  // State to handle form data
  const [formData, setFormData] = useState({
    dates: '',
    nights: 1,
    guests: 1,
    roomType: 'Single Room',
    roomNumber: '',
    hour: '',
    referral: '',
    referralOrderId: '',
    personalCode: '',
    clientName: '',
    address: '',
    country: '',
    email: '',
    phone: '',
    comment: '',
    price: 150,
    total: 150,
    paid: '',
    balance: '',
  });

  // Handle change of input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (Save)
  const handleSave = () => {
    console.log('Booking Data:', formData);
    // Add your logic to handle the booking data, like making an API request or saving to the state
    alert('Booking saved successfully');
  };

  return (
  
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold leading-4">
            New <span className="border-b-4 border-red-800">Booking</span>
          </h1>

          <div className="flex gap-4">
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
              NEW
            </button>
            <button
              onClick={handleSave}
              className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* About Booking Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Booking</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Dates:</label>
                <input
                  type="date"
                  name="dates"
                  value={formData.dates}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Nights</label>
                  <input
                    type="number"
                    name="nights"
                    value={formData.nights}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Type, Room</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                >
                  <option>Single Room</option>
                  <option>Double Room</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Room number</label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Hour</label>
                  <input
                    type="time"
                    name="hour"
                    value={formData.hour}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Referral</label>
                <input
                  type="text"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Nobeds.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Referral Order ID</label>
                <input
                  type="text"
                  name="referralOrderId"
                  value={formData.referralOrderId}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="1234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Personal Code</label>
                <input
                  type="text"
                  name="personalCode"
                  value={formData.personalCode}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* About Client Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Client</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Client or company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Full address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Dominican Republic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Add a comment..."
                />
              </div>
            </div>
          </div>

          {/* About Balance Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Balance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Total</label>
                <input
                  type="number"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Paid</label>
                <input
                  type="text"
                  name="paid"
                  value={formData.paid}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Prepaid"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Balance</label>
                <input
                  type="text"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  placeholder="Balance"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NewBooking;
