import React from 'react';

const CategoryCard = ({ category, count }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-44 border-[1px] border-grey">
      <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-full mb-2 focus:outline-none">
       {category}
      </button>
      <p className="text-gray-500">{count}</p>
    </div>
  );
};

export default CategoryCard;
