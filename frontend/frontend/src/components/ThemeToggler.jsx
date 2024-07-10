import React, { useState, useEffect,useContext } from 'react';
import UserContext from '../context/userContext';

const ThemeToggler = () => {


  const {isDarkTheme,toggleTheme} = useContext(UserContext);

  return (
    <button
      aria-label='theme toggler'
      onClick={toggleTheme}
      className="flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-2 dark:bg-dark-bg h-9 w-9 dark:text-white md:h-14 md:w-14"
    >
      {isDarkTheme?<img src="/brightness2.png" alt="" className="  w-5 h-5 md:h-5 md:w-5"/>:<img src="/moon-stars.png" alt="" className=" w-5 h-5 stroke-current md:h-5 md:w-5"/>}
      
    </button>
  );
};

export default ThemeToggler;
