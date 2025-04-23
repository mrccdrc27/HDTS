import React from 'react';

const NotificationPopup = ({ notifications = [], onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-red-600">Notification</h2>
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-black">✕</button>
      </div>

      <div className="mb-2 border-b pb-2">
        <button className="bg-gray-200 text-black px-4 py-1 rounded-full font-medium">All</button>
      </div>

      <p className="text-sm font-semibold text-blue-800 mb-2">Earlier</p>

      {notifications.map((notif, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3 mb-3 border rounded-lg shadow-sm bg-gray-50"
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex-grow">
            <h3 className="font-semibold text-base mb-1">Ticket Update</h3>
            <p className="text-sm text-gray-700 mb-2">{notif}</p>
            <span className="text-xs text-gray-500">10 hrs. ago</span>
          </div>
          <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 transition">
            Mark as read
          </button>
        </div>
      ))}

      <div className="text-right">
        <a href="/user/notifications" className="text-sm text-blue-600 hover:underline">
          See all
        </a>
      </div>
    </div>
  );
};

export default NotificationPopup;
