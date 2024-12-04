import React, { useState, useRef, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { FaBell } from "react-icons/fa";
import { FiLogOut, FiHome, FiGrid,  FiUser, FiMapPin, FiSettings, FiNavigation } from "react-icons/fi";
import logImage from "../assets/logo.png";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Link, useNavigate } from 'react-router-dom';


const Dashboard = () => {
  // Sample data for the pie chart
  const data = {
    labels: ["1st Class", "2nd Class", "3rd Class"],
    datasets: [
      {
        data: [10, 30, 30], // Adjust data percentages
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverBackgroundColor: ["#45A049", "#FFB300", "#E53935"],
      },
    ],
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const sriLankaCenter = {
    lat: 7.8731, // Latitude for Sri Lanka
    lng: 80.7718, // Longitude for Sri Lanka
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationRef = useRef(null); // To track the notification box element
  const navigate = useNavigate();

  const toggleNotificationBox = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setIsOpen(false); // Close the notification box if the click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setIsModalOpen(true);
  };

  const confirmSignOut = () => {
    setIsModalOpen(false);
    localStorage.removeItem("authToken"); // Example: Clear token if used
    navigate("/login");
    window.location.reload(); // Refresh the login page
  };

  const cancelSignOut = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-900 text-white h-screen p-4 fixed flex flex-col">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center">
            <img src={logImage} alt="Logo" className="h-15 w-20" />
          </div>
          <p className="mt-4 text-lg font-semibold">GoByRail</p>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-4 mt-5">
            <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <Link to="/home" className="flex items-center space-x-3">
              <FiHome size={20} />
              <p>Home</p>
            </Link>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiUser size={20} />
            <p>User</p>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiGrid size={20} />
            <p>Tickets Booking</p>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiNavigation size={20} />
            <p>Live Tracking</p>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiMapPin size={20} />
            <p>Stations</p>
          </li>
        </ul>

        {/* Footer Items */}
        <div className="mt-auto space-y-4">
          <p className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiSettings size={20} />
            <span>Settings</span>
          </p>
          
          <p className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer" onClick={handleSignOut}>
            <FiLogOut size={20} />
            <span>Sign out</span>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[20%] p-6 bg-gray-100">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">GoByRail</div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="p-2 border border-gray-300 rounded-md"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Search
            </button>

            {/* Notification Button */}
            <button className="relative" onClick={toggleNotificationBox}>
              <FaBell size={24} className="text-gray-500 hover:text-gray-700" />
              <span className="absolute top-0 left-5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notification Pop-up */}
            {isOpen && (
              <div 
              ref={notificationRef} // Assign the ref to track this element
              className="absolute right-0 mt-20 w-60 bg-white shadow-lg rounded-lg border border-gray">
                <ul className="p-4">
                  <li className="mb-2 text-gray-700 border-b pb-2">
                    Notification 1
                  </li>
                  <li className="mb-2 text-gray-700 border-b pb-2">
                    Notification 2
                  </li>
                  <li className="mb-2 text-gray-700 border-b pb-2">
                    Notification 3
                  </li>
                 
                </ul>
              </div>
            )}
          </div>
        </header>
        
        {/* Confirm Sign Out */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Sign Out</h2>
              <p className="mb-4">Are you sure you want to sign out?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={cancelSignOut}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={confirmSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-gray-600">Total Passengers</h2>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-gray-600">On-Time Percent</h2>
            <p className="text-2xl font-bold">80%</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-gray-600">Avg. Ticket Price</h2>
            <p className="text-2xl font-bold">500.00 LKR</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-gray-600">Avg. Delay Time</h2>
            <p className="text-2xl font-bold">42 min</p>
          </div>
        </div>

        {/* Search and Map */}
        <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-bold mb-4">Search</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">From</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Kandy</option>
                  <option>Colombo</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600">To</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Colombo</option>
                  <option>Kandy</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md">
                Search
              </button>
            </div>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-bold mb-4">Map of Sri Lanka</h3>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={sriLankaCenter}
                zoom={7}
              />
            </LoadScript>
          </div>
        </div>

        {/* Chart and Updates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-bold mb-4">Crowding Level</h3>
            <Pie data={data} />
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-bold mb-4">Real-time Update</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Train Name</th>
                  <th className="border border-gray-300 px-4 py-2">From</th>
                  <th className="border border-gray-300 px-4 py-2">To</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Udarata Menike</td>
                  <td className="border border-gray-300 px-4 py-2">Kandy</td>
                  <td className="border border-gray-300 px-4 py-2">Colombo</td>
                  <td className="border border-gray-300 px-4 py-2">
                    05:00 AM - 11:00 AM
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Podi Menike</td>
                  <td className="border border-gray-300 px-4 py-2">Badulla</td>
                  <td className="border border-gray-300 px-4 py-2">Colombo</td>
                  <td className="border border-gray-300 px-4 py-2">
                    07:30 AM - 1:30 PM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
