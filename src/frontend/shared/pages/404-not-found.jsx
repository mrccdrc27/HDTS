import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftCircle } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-white">
      <h1 className="text-6xl font-bold text-yellow-500 mb-4">Access Denied</h1>
      <h2 className="text-2xl font-semibold mb-2">You’re not authorized to view this page.</h2>
      <p className="text-gray-600 mb-6">
        This page requires you to be logged in. Please go back and log in to continue.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        <ArrowLeftCircle size={20} />
        Go to Login Portal
      </Link>
    </div>
  );
};

export default Unauthorized;
