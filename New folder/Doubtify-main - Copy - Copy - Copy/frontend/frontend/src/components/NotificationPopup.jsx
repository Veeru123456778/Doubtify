import React,{useContext, useState} from 'react';
import userImage from '../assets/user.png'; // Ensure the path is correct
import UserContext from '../context/userContext';
import { Link } from 'react-router-dom';

const NotificationPopup = ({ onClose }) => {
  const {user} = useContext(UserContext);
  const [notifications,setNotifications] = useState(user.notifications || []);
  const {isDarkTheme} = useContext(UserContext);


  console.log(notifications.length);

  const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMilliseconds = now - notificationTime;
    const hoursAgo = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    return hoursAgo;
  };

  const getTimeString = (timestamp) => {
    const hoursAgo = calculateTimeAgo(timestamp);
    if(hoursAgo>=24){
      return `${Math.floor(hoursAgo/24)} day${Math.floor(hoursAgo/24) !== 1 ? 's' : ''} ago`;
    }
    if (hoursAgo < 1) {
      const minutesAgo = Math.floor(hoursAgo * 60);
      return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
    } else {
      return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50 justify-end ">
      <div className={`relative  max-h-auto w-96  shadow-lg overflow-hidden  flex flex-col animate-slide-in ${isDarkTheme?'bg-[#1f2530]':'bg-white'}`}>
        {/* mt-14 mr-[10%] */}
        <div className={`sticky flex justify-between top-0 z-10 p-4 border-b flex-end ${isDarkTheme?'bg-[#1f2530]':'bg-white'}`}>
          <h3 className={` xl:text-xl text-xl font-semibold ${isDarkTheme?'text-white':'text-black'}`}>Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &#10005;
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
          {notifications ? (
  <div className="space-y-4">
    {notifications.map((notification, index) => (
      <div key={index} className={`flex items-start space-x-3 p-3 shadow-slate-600 shadow-sm  rounded-lg shadow-md ${isDarkTheme?'bg-dark':'bg-white'}`}>
        <img
          src={userImage}
          alt="User"
          className="xl:w-8 w-5 xl:h-8 h-5 rounded-full"
        />
        <div className="flex flex-col">
        <p className={`text-sm font-semibold ${isDarkTheme?'text-white':'text-black'}`}>@{notification.name}           <span className={`text-xs  ${isDarkTheme?'text-gray-300':'text-gray-700'}`}>{notification.action}</span>
 </p>
           <div className='flex justify-between'>
          <p className={`text-xs  ${isDarkTheme?'text-gray-400':'text-gray-500'}`}>{getTimeString(notification.time)}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-gray-400 text-center">No notifications</div>
)}

        </div>
        {notifications.length===0?<div className='flex flex-col items-center'>
        <p className={` ${isDarkTheme?'text-gray-400':'text-gray-500'}`}>You have no notifications!</p>
        <img src='/image.png' className='mb-5 w-88 h-80'/>
        </div>:''}
      </div>
    </div>
  );
};

export default NotificationPopup;

