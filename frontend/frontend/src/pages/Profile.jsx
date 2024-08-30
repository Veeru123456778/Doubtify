// import React, { useContext, useState, useEffect } from 'react';
// import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
// import UserContext from '../context/userContext';
// import useFetchUser from '../hooks/useFetchUser';
// import InterestModal from '../components/InterestModal';
// import axios from 'axios';
// import Hero from '../components/Hero';
// import AnswerCard from '../components/AnswerCard';
// import { TailSpin } from 'react-loader-spinner';

// const Profile = () => {
//   const { setUser, token, user, backend_url } = useContext(UserContext);
//   const loading = useFetchUser(token, setUser);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editProfile, setEditProfile] = useState(false);
//   const [editDescription, setEditDescription] = useState(false);
//   const [description, setDescription] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [btnField, setBtnField] = useState('questions');
//   const [error, setError] = useState('');
//   const { isDarkTheme } = useContext(UserContext);

//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     bio: '',
//     interests: [],
//   });

//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         bio: user.bio || '',
//         interests: user.interests || [],
//       });
//       setDescription(user.bio || '');
//     }
//   }, [user]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const userId = user._id;
//         const response = await axios.get(`${backend_url}/api/question/get/${userId}`);
//         if (response.data.success) {
//           setQuestions(response.data.data.questions);
//         } else {
//           setError('Failed to fetch questions');
//         }
//       } catch (err) {
//         setError('Error fetching questions');
//         console.error(err);
//       }
//     };

//     const fetchAnswers = async () => {
//       try {
//         const userId = user._id;
//         const response = await axios.post(`${backend_url}/api/answer/${userId}`);
//         if (response.data.success) {
//           setAnswers(response.data.data);
//         } else {
//           setError('Failed to fetch answers');
//         }
//       } catch (err) {
//         setError('Error fetching answers');
//         console.error(err);
//       }
//     };

//     fetchQuestions();
//     fetchAnswers();
//   }, [user, backend_url]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//     return formattedDate;
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
//     const userId = user._id;
//     try {
//       const response = await axios.put(
//         `${backend_url}/api/user/${userId}/bio`,
//         { bio: description },
//       );
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

//   const handleProfileInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({
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

// if (loading) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <TailSpin color="#00BFFF" height={80} width={80} />
//     </div>
//   );
// }
//   return (
//     <div className="w-full flex flex-col justify-center items-center">
//       <InterestModal isOpen={isModalOpen} onClose={closeModal} userId={user._id} />

//       <div className={`md:w-1/2 w-full mt-5 p-4 shadow-slate-600 shadow-sm rounded-lg ${isDarkTheme ? 'bg-[#1f2530]' : 'bg-white'}`}>
//         <div className="flex md:flex items-center mb-4">
//           <img
//             src={user.profile_picture}
//             alt="Profile"
//             className="w-24 h-24 rounded-full mr-6"
//           />
//           <div className="flex-1">
//             <h1 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>{user.firstName} {user.lastName}</h1>
//             {editProfile ? (
//               <input
//                 type="text"
//                 name="course"
//                 value={profileData.course}
//                 onChange={handleProfileInputChange}
//                 className="border border-gray-300 p-1 rounded w-full mb-2 focus:outline-none"
//                 placeholder="Edit your course information"
//               />
//             ) : (
//               <p className={`cursor-pointer ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`} onClick={() => setEditProfile(true)}>
//                 {user.course ? user.course : 'Add your course information'}
//               </p>
//             )}
//             <div className="flex items-center text-gray-500 mt-1">
//               <FaCalendarAlt className="mr-2" />
//               <span>Joined on {formatDate(user.createdAt)}</span>
//             </div>
//           </div>
//           <button
//             onClick={() => setEditProfile(!editProfile)}
//             className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none"
//           >
//             {editProfile ? 'Save' : 'Edit Profile'}
//           </button>
//         </div>
//         <hr className="border-gray-300 mb-4" />
//         <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
//           {editDescription ? (
//             <>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none"
//                 rows={4}
//                 placeholder="Edit description about yourself"
//               />
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => {
//                     saveDescription();
//                     setEditDescription(false);
//                   }}
//                   className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 mr-2 focus:outline-none"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditDescription(false)}
//                   className="text-gray-600 hover:text-gray-800 focus:outline-none"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               {user.bio ? user.bio : (
//                 <button
//                   onClick={() => setEditDescription(true)}
//                   className="text-blue-500 hover:underline focus:outline-none"
//                 >
//                   Add Description
//                 </button>
//               )}
//             </>
//           )}
//         </p>
//         <div className='flex justify-between'>
//           <h1 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Area of Interest</h1>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={openModal}>
//             <FaEdit className="mr-2" /> Edit
//           </button>
//         </div>
//         <div className="flex space-x-2 mb-4">
//           {user.interests.length === 0 && (
//             <span
//               className="text-gray-600 cursor-pointer"
//               onClick={() => setEditProfile(true)}
//             >
//               Add your interests
//             </span>
//           )}
//           {user.interests.map((interest, index) => (
//             <span
//               className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full"
//               key={index}
//             >
//               {interest}
//             </span>
//           ))}
//         </div>
//         <hr className="border-gray-300 mb-4" />
//         <div className="flex justify-between mb-4">
//           <button className={`${btnField === 'questions' ? "text-purple-600 font-bold" : ""} ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} focus:outline-none`} onClick={() => { setBtnField('questions') }}>{questions.length} Questions</button>
//           <button className={`${btnField === 'answers' ? "text-purple-600 font-bold" : ""} ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} focus:outline-none`} onClick={() => { setBtnField('answers') }}>{answers.length} Answers</button>
//           <button className={`focus:outline-none ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Comments</button>
//           <button className={`focus:outline-none ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Upvotes</button>
//         </div>
//         <hr className="border-gray-300 mb-4" />
//         <h1 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Questions Asked</h1>
//       </div>
//       <div className="w-full mt-3 flex flex-col items-center">
//         {btnField === 'questions' &&
//           questions.map((ques, index) => {
//             return <Hero question={ques} key={index} />;
//           })}
//         {btnField === 'answers' &&
//           answers.map((answer, index) => {
//             return <AnswerCard answer={answer} key={index} />;
//           })}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useContext, useState, useEffect } from "react";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import UserContext from "../context/userContext";
import useFetchUser from "../hooks/useFetchUser";
import InterestModal from "../components/InterestModal";
import EditProfileModal from "../components/EditProfileModal";
import axios from "axios";
import Hero from "../components/Hero";
import AnswerCard from "../components/AnswerCard";
import { TailSpin } from "react-loader-spinner";

const Profile = () => {
  const { setUser, token, user, backend_url } = useContext(UserContext);
  const loading = useFetchUser(token, setUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [btnField, setBtnField] = useState("questions");
  const [error, setError] = useState("");
  const { isDarkTheme } = useContext(UserContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userId = user._id;
        const response = await axios.get(
          `${backend_url}/api/question/get/${userId}`
        );
        if (response.data.success) {
          setQuestions(response.data.data.questions);
        } else {
          setError("Failed to fetch questions");
        }
      } catch (err) {
        setError("Error fetching questions");
        console.error(err);
      }
    };

    // const fetchAnswers = async () => {
    //   try {
    //     const userId = user._id;
    //     const response = await axios.post(
    //       `${backend_url}/api/answer/${userId}`
    //     );
    //     if (response.data.success) {
    //       setAnswers(response.data.data);
    //     } else {
    //       setError("Failed to fetch answers");
    //     }
    //   } catch (err) {
    //     setError("Error fetching answers");
    //     console.error(err);
    //   }
    // };

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
  }, [user, backend_url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <InterestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={user._id}
      />
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        user={user}
        token={token}
        backend_url={backend_url}
        setUser={setUser}
      />

      <div
        className={`md:w-1/2 w-full mt-5 p-4 shadow-slate-600 shadow-sm rounded-lg ${
          isDarkTheme ? "bg-[#1f2530]" : "bg-white"
        }`}
      >
        <div className="flex md:flex items-center mb-4 w-full">
          <img
            src={user.profile_picture}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6"
          />
          <div className="flex-1">
            <h1
              className={`text-2xl font-bold ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            >
              {user.firstName} {user.lastName}
            </h1>
            <p
              className={`mb-4 ${
                isDarkTheme ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {user.bio}
            </p>
            <div className="flex items-center text-gray-500 mt-1">
              <FaCalendarAlt className="mr-2" />
              <span>Joined on {formatDate(user.createdAt)}</span>
            </div>
          </div>
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Edit
          </button>
        </div>
        <hr className="border-gray-300 mb-4" />

        <div className="flex gap-3 items-center w-full mb-3">
          <h1
            className={`text-xl font-semibold ${
              isDarkTheme ? "text-white" : "text-black"
            }`}
          >
            Area of Interest
          </h1>
          {/* <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          > */}
          <button
            className="flex items-center px-4 py-2 text-black rounded-md text-sm "
            onClick={() => setIsModalOpen(true)}
          >
            <FaEdit className="mr-2" />
          </button>
        </div>
        <div className="flex space-x-2 mb-4">
          {user.interests.length === 0 && (
            <span
              className="text-gray-600 cursor-pointer"
              onClick={() => setIsEditProfileModalOpen(true)}
            >
              Add your interests
            </span>
          )}
          {user.interests.map((interest, idx) => (
            <span
              key={idx}
              className="inline-block bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              {interest}
            </span>
          ))}
        </div>
        <hr className="border-gray-300 mb-4" />
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 w-full">
            <button
              className={`py-2 px-4 rounded-md text-sm font-semibold ${
                btnField === "questions"
                  ? "bg-blue-500 text-white"
                  : isDarkTheme
                  ? "text-white"
                  : "text-black"
              }`}
              onClick={() => setBtnField("questions")}
            >
              Questions
            </button>
            <button
              className={`py-2 px-4 rounded-md text-sm font-semibold ${
                btnField === "answers"
                  ? "bg-blue-500 text-white"
                  : isDarkTheme
                  ? "text-white"
                  : "text-black"
              }`}
              onClick={() => setBtnField("answers")}
            >
              Answers
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-3 flex flex-col items-center">
        {btnField === "questions" && (
          <>
            {questions.length === 0 ? (
              <p>No questions found</p>
            ) : (
              questions.map((question, idx) => <Hero question={question} />)
            )}
          </>
        )}
        {btnField === "answers" && (
          <>
            {answers.length === 0 ? (
              <p>No answers found</p>
            ) : (
              answers.map((answer, idx) => <AnswerCard answer={answer} />)
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
