import React, { useContext,useState } from 'react';
import Profilecomp from '../components/Profilecomp';
import { FaCalendarAlt } from 'react-icons/fa';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';
import { FaEdit } from 'react-icons/fa';
import InterestModal from '../components/InterestModal';

const Profile = () => {
  const{setUser,token,user} = useContext(UserContext);
const loading = useFetchUser(token, setUser);
const [isModalOpen, setIsModalOpen] = useState(false);

 if (loading) {
    return <div>Loading...</div>;  // Show a loading indicator while fetching user data
  }

  // const formatDate = (dateString) => {
  //   const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  //   return new Date(dateString).toLocaleDateString("-", options);
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return <div className='w-full flex flex-col justify-center items-center'>
     
      <InterestModal isOpen={isModalOpen} onClose={closeModal} userId={user._id} />

    <div className="md:w-1/2 w-full mt-5 p-4 bg-white rounded-lg ">
    <div className="flex md:flex items-center  mb-4">
        <img
          src={user.profile_picture}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-6"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-600">Second year CSE student ,IIITM Gwalior</p>
          <div className="flex items-center text-gray-500 mt-1">
            <FaCalendarAlt className="mr-2" />
            <span>Joined on {formatDate(user.createdAt)}</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
      <hr className="border-gray-300 mb-4" />
      <p className="text-gray-700 mb-4">
        Hi all, my name is Akshay Shinde and I am from Navi Mumbai, Maharashtra. I am currently pursuing my BTECH in Computer Science and Engineering from IIIT Gwalior. I am currently in my 2nd year and I am here to seek help and clarify my doubts on various topics related to my coursework.
      </p>
      <div className='flex'>
      <h1 className="text-xl font-semibold mb-2">Area of Interest</h1>
      <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={openModal}>
          <FaEdit className="mr-2" /> Edit
        </button>

      </div>
      <div className="flex space-x-2 mb-4">
       {user.interests.map((interest,index)=>{
       return <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full" key={index}>{interest}</span>
       })}
        {/* <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full">Data Structures</span> */}
      </div>

      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between mb-4">
        <button className="text-purple-600 text-lg font-bold focus:outline-none">4 Questions</button>
        <button className="text-gray-600 focus:outline-none">2 Answers</button>
        <button className="text-gray-600 focus:outline-none">Comments</button>
        <button className="text-gray-600 focus:outline-none">Upvotes</button>
      </div>
      <hr className="border-gray-300 mb-4" />
      <h1 className="text-xl font-semibold mb-2">Questions Asked</h1>
    </div>
    <div className='w-full md:w-1/2 gap-y-5  mt-3 flex flex-col'>
    <Profilecomp/>
    <Profilecomp/>
    <Profilecomp/>
    <Profilecomp/>
    <Profilecomp/>
    <Profilecomp/>
    </div>
  </div>
};

export default Profile;
