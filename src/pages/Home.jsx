import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-xl w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Let's Begin Our Dreams into Profession</h1>
        <p className="text-lg text-gray-600 mb-8">We are here to help you achieve your goals. Start your journey with us today!</p>

        <div className="flex justify-center space-x-6">
          <Link to="/register">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl shadow-md transition-transform hover:scale-105">
              Register
            </button>
          </Link>

          <Link to="/signin">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow-md transition-transform hover:scale-105">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
