import React from "react";
import logImage from "../assets/Logo.png";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-[600px]">
        {/* Logo and Header */}
        <div className="flex items-center mb-4">
          <img
            src={logImage}
            alt="GoByRail"
            className="w-12 h-12 rounded-full"
          />
        
        <h1 className="text-2xl font-bold ml-4">Data Input Panel</h1>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Station No and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Station No</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300">
                <option value="">Select</option>
                <option value="">00080</option>
                <option value="">00030</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Location</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300">
                <option value="">Select</option>
                <option value="">Kandy</option>
                <option value="">Colombo</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>

          {/* Train Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Train Name</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300">
                <option value="">Select</option>
                <option value="">Udarata Menike</option>
                <option value="">Ruhunu Kumari</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">From</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300">
                <option value="">Select</option>
                <option value="">Kandy</option>
                <option value="">Colombo</option>
                
              </select>
            </div>
            <div>
              <label className="block text-gray-700">To</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300">
                <option value="">Select</option>
                <option value="">Kandy</option>
                <option value="">Colombo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Ticket and Booking */}
          <div>
            <table className="table-auto w-full text-center border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1">Sets</th>
                  <th className="border border-gray-300 px-2 py-1">Tickets Amount</th>
                  <th className="border border-gray-300 px-2 py-1">Booking Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">1 Class</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">2 Class</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">3 Class</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
