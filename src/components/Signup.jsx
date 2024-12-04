import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/Logo.png";

function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side Image */}
        <div
          className="hidden md:flex w-full md:w-50 h-64 md:h-auto flex items-center justify-center"
          style={{
            backgroundImage: `url(${logoImage})`,
            backgroundPosition: "center",
            backgroundSize: "90%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Right Side Signup Form */}
        <div className="p-8 w-full">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-5">
            Create an account
          </h2>
          <form className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create your password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Create an account
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">Or</p>
            <button className="w-full px-4 py-2 mt-4 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center space-x-2">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google icon"
                className="w-5 h-5 mr-2"
              />
              Create account with Google
            </button>
          </div>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
