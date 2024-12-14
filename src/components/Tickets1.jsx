import React, { useState } from "react";

const BookingPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [numberOfTravellers, setNumberOfTravellers] = useState(0);
  const [travellers, setTravellers] = useState([]);

  const handleClassSelection = (className) => {
    setSelectedClass(className);
  };

  const handleNumberOfTravellersChange = (e) => {
    const newCount = parseInt(e.target.value, 10);

    // Ensure minimum 1 traveller is always present
    if (newCount >= 0 && newCount <= 4) {
      const updatedTravellers = [...travellers];
      if (newCount > travellers.length) {
        for (let i = travellers.length; i < newCount; i++) {
          updatedTravellers.push({
            id: i + 0,
            name: "",
            gender: "",
            nic: "",
            address: "",
            mobile: "",
            email: "",
          });
        }
      } else if (newCount < travellers.length) {
        updatedTravellers.splice(newCount);
      }
      setTravellers(updatedTravellers);
      setNumberOfTravellers(newCount);
    }
  };

  const updateTraveller = (id, field, value) => {
    setTravellers((prevTravellers) =>
      prevTravellers.map((traveller) =>
        traveller.id === id ? { ...traveller, [field]: value } : traveller
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Boarding Details */}
        <div className="bg-blue-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold">Boarding Details</h2>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm">Udarata Menike</p>
              <p className="text-sm">Nov 16</p>
              <p className="text-sm">05:00 AM - Kandy</p>
            </div>
            <p className="text-sm text-center">8 hours</p>
            <div>
              <p className="text-sm">Nov 16</p>
              <p className="text-sm">11:00 AM - Colombo</p>
            </div>
          </div>
        </div>

        {/* Choose Your Seat */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Choose Your Seat</h2>
          <div className="flex justify-between">
            {/* First Class */}
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedClass === "First"
                  ? "bg-green-100 border-green-600"
                  : "bg-white"
              }`}
              onClick={() => handleClassSelection("First")}
            >
              <p className="text-green-600 font-bold">First Class</p>
              <p>2 Seats Available</p>
              <p>LKR 1000 Per Seat</p>
            </div>

            {/* Second Class */}
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedClass === "Second"
                  ? "bg-yellow-100 border-yellow-600"
                  : "bg-white"
              }`}
              onClick={() => handleClassSelection("Second")}
            >
              <p className="text-yellow-600 font-bold">Second Class</p>
              <p>10 Seats Available</p>
              <p>LKR 700 Per Seat</p>
            </div>

            {/* Third Class */}
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedClass === "Third"
                  ? "bg-red-100 border-red-600"
                  : "bg-white"
              }`}
              onClick={() => handleClassSelection("Third")}
            >
              <p className="text-red-600 font-bold">Third Class</p>
              <p>20 Seats Available</p>
              <p>LKR 400 Per Seat</p>
            </div>
          </div>

          {selectedClass && (
            <div className="mt-4 p-4 text-center bg-blue-50 rounded-lg">
              <p className="text-blue-700 font-medium">
                You have selected <span className="font-bold">{selectedClass} Class</span>.
              </p>
            </div>
          )}
        </div>

          {/* Number of Seats */}
          <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Number of Seats</h2>
          <input
            type="number"
            min="0"
            max="4"
            value={numberOfTravellers}
            onChange={handleNumberOfTravellersChange}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>

        {/* Traveller Details */}
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Traveller Details</h2>
            <p className="text-gray-500 text-sm">
              As per guidelines, you can book up to 4 travellers at once.
            </p>
          </div>

          <div className="space-y-4">
            {travellers.map((traveller) => (
              <div
                key={traveller.id}
                className="flex flex-col border p-4 rounded-md shadow-sm"
              >
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Name of Traveller"
                    value={traveller.name}
                    onChange={(e) =>
                      updateTraveller(traveller.id, "name", e.target.value)
                    }
                    className="border px-3 py-2 rounded-md"
                  />
                  <select
                    value={traveller.gender}
                    onChange={(e) =>
                      updateTraveller(traveller.id, "gender", e.target.value)
                    }
                    className="border px-3 py-2 rounded-md"
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    type="text"
                    placeholder="NIC No"
                    value={traveller.nic}
                    onChange={(e) =>
                      updateTraveller(traveller.id, "nic", e.target.value)
                    }
                    className="border px-3 py-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={traveller.address}
                    onChange={(e) =>
                      updateTraveller(traveller.id, "address", e.target.value)
                    }
                    className="border px-3 py-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={traveller.mobile}
                    onChange={(e) =>
                      updateTraveller(traveller.id, "mobile", e.target.value)
                    }
                    className="border px-3 py-2 rounded-md"
                  />
                  <input
                    type="email"
                    placeholder="Email ID"
                    value={traveller.email}
                    onChange={(e) =>
                      updateTraveller(traveller.id, "email", e.target.value)
                    }
                    className="border px-3 py-2 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>


          {/* Confirm Booking */}
          <div className="text-center mt-6">
            <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
