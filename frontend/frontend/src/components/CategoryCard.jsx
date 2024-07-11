// src/components/CategoryCard.js
import React, {useContext}from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';


const CategoryCard = ({ category, count }) => {
  const {isDarkTheme} = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detailedCategory`);
  };

  return (
    <div
      onClick={handleClick}
      className={` rounded-lg shadow-slate-600 shadow-sm p-4 flex flex-col items-center w-44 cursor-pointer ${isDarkTheme?'bg-[#1f2530] border-[1px] border-gray-700' : 'bg-white border-[1px] border-gray-200 '}`}
    >
      <button className={` py-2 px-4 rounded-full mb-2 focus:outline-none ${isDarkTheme?'bg-[#858EAC] text-white hover:bg-[#9198ab]':'hover:bg-[#F0F2F4] text-[#858EAC] bg-[#F4F6F8]'}`}>
       {category}
      </button>
      <p className={` ${isDarkTheme?'text-gray-300':'text-gray-500'}`}>{count}</p>
    </div>
  );
};

export default CategoryCard;
