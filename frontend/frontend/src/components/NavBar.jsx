// import React, { useContext, useState } from 'react';
// import { BellIcon, MenuIcon } from '@heroicons/react/solid';
// import { Link, useNavigate } from 'react-router-dom';
// import UserContext from '../context/userContext';
// import AskQuestionPopup from './AskQuestionPopup';
// import NotificationPopup from './NotificationPopup';
// import searchIcon from '../assets/search.png';

// const NavBar = ({ toggleSidebar }) => {
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const { setToken, setUser, user } = useContext(UserContext);
//   const navigate = useNavigate();
//   console.log(user);

//   const handleLogOut = () => {
//     const confirmation = window.confirm("Are you sure you want to log out?");
//     if (confirmation) {
//       localStorage.removeItem("token");
//       setToken("");
//       setUser(null);
//       navigate('/signin');
//     }
//   };

//   const handleProfileClick = () => {
//     navigate('/profile');
//     window.location.reload(); // This may not be necessary, consider removing
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between bg-gray-100 p-2 xl:p-4 shadow-md fixed top-0 w-full z-50">
//         <div className="flex items-center space-x-4">
//           <button className="md:hidden" onClick={toggleSidebar}>
//             <MenuIcon className='w-5 h-5' />
//           </button>
//         </div>

//         <div className='flex items-center'>
//           <div className="relative flex-grow">
//             <input
//               type="text"
//               placeholder="Search for any question"
//               className="pl-7 xl:pl-10 w-40 sm:w-full  xl:w-80 pr-4 py-1 xl:py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//               style={{
//                 backgroundImage: `url(${searchIcon})`,
//                 backgroundSize: '16px',
//                 backgroundPosition: '8px center ',
//                 backgroundRepeat: 'no-repeat',
//               }}
//             />
//           </div>

//           <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
//             <BellIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-700 cursor-pointer" onClick={() => setIsNotificationOpen(true)} />
//             <button
//               className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs md:text-base px-1 py-1 md:px-4 md:py-2 rounded-full hover:from-blue-500 hover:to-blue-700"
//               onClick={() => setIsPopupOpen(true)}
//             >
//               Ask a Question
//             </button>
//             <div className="relative">
//               <img
//                 src={user.profile_picture} // Assuming user.profile_picture is correctly set in context
//                 alt="User"
//                 className="w-6 h-6 md:w-9 md:h-9 rounded-full border border-gray-300 cursor-pointer"
//                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//               />
//               {isUserMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
//                   <div className="py-1">
//                     <Link to="#" onClick={handleProfileClick} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">View Profile</Link>
//                     <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogOut}>Logout</button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {isNotificationOpen && <NotificationPopup onClose={() => setIsNotificationOpen(false)} />}
//       {isPopupOpen && <AskQuestionPopup onClose={() => setIsPopupOpen(false)} />}
//     </div>
//   );
// };

// export default NavBar;

import React, { useState,useContext } from 'react';
import { BellIcon } from '@heroicons/react/solid'; // Import Bars3Icon for the hamburger button
import { MenuIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom';
import userImage from '../assets/user.png';
import searchIcon from '../assets/search.png';
import AskQuestionPopup from './AskQuestionPopup';
import NotificationPopup from './NotificationPopup';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';

const NavBar = ({ toggleSidebar }) => { // Accept toggleSidebar prop
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
   const{setToken,setUser,token,user} = useContext(UserContext);
   const loading = useFetchUser(token, setUser);

  const handleLogOut = () => {
        const confirmation = window.confirm("Are you sure you want to log out!!")
        if(confirmation){
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        navigate('/signin');
      }
      };

  const handleProfileClick = () => {
    navigate('/profile');
    window.location.reload();
  };

  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 p-2 xl:p-4 shadow-md fixed top-0 w-full z-50">
        <div className="flex items-center space-x-4">
          <button className="md:hidden" onClick={toggleSidebar}>
           <MenuIcon className='w-5 h-5'/>
          </button>
        </div>
        
        <div className='flex items-center'>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search for any question"
            className="pl-7 xl:pl-10 w-40 sm:w-full  xl:w-80 pr-4 py-1 xl:py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundSize: '16px',
              backgroundPosition: '8px center ',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
          <BellIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-700 cursor-pointer" onClick={() => setIsNotificationOpen(true)} />
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs md:text-base px-1 py-1 md:px-4 md:py-2 rounded-full hover:from-blue-500 hover:to-blue-700"
            onClick={() => setIsPopupOpen(true)}
          >
            Ask a Question
          </button>
          <div className="relative">
            <img
              src={user.profile_picture}
              alt="User"
              className="w-6 h-6 md:w-9 md:h-9 rounded-full border border-gray-300 cursor-pointer"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  <Link to="#" onClick={handleProfileClick} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">View Profile</Link>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogOut}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      {isNotificationOpen && <NotificationPopup onClose={() => setIsNotificationOpen(false)} />}
      {isPopupOpen && <AskQuestionPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default NavBar;
