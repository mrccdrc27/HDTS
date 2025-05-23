import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        <ArrowLeftCircle size={20} />
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
