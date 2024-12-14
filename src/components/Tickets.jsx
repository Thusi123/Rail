import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const trains = [
    {
      name: "Udarata ",
      runsOn: "Everyday",
      from: { station: "Kandy", time: "06:00 AM" },
      to: { station: "Colombo", time: "11:00 AM" },
      date: "Nov 16",
      duration: "5 hours",
    },
    {
      name: "Udarata Menike",
      runsOn: "Everyday",
      from: { station: "Colombo", time: "06:00 AM" },
      to: { station: "Kandy", time: "11:00 AM" },
      date: "Nov 16",
      duration: "5 hours",
    },
  ];

  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // Update the date and time automatically
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDate(now.toISOString().split('T')[0]); // Set date to current date
      setTime(now.toTimeString().split(' ')[0].substring(0, 5)); // Set time to current time
    };
    
    updateDateTime(); // Set initial date and time
    const intervalId = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?train')", // Replace with your train image URL
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl font-bold mb-2">Choose Your Adventure</h1>
          <p className="text-sm mb-6">Travel Smarter, Travel Better</p>
          

          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-7xl mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
      <input
        type="text"
        placeholder="From"
        value="Kandy"
        className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        readOnly
      />
      <input
        type="text"
        placeholder="To"
        value="Colombo"
        className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        readOnly
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 w-full md:w-auto">
        Search for trains
      </button>
    </div>
    </div>
    </div>

      {/* Available Trains Section */}
      <div className="p-6">
        <h2 className="text-center text-4xl font-bold mb-6">Available Trains</h2>
        <div className="space-y-5 max-w-7xl mx-auto">
          {trains.map((train, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center p-4 border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-all"
              onClick={() => navigate("/tickets1")}
            >
              {/* Train Details */}
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-800">{train.name}</h3>
                <p className="text-sm text-gray-500">Runs on: {train.runsOn}</p>
              </div>

              {/* Journey Details */}
              <div className="flex-1 flex justify-between items-center">
                {/* From Station */}
                <div className="text-center">
                  <p className="text-sm font-medium">{train.from.station}</p>
                  <p className="text-xs text-gray-500">{train.from.time}</p>
                </div>

                {/* Duration */}
                <div className="text-gray-500 text-center">
                  <p className="text-sm font-medium">{train.date}</p>
                  <p className="text-sm">{train.duration}</p>
                </div>

                {/* To Station */}
                <div className="text-center">
                  <p className="text-sm font-medium">{train.to.station}</p>
                  <p className="text-xs text-gray-500">{train.to.time}</p>
                </div>
              </div>

              {/* View Time Table */}
              <div className="ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the outer click handler
                    console.log("Viewing train time table");
                  }}
                  className="px-4 py-2 text-indigo-500 hover:underline text-sm"
                >
                  View Train Time Table
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
