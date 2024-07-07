// import React, { useContext,useState } from 'react';
// import Profilecomp from '../components/Profilecomp';
// import { FaCalendarAlt } from 'react-icons/fa';
// import UserContext from '../context/userContext';
// import useFetchUser from '../hooks/useFetchUser';
// import { FaEdit } from 'react-icons/fa';
// import InterestModal from '../components/InterestModal';

// const Profile = () => {
//   const{setUser,token,user} = useContext(UserContext);
// const loading = useFetchUser(token, setUser);
// const [isModalOpen, setIsModalOpen] = useState(false);

//  if (loading) {
//     return <div>Loading...</div>;  // Show a loading indicator while fetching user data
//   }

//   // const formatDate = (dateString) => {
//   //   const options = { day: "2-digit", month: "2-digit", year: "numeric" };
//   //   return new Date(dateString).toLocaleDateString("-", options);
//   // };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   // Function to handle opening the modal
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   // Function to handle closing the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return <div className='w-full flex flex-col justify-center items-center'>
     
//       <InterestModal isOpen={isModalOpen} onClose={closeModal} userId={user._id} />

//     <div className="md:w-1/2 w-full mt-5 p-4 bg-white rounded-lg ">
//     <div className="flex md:flex items-center  mb-4">
//         <img
//           src={user.profile_picture}
//           alt="Profile"
//           className="w-24 h-24 rounded-full mr-6"
//         />
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
//           <p className="text-gray-600">Second year CSE student ,IIITM Gwalior</p>
//           <div className="flex items-center text-gray-500 mt-1">
//             <FaCalendarAlt className="mr-2" />
//             <span>Joined on {formatDate(user.createdAt)}</span>
//           </div>
//         </div>
//         <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">
//           Edit Profile
//         </button>
//       </div>
//       <hr className="border-gray-300 mb-4" />
//       <p className="text-gray-700 mb-4">
//         Hi all, my name is Akshay Shinde and I am from Navi Mumbai, Maharashtra. I am currently pursuing my BTECH in Computer Science and Engineering from IIIT Gwalior. I am currently in my 2nd year and I am here to seek help and clarify my doubts on various topics related to my coursework.
//       </p>
//       <div className='flex'>
//       <h1 className="text-xl font-semibold mb-2">Area of Interest</h1>
//       {/* <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={openModal}>
//           <FaEdit className="mr-2" /> Edit
//         </button> */}

//       </div>
//       <div className="flex space-x-2 mb-4">
//        {user.interests.map((interest,index)=>{
//        return <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full" key={index}>{interest}</span>
//        })}
//         <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full">Data Structures</span>
//         <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full">Web Development</span>
//         <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full">Blockchain</span>
//       </div>

//       <hr className="border-gray-300 mb-4" />
//       <div className="flex justify-between mb-4">
//         <button className="text-purple-600 text-lg font-bold focus:outline-none">4 Questions</button>
//         <button className="text-gray-600 focus:outline-none">2 Answers</button>
//         <button className="text-gray-600 focus:outline-none">Comments</button>
//         <button className="text-gray-600 focus:outline-none">Upvotes</button>
//       </div>
//       <hr className="border-gray-300 mb-4" />
//       <h1 className="text-xl font-semibold mb-2">Questions Asked</h1>
//     </div>
//     <div className='w-full md:w-1/2 gap-y-5  mt-3 flex flex-col'>
//     <Profilecomp/>
//     <Profilecomp/>
//     <Profilecomp/>
//     <Profilecomp/>
//     <Profilecomp/>
//     <Profilecomp/>
//     </div>
//   </div>
// };

// export default Profile;


// import React, { useContext, useState } from 'react';
// import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
// import UserContext from '../context/userContext';
// import useFetchUser from '../hooks/useFetchUser';
// import InterestModal from '../components/InterestModal';
// import axios from 'axios';

// const Profile = () => {
//   const { setUser, token, user,backend_url } = useContext(UserContext);
//   const loading = useFetchUser(token, setUser);

//   const [editProfile, setEditProfile] = useState(false);
//   const [editDescription, setEditDescription] = useState(false);
//   const [isModalOpen,setIsModalOpen] = useState(false);
//   const [profileData, setProfileData] = useState({
//     firstName: user.firstName || '',
//     lastName: user.lastName || '',
//     bio: user.bio || '',
//     interests: user.interests || [],
//   });
 

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const saveProfile = async () => {
//     try {
//       const response = await axios.put(`${backend_url}/api/user/profile`, profileData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.data.success) {
//         console.log('Profile updated successfully');
//         setEditProfile(false);
//       } else {
//         console.error('Failed to update profile:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const saveDescription = async () => {
//     try {
//       const response = await axios.put(`${backend_url}/api/user/bio`, { bio: profileData.bio }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.data.success) {
//         console.log('Description updated successfully');
//         setEditDescription(false);
//       } else {
//         console.error('Failed to update description:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error updating description:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if(!user){
//     return null;
//   }
//   const handleProfileInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="w-full flex flex-col justify-center items-center">
//       <InterestModal isOpen={isModalOpen} onClose={closeModal} userId={user._id} />

//       <div className="md:w-1/2 w-full mt-5 p-4 bg-white rounded-lg ">
//         <div className="flex md:flex items-center  mb-4">
//           <img
//             src={user.profile_picture}
//             alt="Profile"
//             className="w-24 h-24 rounded-full mr-6"
//           />
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
//             {editProfile ? (
//               <input
//                 type="text"
//                 name="bio"
//                 value={profileData.bio}
//                 onChange={handleProfileInputChange}
//                 className="border border-gray-300 p-1 rounded w-full mb-2"
//                 placeholder="Add description bio yourself"
//               />
//             ) : (
//               <p className="text-gray-600">{user.bio ? user.bio : 'Add description bio yourself'}</p>
//             )}
//             <div className="flex items-center text-gray-500 mt-1">
//               <FaCalendarAlt className="mr-2" />
//               <span>Joined on {formatDate(user.createdAt)}</span>
//             </div>
//           </div>
//           <button
//             onClick={() => setEditProfile(!editProfile)}
//             className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
//           >
//             {editProfile ? 'Save' : 'Edit Profile'}
//           </button>
//         </div>
//         <hr className="border-gray-300 mb-4" />
//         <p className="text-gray-700 mb-4">
//           {editDescription ? (
//             <input
//               type="text"
//               name="bio"
//               value={profileData.bio}
//               onChange={handleProfileInputChange}
//               className="border border-gray-300 p-1 rounded w-full mb-2"
//               placeholder="Add description bio yourself"
//             />
//           ) : (
//             <>{user.bio ? user.bio : 'Add description bio yourself'}</>
//           )}
//         </p>
//         <div className='flex'>
//           <h1 className="text-xl font-semibold mb-2">Area of Interest</h1>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={openModal}>
//             <FaEdit className="mr-2" /> Edit
//           </button>
//         </div>
//         <div className="flex space-x-2 mb-4">
//           {user.interests.length === 0 && (
//             <span className="text-gray-600 cursor-pointer" onClick={() => setEditProfile(true)}>
//               Add your profile
//             </span>
//           )}
//           {user.interests.map((interest, index) => (
//             <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full" key={index}>{interest}</span>
//           ))}
//         </div>

//         <hr className="border-gray-300 mb-4" />
//         <div className="flex justify-between mb-4">
//           <button className="text-purple-600 text-lg font-bold focus:outline-none">4 Questions</button>
//           <button className="text-gray-600 focus:outline-none">2 Answers</button>
//           <button className="text-gray-600 focus:outline-none">Comments</button>
//           <button className="text-gray-600 focus:outline-none">Upvotes</button>
//         </div>
//         <hr className="border-gray-300 mb-4" />
//         <h1 className="text-xl font-semibold mb-2">Questions Asked</h1>
//       </div>
//       <div className='w-full md:w-1/2 gap-y-5  mt-3 flex flex-col'>
//         {/* Render Profilecomp components */}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useContext, useState,useEffect } from 'react';
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';
import InterestModal from '../components/InterestModal';
import axios from 'axios';
import Hero from '../components/Hero';
import AnswerCard from '../components/AnswerCard';

const Profile = () => {
  const { setUser, token, user ,backend_url} = useContext(UserContext);
  const loading = useFetchUser(token, setUser);
  const [isModalOpen,setIsModalOpen] =useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState([]);
  const [btnfiels,setBtnField] = useState('questions');
  const [error,setError] = useState('');
  // const [loader,setLoading] = useState(true);
  
  const [profileData, setProfileData] = useState(
   user?{
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    bio: user.bio || '',
    interests: user.interests || [],
  }:'');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userId = user._id;
        const response = await axios.get(`${backend_url}/api/question/get/${userId}`);
        if (response.data.success) {
          setQuestions(response.data.data.questions);
        } else {
          setError('Failed to fetch questions');
        }
      } catch (err) {
        setError('Error fetching questions');
        console.error(err);
      }
    };
  
    const fetchAnswers = async () => {
      try {
        const userId = user._id;
        const response = await axios.post(`${backend_url}/api/answer/${userId}`);
        if (response.data.success) {
          setAnswers(response.data.data);
        } else {
          setError('Failed to fetch answers');
        }
      } catch (err) {
        setError('Error fetching answers');
        console.error(err);
      }
    };
    
    fetchQuestions();
    fetchAnswers();
  }, [user]);
  

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const userId = user._id;
  //       const response = await axios.get(`${backend_url}/api/question/get/${userId}`);
  //       if (response.data.success) {
  //         setQuestions(response.data.data.questions);
  //       } else {
  //         setError('Failed to fetch questions');
  //       }
  //     } catch (err) {
  //       setError('Error fetching questions');
  //       console.error(err);
  //     }

  //   const fetchAnswers = async () => {
  //     try {
  //       const userId = user._id;
  //       const response = await axios.get(`${backend_url}/api/answer/${userId}`);
  //       if (response.data.success) {
  //         setAnswers(response.data.data);
  //       } else {
  //         setError('Failed to fetch answers');
  //       }
  //     } catch (err) {
  //       setError('Error fetching answers');
  //       console.error(err);
  //     }
  //   }
    
  //   fetchQuestions();
  //   fetchAnswers();
  // },[user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const saveProfile = async () => {
    try {
      const response = await axios.put(`${backend_url}/api/user/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log('Profile updated successfully');
        setEditProfile(false);
      } else {
        console.error('Failed to update profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const saveDescription = async () => {
    try {
      const response = await axios.put(`${backend_url}/api/user/bio`, { bio: profileData.bio }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log('Description updated successfully');
        setEditDescription(false);
      } else {
        console.error('Failed to update description:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!user){
    return null;
  }
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 
  return (
    <div className="w-full flex flex-col justify-center items-center">
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
            {editProfile ? (
              <input
                type="text"
                name="course"
                value={profileData.course}
                onChange={handleProfileInputChange}
                className="border border-gray-300 p-1 rounded w-full mb-2"
                placeholder="Edit your course information"
              />
            ) : (
              <p className="text-gray-600 cursor-pointer" onClick={() => setEditProfile(true)}>
                {user.course ? user.course : 'Add your course information'}
              </p>
            )}
            <div className="flex items-center text-gray-500 mt-1">
              <FaCalendarAlt className="mr-2" />
              <span>Joined on {formatDate(user.createdAt)}</span>
            </div>
          </div>
          <button
            onClick={() => setEditProfile(!editProfile)}
            className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
          >
            {editProfile ? 'Save' : 'Edit Profile'}
          </button>
        </div>
        <hr className="border-gray-300 mb-4" />
        <p className="text-gray-700 mb-4">
          {editDescription ? (
            <input
              type="text"
              name="bio"
              value={profileData.bio}
              onChange={handleProfileInputChange}
              className="border border-gray-300 p-1 rounded w-full mb-2"
              placeholder="Edit description bio yourself"
            />
          ) : (
            <>{user.bio ? user.bio : 'Add description bio yourself'}</>
          )}
        </p>
        <div className='flex justify-between'>
          <h1 className="text-xl font-semibold mb-2">Area of Interest</h1>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={openModal}>
            <FaEdit className="mr-2" /> Edit
          </button>
        </div>
        <div className="flex space-x-2 mb-4">
          {user.interests.length === 0 && (
            <span className="text-gray-600 cursor-pointer" onClick={() => setEditProfile(true)}>
              Add your interests
            </span>
          )}
          {user.interests.map((interest, index) => (
            <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full" key={index}>{interest}</span>
          ))}
        </div>

        <hr className="border-gray-300 mb-4" />
        <div className="flex justify-between mb-4">
          <button className={`${btnfiels==='questions'?"text-purple-600 font-bold":"text-gray-600"} focus:outline-none`} onClick={()=>{setBtnField('questions')}}>{questions.length} Questions</button>

          <button className={`${btnfiels==='answers'?"text-purple-600 font-bold":"text-gray-600"} text-gray-600 focus:outline-none`} onClick={()=>{setBtnField('answers')}}>{answers.length} Answers</button>
          <button className="text-gray-600 focus:outline-none">Comments</button>
          <button className="text-gray-600 focus:outline-none">Upvotes</button>
        </div>
        <hr className="border-gray-300 mb-4" />
        <h1 className="text-xl font-semibold mb-2">Questions Asked</h1>
      </div>
      {btnfiels==='questions'?<div className='w-full gap-y-5  mt-3 flex flex-col items-center'>
        {questions.map((ques,index)=>{
          return <Hero question={ques} key={index}/>
        })}
      </div>
      :''}
      {btnfiels==='answers'?<div className='w-full gap-y-5  mt-3 flex flex-col items-center'>
        {answers.map((answer,index)=>{
          return <AnswerCard answer={answer} key={index} />
        })}
      </div>
      :''}
    </div>
  );
};

export default Profile;
