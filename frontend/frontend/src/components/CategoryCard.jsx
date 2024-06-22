// src/components/CategoryCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category, count }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detailedCategory`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-44 border-[1px] border-grey cursor-pointer"
    >
      <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-full mb-2 focus:outline-none">
        {category}
      </button>
      <p className="text-gray-500">{count} Questions</p>
    </div>
  );
};

export default CategoryCard;
