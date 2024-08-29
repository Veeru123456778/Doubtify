// src/components/RightSidebar.jsx
import React from 'react';
import UserContext from '../context/userContext';
import { useContext } from 'react';
const RightSidebar = () => {
  const {isDarkTheme} = useContext(UserContext);

  return (
    <div className={isDarkTheme ?"hidden md:p-1 md:block xl:w-64 lg:w-52 md:w-44 fixed top-16 right-0 h-full bg-dark shadow-slate-700	shadow-md p-4 flex flex-col space-y-2   ": " xl:w-64 lg:w-52 md:w-44 hidden md:p-1 md:block fixed top-16 right-0 h-full bg-[#F5F2FF] shadow-lg p-4 flex flex-col space-y-2 "}>
      <div className={isDarkTheme ?"h-full bg-dark p-4 flex flex-col space-y-2 rounded-lg":"h-full bg-white p-4 flex flex-col space-y-2 rounded-lg"}>
        <h3 className={isDarkTheme?"text-xl text-white mt-5 md:text-lg lg:text-xl text-center font-bold mb-1":"text-xl md:text-lg lg:text-xl mt-5 text-center font-bold mb-1"}>Top Categories</h3>
        <button className={`${isDarkTheme?'bg-[#323B4A] text-[#E0E0E0] border-1 border-[#404b5a] hover:bg-[#2C3545]':'hover:bg-[#F0F2F4] text-[#858EAC] bg-[#F4F6F8]'} w-full h-12  rounded-3xl  md:text-xs lg:text-sm xl:text-lg`}>Artificial intelligence</button>
        <button className={`${isDarkTheme?'bg-[#323B4A] text-[#E0E0E0] border-1 border-[#404b5a] hover:bg-[#2C3545]':'hover:bg-[#F0F2F4] text-[#858EAC] bg-[#F4F6F8]'} w-full h-12  rounded-3xl  md:text-xs lg:text-sm xl:text-lg`}>Operating Systems</button>
        <button className={`${isDarkTheme?'bg-[#323B4A] text-[#E0E0E0] border-1 border-[#404b5a] hover:bg-[#2C3545]':'hover:bg-[#F0F2F4] text-[#858EAC] bg-[#F4F6F8]'} w-full h-12  rounded-3xl  md:text-xs lg:text-sm xl:text-lg`}>Data science</button>
        <button className={`${isDarkTheme?'bg-[#323B4A] text-[#E0E0E0] border-1 border-[#404b5a] hover:bg-[#2C3545]':'hover:bg-[#F0F2F4] text-[#858EAC] bg-[#F4F6F8]'} w-full h-12  rounded-3xl  md:text-xs lg:text-sm xl:text-lg`}>Cryptography</button>
        <button className={`${isDarkTheme?'bg-[#323B4A] text-[#E0E0E0] border-1 border-[#404b5a] hover:bg-[#2C3545]':'hover:bg-[#F0F2F4] text-[#858EAC] bg-[#F4F6F8]'} w-full h-12  rounded-3xl  md:text-xs lg:text-sm xl:text-lg`}>Data structure</button>
        <button className={`${isDarkTheme?'bg-[#323B4A] text-[#E0E0E0] border-1 border-[#404b5a] hover:bg-[#2C3545]':'hover:bg-[#F0F2F4] text-[#858EAC] bg-[#F4F6F8]'} w-full h-12  rounded-3xl  md:text-xs lg:text-sm xl:text-lg`}>Machine learning</button>
      </div>    
    </div>
  );
};
export default RightSidebar;
