import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Doughnut } from "react-chartjs-2"; // For charts
import GoogleMapReact from "google-map-react"; // For the map
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";


// Dummy data
const dummyData = [
  {
    train: "Express A1",
    time: "09:00 AM",
    crowdLevels: { firstClass: 20, secondClass: 50, thirdClass: 80 },
    coordinates: { lat: 6.9271, lng: 79.8612 },
  },
  {
    train: "Local B2",
    time: "09:30 AM",
    crowdLevels: { firstClass: 10, secondClass: 40, thirdClass: 60 },
    coordinates: { lat: 6.9364, lng: 79.8449 },
  },
  {
    train: "Express C3",
    time: "10:00 AM",
    crowdLevels: { firstClass: 5, secondClass: 20, thirdClass: 30 },
    coordinates: { lat: 6.9225, lng: 79.8671 },
  },
];

// Map marker component
const TrainMarker = ({ trainName }) => (
  <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs shadow-lg">
    {trainName}
  </div>
);

const Predictions = () => {
  const navigate = useNavigate();
  const [selectedTrain, setSelectedTrain] = useState(null); // Track selected train for chart modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const handleLiveTracking = () => {
    console.log("Live tracking button clicked");
  };

  const openModal = (train) => {
    setSelectedTrain(train);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrain(null);
  };

  const getChartData = (crowdLevels) => ({
    labels: ["1st Class", "2nd Class", "3rd Class"],
    datasets: [
      {
        data: [
          crowdLevels.firstClass,
          crowdLevels.secondClass,
          crowdLevels.thirdClass,
        ],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
        hoverBackgroundColor: ["#388e3c", "#fbc02d", "#d32f2f"],
      },
    ],
  });

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Train Crowd Predictions
          </h1>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate('/Home')}
          >
            Back
          </button>
        </div>
      </div>

      {/* Real-time Train List */}
      <div className="max-w-6xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Real-Time Running Trains</h2>
        {dummyData.map((train, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-4 mb-2 rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-bold">{train.train}</h3>
              <p className="text-gray-600">Time: {train.time}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => openModal(train)}
              >
                Crowd Levels
              </button>
              <Link to="/live-tracking">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Live Tracking
              </button>
              </Link>
            
            </div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="max-w-6xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Train Map</h2>
        <div className="h-64">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }}
            defaultCenter={{ lat: 6.9271, lng: 79.8612 }}
            defaultZoom={10}
          >
            {dummyData.map((train, index) => (
              <TrainMarker
                key={index}
                lat={train.coordinates.lat}
                lng={train.coordinates.lng}
                trainName={train.train}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>

      {/* Modal for Donut Chart */}
      {isModalOpen && selectedTrain && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">
              {selectedTrain.train} Crowd Levels
            </h3>
            <Doughnut data={getChartData(selectedTrain.crowdLevels)} />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predictions;
