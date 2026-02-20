import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 sm:p-5 border-l-4 border-indigo-600">
      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-3 line-clamp-1">
        {user.fullname}
      </h3>
      <div className="space-y-2 text-sm">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Email:</span>
          <br className="sm:hidden" />
          <span className="sm:ml-2 break-all">{user.email}</span>
        </p>
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Mobile:</span>
          <span className="ml-2">{user.mobile}</span>
        </p>
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Role:</span>
          <span className="ml-2 inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs sm:text-sm mt-1 sm:mt-0">
            {user.role}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
