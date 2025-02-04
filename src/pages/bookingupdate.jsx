import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiservice';
import { BiCheck, BiEdit } from 'react-icons/bi';
import { CheckBadgeIcon } from '@heroicons/react/16/solid';
import toast from 'react-hot-toast';

function BookingUpdate() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 15;

  useEffect(() => {
    const fetchBookingList = async () => {
        try {
          const response = await apiService.getData("booking/list");
          console.log(response)
          if (response && response.Bookingdata) {
            setBookings(response.Bookingdata);
          } else {
            setBookings([]);
          }
        } catch (error) {
          console.error("Error fetching booking list:", error);
          setBookings([]);
        }
      };
    fetchBookingList();
  }, []);



  const handleStatusChange = async (id, newStatus) => {
    try {
      // Optimistically update UI before making the API call
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === id ? { ...booking, paymentstatus: newStatus } : booking
        )
      );
  
      // Make API call to update status
      const response = await apiService.postData(`booking/bookingupdate/${id}`, { paymentstatus: newStatus });
  
      if (response && response.Bookingdata) {
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking._id === id ? response.Bookingdata : booking
          )
        );
        toast.success("Booking updated successfully")
        console.log("Booking updated successfully:", response.Bookingdata);
      } else {
        console.error("Error updating booking status:", response);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg)
      console.error("Error in handleStatusChange:", error.response?.data?.msg);
    }
  };
  

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div className="p-6 bg-light min-h-screen">
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-secondary text-white text-base uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Booking Code</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Payment Status</th>
              {/* <th className="px-6 py-3">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr key={booking._id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{indexOfFirstBooking + index + 1}</td>
                <td className="px-6 py-4">{booking.booking_code}</td>
                <td
                  className={`px-6 py-4 ${booking.paymentstatus === "paid"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                    }`}
                >
                  {booking.paymentstatus}
                </td>

                <td className="px-6 py-4">
                  <select
                    className="border p-2 rounded"
                    value={booking.paymentstatus}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="mx-1 px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-4 py-2 border rounded-md ${currentPage === i + 1 ? 'bg-secondary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="mx-1 px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

export default BookingUpdate;
