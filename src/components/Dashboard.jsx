import React, { useState, useRef, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { FaBell } from "react-icons/fa";
import { FiLogOut, FiHome, FiGrid, FiUser, FiMapPin, FiSettings, FiNavigation } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  // Pie chart data sample
  const data = {
    labels: ["1st Class", "2nd Class", "3rd Class"],
    datasets: [
      {
        data: [10, 30, 30], // Data values for distribution
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
    lat: 7.8731, // Center coordinates for Sri Lanka
    lng: 80.7718,
  };

  // Custom map component with internal state and handlers
  const MyMap = ({ selectedLocation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const notificationRef = useRef(null); // Used to handle notification pop-up closing
    const navigate = useNavigate();

    const toggleNotificationBox = () => {
      setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
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
      localStorage.removeItem("authToken");
      navigate("/login");
      window.location.reload();
    };

    const cancelSignOut = () => {
      setIsModalOpen(false);
    };

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-500 text-white h-screen p-4 fixed flex flex-col">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center">
             <img src={logo} alt="Logo" className="h-15 w-20" /> 
              

            </div>
            <p className="mt-4 text-lg font-semibold">GoByRail</p>
          </div>

          {/* Navigation Menu */}
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

          {/* Footer */}
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
       
        <main className="flex-1 ml-[16.67%] p-6 bg-gray-100">

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
              <button className="relative" onClick={toggleNotificationBox}>
                <FaBell size={24} className="text-gray-500 hover:text-gray-700" />
                <span className="absolute top-0 left-5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification Pop-up */}
              {isOpen && (
                <div ref={notificationRef} className="absolute right-0 mt-20 w-60 bg-white shadow-lg rounded-lg border border-gray">
                  <ul className="p-4">
                    <li className="mb-2 text-gray-700 border-b pb-2">Notification 1</li>
                    <li className="mb-2 text-gray-700 border-b pb-2">Notification 2</li>
                    <li className="mb-2 text-gray-700 border-b pb-2">Notification 3</li>
                  </ul>
                </div>
              )}
            </div>
          </header>

          {/* Modal for Sign Out Confirmation */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Confirm Sign Out</h2>
                <p className="mb-4">Are you sure you want to sign out?</p>
                <div className="flex justify-end space-x-4">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={cancelSignOut}>
                    Cancel
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={confirmSignOut}>
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

          <div className="grid grid-cols-3 gap-5 p-4">
        {/* Search Section */}
        <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Search</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">From</label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option>Kandy</option>
                <option>Colombo</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">To</label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option>Colombo</option>
                <option>Kandy</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Time</label>
              <input type="time" className="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition">
              Search
            </button>
          </form>
        </div>

        {/* Crowding Level Chart */}
        <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Crowding Level</h3>
          {/* Insert the chart component here */}
          <Pie data={data} />
        </div>

        {/* Crowding Level Chart */}
        <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
        
        <h2 className="text-2xl font-bold mb-4">Train Tracking</h2>
        </div>

        {/* Real-Time Updates */}
        <div className="col-span-3 bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Real-Time Updates</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Train Name</th>
                <th className="border px-4 py-2 text-left">From</th>
                <th className="border px-4 py-2 text-left">To</th>
                <th className="border px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Udarata Menike</td>
                <td className="border px-4 py-2">Kandy</td>
                <td className="border px-4 py-2">Colombo</td>
                <td className="border px-4 py-2">05:00 AM - 11:00 AM</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Podi Menike</td>
                <td className="border px-4 py-2">Badulla</td>
                <td className="border px-4 py-2">Colombo</td>
                <td className="border px-4 py-2">07:30 AM - 1:30 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-6 mt-6">
        {/* Train Details Search */}
        <div className="w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">News</h2>
          {/* Insert train search functionality here */}
        </div>

                {/* Map Display */}
                <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Live Location</h2>
          <MapContainer center={[7.8731, 80.7718]} zoom={8} style={mapContainerStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[7.8731, 80.7718]}>
              <Popup>Train Location: Kandy Station</Popup>
            </Marker>
          </MapContainer>

  </div>
</div>
   

  

        </main>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <MyMap />
    </div>
  );
};

export default Dashboard;
