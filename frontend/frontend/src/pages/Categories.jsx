import React from 'react';
import searchIcon from '../assets/search.png'; // Ensure the path is correct
import CategoryCard from '../components/CategoryCard';
import UserContext from '../context/userContext';
import { useContext } from 'react';

const Categories = () => {
  const {isDarkTheme} = useContext(UserContext);

  return (
    <div className="w-full h-screen  p-6 flex flex-col items-center">
      {/* <div className="sticky top-0 bg-white z-20  p-4">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <input
            type="text"
            placeholder="Search"
            className="w-30 md:w-30 lg:w-30 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundSize: '16px',
              backgroundPosition: '10px center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        <hr className="border-gray-300 mb-8" />
      </div>
       */}
        <div className='md:w-1/2 w-full'>
        <div className="flex justify-between items-start">
          <h1 className={`text-2xl font-bold ${isDarkTheme?'text-white':'text-black'}`}>Categories</h1>
          <input
            type="text"
            placeholder="Search"
            className={`w-1/3 md:w-30 lg:w-30 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 ${isDarkTheme?'bg-[#858EAC] text-white placeholder-white':'bg-white text-black'}`}
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundSize: '16px',
              backgroundPosition: '10px center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        <hr className="mt-3 border-gray-300" />
        </div>

       <div className="flex justify-center items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-5">
        <CategoryCard category="Blockchain" count="2585" />
        <CategoryCard category="Data Structures" count="253" />
        <CategoryCard category="Machine Learning" count="1285" />
        <CategoryCard category="Artificial Intelligence" count="2585" />
        <CategoryCard category="Operating System" count="2285" />
        <CategoryCard category="Computer Networks" count="25" />
        
        {/* Add more CategoryCard components here */}
      </div>
    </div>
    </div>
  );
};

export default Categories;
