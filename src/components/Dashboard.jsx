import React, { useState, useRef, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { FaBell } from "react-icons/fa";
import { FiLogOut, FiHome, FiGrid, FiUser, FiMapPin, FiSettings, FiNavigation } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import logImage from "../assets/logo.png"; // Relative path from Dashboard.jsx to assets
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

    // Log the image path
    console.log("Image path:", logImage);

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-500 text-white h-screen p-4 fixed flex flex-col">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center">
              <img src={logImage} alt="Logo" className="h-15 w-20" />
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
          {/* Content... */}
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
