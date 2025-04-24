import React from 'react';

const TicketDetails = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button className="text-red-600 mr-2">&larr;</button>
        <h2 className="text-xl font-semibold text-red-600">Ticket Details</h2>
      </div>

      {/* Ticket Title and Status */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-blue-800 inline-block mr-4">TX0405</h1>
        <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">Open</span>
        <p className="text-sm text-gray-500 mt-1">Created Time: April 05, 2025 10:15 AM</p>
        <p className="text-sm text-gray-500">Assigned to: Tinkerbell</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Subject */}
          <div>
            <label className="font-semibold">Subject:</label>
            <input
              type="text"
              value="Request for personal app installation"
              disabled
              className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          {/* Category and Sub-category */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold">Category:</label>
              <div className="mt-1 px-3 py-2 border border-gray-300 rounded bg-gray-100">
                Software
              </div>
            </div>
            <div className="flex-1">
              <label className="font-semibold">Sub-Category:</label>
              <div className="mt-1 px-3 py-2 border border-gray-300 rounded bg-gray-100">
                Unauthorized Apps
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description:</label>
            <textarea
              rows="5"
              disabled
              className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="font-semibold">File Upload:</label>
            <div className="mt-1">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white text-sm rounded" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0l-4 4m4-4l4 4M17 16v6m0 0l4-4m-4 4l-4-4" />
                </svg>
                Attached File
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Placeholder for shipment/status or other visuals) */}
        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <p className="text-gray-500 italic">[Placeholder for additional content like shipment status, history, comments, etc.]</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
