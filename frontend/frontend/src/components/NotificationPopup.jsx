import React,{useContext, useState} from 'react';
import userImage from '../assets/user.png'; // Ensure the path is correct
import UserContext from '../context/userContext';

const NotificationPopup = ({ onClose }) => {
  const {user} = useContext(UserContext);
  const [notifications,setNotifications] = useState(user.notifications || [{ user: 'Username', action: 'has reacted to your answer', time: '23 hours ago' }]);

  console.log(notifications.length);

  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50 justify-end ">
      <div className="relative bg-white max-h-auto w-96 rounded-lg shadow-lg overflow-hidden  flex flex-col animate-slide-in">
        {/* mt-14 mr-[10%] */}
        <div className="sticky flex justify-between top-0 bg-white z-10 p-4 border-b flex-end">
          <h3 className=" xl:text-xl text-xl font-semibold">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &#10005;
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
          {notifications?notifications.map((notification, index) => (
            <div key={index} className="flex items-start space-x-3">
              <img src={userImage} alt="User" className="xl:w-10 w-6 xl:h-10 h-6 rounded-full" />
              <div>
                <p className="text-xs"><span className="font-semibold">@{notification.name}</span> {notification.action}</p>
                <p className="text-[8px] text-gray-500">{notification.time}</p>
              </div>
            </div>
    
          )):''}
        </div>
        {notifications.length===0?<div className='flex flex-col items-center'>
        <p>You have no notifications!</p>
        <img src='/noNotification.png' className=' mb-5 w-86 h-80'/>
        </div>:''}
      </div>
    </div>
  );
};

export default NotificationPopup;

