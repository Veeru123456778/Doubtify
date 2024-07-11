// LogoutPopup.js
import React from 'react';

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Log Out</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
