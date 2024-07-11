// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiX,
//   FiMoreHorizontal,
//   FiLink,
//   FiBookmark,
//   FiArrowUp,
// } from "react-icons/fi";
// import AnswerPopup from "./AnswerPopup";
// import axios from "axios";
// import UserContext from "../context/userContext";
// import useFetchUser from "../hooks/useFetchUser";
// import { toast } from 'react-toastify';
// import { TailSpin } from 'react-loader-spinner';
// import Loader from "./loader";

// const Hero = ({ stopOnClick, question }) => {

//   const [showOptions, setShowOptions] = useState(false);
//   const [showAnswerPopup, setShowAnswerPopup] = useState(false);
//   const [upvotes, setUpvotes] = useState(question.upvotes || 0);
//   const [isUpvote, setIsUpvote] = useState(false);
//   const [User, setUsers] = useState("");
//   const [answers, setAnswers] = useState([]);
//   const navigate = useNavigate();
//   const { backend_url, user, token, setUser } = useContext(UserContext);

//     const loading = useFetchUser(token, setUser);
  


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(`${backend_url}/api/user/otheruserInfo`, { user_Id: question.userId });
//         if (response.data.success) {
//           setUsers(response.data.user);
//         }
//       } catch (error) {
//         console.error("Error Finding User Info:", error);
//       }
//     };

//     const fetchUpvoteStatus = async () => {
//       try {
//         const response = await axios.post(`${backend_url}/api/question/upvoteStatus`, {
//           questionId: question._id,
//           userId: user._id
//         });
//         if (response.data.success) {
//           setIsUpvote(response.data.isUpvoted);
//         }
//       } catch (error) {
//         console.error("Error checking upvote status:", error);
//       }
//     };

//     const fetchAnswers = async () => {
//       try {
//         const response = await axios.get(`${backend_url}/api/answer/${question._id}`);
//         console.log(response.data.data);
//         setAnswers(response.data.data); // Assuming the response contains the answer data
//       } catch (error) {
//         console.error('Error fetching answers:', error);
//       }
//     };
  
//     fetchAnswers();
//     fetchData();
//     fetchUpvoteStatus();
//   }, [backend_url,user,question]);

  
//   const handleMoreClick = (e) => {
//     e.stopPropagation();
//     setShowOptions(!showOptions);
//   };

//   const handleAnswerClick = (e) => {
//     e.stopPropagation();
//     setShowAnswerPopup(true);
//   };

//   const closeAnswerPopup = () => {
//     setShowAnswerPopup(false);
//   };

//   const handleComponentClick = (e) => {
//     if (stopOnClick) {
//       return;
//     }
//     e.stopPropagation();
//     navigate("Answer", { state: { question } }); // Update this path to match your route
//   };

//   const handleUpvotes = async (e) => {
//     e.stopPropagation();
//     setIsUpvote((prev) => !prev);
//     try {
//       const response = await axios.post(`${backend_url}/api/question/upvote`, {
//         questionId: question._id,
//         userId: user._id
//       });

//       // console.log("Response:", response);

//       if (response.data.success) {
//         const updatedQuestion = response.data.question;
//         // console.log("Updated Question:", updatedQuestion);

//         if (updatedQuestion && typeof updatedQuestion.upvotes === 'number') {
//           setUpvotes(updatedQuestion.upvotes);
//         } else {
//           console.error("Unexpected API response structure:", response.data);
//         }
//       } else {
//         console.error("API call was not successful:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating upvotes:", error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }
//     if (loading) {
//     // return <div>Loading...</div>;
//     return (
//       <div className="flex justify-center items-center h-32">
//         <TailSpin height="50" width="50" color="#4A90E2" ariaLabel="loading" />
//          {/* <Loader loading={loading} />; */}
//       </div>

//     );
//   }

//   if (!user) {
//     return null;
//   }

  
//   const handleBookmark = async (e) => {
//     e.stopPropagation();
//     try {
//       const response = await axios.post(`${backend_url}/api/bookmark/add`, {

//         questionId:question._id,
//         userId: user._id
//       });

//       if (response.data.success) {
//         toast.success(response.data.message);
//         console.log("Bookmark added");
//       } else {
//         toast.error(response.data.message);
//         console.error("Error adding bookmark:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error adding bookmark:", error);
//     }
//   };

//     const handleCopyLink = (e) => {
//     e.stopPropagation();
//     const publicUrl = `${window.location.origin}/question/${question._id}`;
//     navigator.clipboard.writeText(publicUrl)
//       .then(() => {
//         toast.success("Link copied to clipboard!");
//       })
//       .catch((error) => {
//         toast.error("Failed to copy link.");
//         console.error("Error copying link:", error);
//       });
//   };

//   return (
//     <div className="bg-gray-100 xl:p-6 p-4 rounded-lg shadow-lg w-full md:w-1/2 my-4 place-items-center relative">
//       <button className="absolute top-2 right-2 text-gray-500">
//         <FiX size={20} />
//       </button>
//       <div className="cursor-pointer">
//         <div className="flex items-center mb-4">
//           <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
//             <span className="text-gray-500 text-lg">AS</span>
//           </div>
//           <div>
//             <h2 className="text-base font-semibold">
//               {User.firstName} {User.lastName}
//             </h2>
//             <div className="flex gap-x-2">
//               <p className="text-gray-600 text-xs">
//                 Second year BTECH CSE Student
//               </p>
//               <p className="text-gray-500 text-[11px] font-thin">
//                 {formatDate(question.createdAt)}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <h3 className="text-base font-medium mb-2 w-full">{question.body}</h3>

//           {question.files.map((file) => (
//             <img src={file} alt="image" key={file} className="mt-3 mb-3" />
//           ))}

//           <p className="text-gray-500 text-[11px] font-normal mb-1 ml-2" onClick={handleComponentClick}>
//            {answers.length} {answers.length===1?"Answer":"Answers"}
//           </p>
//           <div className="flex flex-row items-center justify-between sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center mb-2 sm:mb-0">
//               <button
//                 onClick={handleAnswerClick}
//                 className="text-blue-600 mr-4 px-4 py-2 bg-blue-100 rounded-lg"
//               >
//                 Answer
//               </button>
//               <button
//                 className={`flex items-center text-green-600 px-4 py-2 bg-green-100 rounded-lg mr-4 ${isUpvote ? 'bg-green-600 text-white' : ''}`}
//                 onClick={handleUpvotes}
//               >
//                 <FiArrowUp className={`mr-1 ${isUpvote ? 'text-white' : ''}`} />{upvotes}
//               </button>
//             </div>
//             <div className="relative">
//               <button
//                 onClick={handleMoreClick}
//                 className="text-gray-500"
//               >
//                 <FiMoreHorizontal size={20} />
//               </button>
//               {showOptions && (
//                 <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
//                   <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleCopyLink}>
//                     <FiLink className="mr-2" /> Copy Link
//                   </button>
//                   <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleBookmark}>
//                     <FiBookmark className="mr-2" /> Bookmark
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {showAnswerPopup && <AnswerPopup setShowAnswerPopup={setShowAnswerPopup} question={question} />}
//       {/* {showAnswerPopup && <AnswerPopup onClose={closeAnswerPopup} setShowAnswerPopup={setShowAnswerPopup} question={question} />} */}
//     </div>
//   );
// };

// export default Hero;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiMoreHorizontal,
  FiLink,
  FiBookmark,
  FiArrowUp,
} from "react-icons/fi";
import AnswerPopup from "./AnswerPopup";
import axios from "axios";
import UserContext from "../context/userContext";
import useFetchUser from "../hooks/useFetchUser";
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = ({ stopOnClick, question }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const [upvotes, setUpvotes] = useState(question.upvotes || 0);
  const [isUpvote, setIsUpvote] = useState(false);
  const [User, setUsers] = useState({});
  const [answers, setAnswers] = useState([]);
  const [load, setLoading] = useState(true);
  const navigate = useNavigate();
  const { backend_url, user, token, setUser, isDarkTheme } = useContext(UserContext);

  const loading = useFetchUser(token, setUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/user/otheruserInfo`, { user_Id: question.userId });
        if (response.data.success) {
          setUsers(response.data.user);
        }
      } catch (error) {
        console.error("Error Finding User Info:", error);
      }
    };

    const fetchUpvoteStatus = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/question/upvoteStatus`, {
          questionId: question._id,
          userId: user._id
        });
        if (response.data.success) {
          setIsUpvote(response.data.isUpvoted);
        }
      } catch (error) {
        console.error("Error checking upvote status:", error);
      }
    };

    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/answer/${question._id}`);
        setAnswers(response.data.data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnswers();
    fetchData();
    fetchUpvoteStatus();
  }, [backend_url, user, question]);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleAnswerClick = (e) => {
    e.stopPropagation();
    setShowAnswerPopup(true);
  };

  const closeAnswerPopup = () => {
    setShowAnswerPopup(false);
  };

  const handleComponentClick = (e) => {
    if (stopOnClick) {
      return;
    }
    e.stopPropagation();
    navigate("Answer", { state: { question } });
  };

  const handleUpvotes = async (e) => {
    e.stopPropagation();
    setIsUpvote((prev) => !prev);
    try {
      const response = await axios.post(`${backend_url}/api/question/upvote`, {
        questionId: question._id,
        userId: user._id
      });

      if (response.data.success) {
        const updatedQuestion = response.data.question;
        if (updatedQuestion && typeof updatedQuestion.upvotes === 'number') {
          setUpvotes(updatedQuestion.upvotes);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } else {
        console.error("API call was not successful:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating upvotes:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  //   if (loading) {
  //   // return <div>Loading...</div>;
  //   return (
  //     <div className="flex justify-center items-center h-32">
  //       <TailSpin height="50" width="50" color="#4A90E2" ariaLabel="loading" />
  //     </div>
  //   );
  // }

  if (!user) {
    return null;
  }

  
  const handleBookmark = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${backend_url}/api/bookmark/add`, {
        questionId: question._id,
        userId: user._id
      });

      if (response.data.success) {
        toast.success(response.data.message);
        console.log("Bookmark added");
      } else {
        toast.error(response.data.message);
        console.error("Error adding bookmark:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const publicUrl = `${window.location.origin}/question/${question._id}`;
    navigator.clipboard.writeText(publicUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy link.");
        console.error("Error copying link:", error);
      });
  };

  if (loading) {
    // return (
    //   <div className="flex justify-center items-center h-32">
    //     <TailSpin height={50} width={50} color="#4A90E2" ariaLabel="loading" />
    //   </div>
    // );
  }

  if (!user) {
    return null;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
  };

  return (
    <div className={`xl:p-6 p-4 rounded-lg  shadow-slate-600 shadow-sm w-full md:w-1/2 my-4 place-items-center relative ${isDarkTheme ? `bg-[#1f2530]` : 'bg-gray-100'}`}>
      <button className="absolute top-2 right-2 text-gray-500">
        <FiX size={20} />
      </button>
      <div className="cursor-pointer">
        <div className="flex items-center mb-4">
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
            <span className="text-gray-500 text-lg">
              {User.firstName && User.firstName.charAt(0)}
              {User.lastName && User.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className={`text-base font-semibold ${isDarkTheme ? 'text-white' : 'text-black'}`}>
              {User.firstName} {User.lastName}
            </h2>
            <div className="flex gap-x-2">
              <p className={isDarkTheme?"text-gray-400 text-xs":"text-gray-600 text-xs"}>
                Second year BTECH CSE Student
              </p>
              <p className="text-gray-500 text-[11px] font-thin">
                {formatDate(question.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className={`text-base  font-medium mb-2 w-full ${isDarkTheme ?"text-white":"text-black"}`}>{question.body}</h3>

          {question.files.length>1 && <Slider {...sliderSettings}>
            {question.files.map((file, index) => (
              <div key={index}>
                <img src={file} alt={`image-${index}`} className="h-80 w-full overflow-hidden mt-3 mb-3" />
              </div>
            ))}
          </Slider>}

          {question.files.length===1 && question.files.map((file, index) => (
              <div key={index}>
                <img src={file} alt={`image-${index}`} className="mt-3 mb-3" />
              </div>
            ))}

          <p className={`${isDarkTheme ? 'text-gray-200':'text-gray-500'} text-[11px] font-normal mb-1 ml-2`} onClick={handleComponentClick}>
            {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
          </p>
          <div className="flex flex-row items-center justify-between sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <button
                onClick={handleAnswerClick}
                className="text-blue-600 mr-2 px-4 py-1 bg-blue-100 rounded-lg"
              >
                Answer
              </button>
              <button
                className={`flex items-center text-green-600 px-4 py-1 bg-green-100 rounded-lg mr-2 ${isUpvote ? 'bg-green-600 text-white' : ''}`}
                onClick={handleUpvotes}
              >
                <FiArrowUp className={`mr-1 ${isUpvote ? 'text-white' : ''}`} />{upvotes}
              </button>
            </div>
            <div className="relative">
              <button
                onClick={handleMoreClick}
                className="text-gray-500"
              >
                <FiMoreHorizontal size={20} />
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleCopyLink}>
                    <FiLink className="mr-2" /> Copy Link
                  </button>
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleBookmark}>
                    <FiBookmark className="mr-2" /> Bookmark
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAnswerPopup && <AnswerPopup setShowAnswerPopup={setShowAnswerPopup} question={question} />}
    </div>
  );
};

export default Hero;


// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiX, FiMoreHorizontal, FiLink, FiBookmark, FiArrowUp } from "react-icons/fi";
// import AnswerPopup from "./AnswerPopup";
// import axios from "axios";
// import UserContext from "../context/userContext";
// import useFetchUser from "../hooks/useFetchUser";
// import { toast } from 'react-toastify';
// import { TailSpin } from 'react-loader-spinner';


// const Hero = ({ stopOnClick, question }) => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [showAnswerPopup, setShowAnswerPopup] = useState(false);
//   const [upvotes, setUpvotes] = useState(question.upvotes || 0);
//   const [isUpvote, setIsUpvote] = useState(false);
//   const [User, setUsers] = useState("");
//   const [answers, setAnswers] = useState([]);
//   const navigate = useNavigate();
//   const { backend_url, user, token, setUser } = useContext(UserContext);

//   const loading = useFetchUser(token, setUser);

//   useEffect(() => {
//     const fetchData = async () => {
//       if(question){
//       try {
//         const response = await axios.post(`${backend_url}/api/user/otheruserInfo`, { user_Id: question.userId });
//         if (response.data.success) {
//           setUsers(response.data.user);
//         }
//       } catch (error) {
//         console.error("Error Finding User Info:", error);
//       }
//     };

//     const fetchUpvoteStatus = async () => {
//       try {
//         const response = await axios.post(`${backend_url}/api/question/upvoteStatus`, {
//           questionId: question._id,
//           userId: user._id
//         });
//         if (response.data.success) {
//           setIsUpvote(response.data.isUpvoted);
//         }
//       } catch (error) {
//         console.error("Error checking upvote status:", error);
//       }
//     }
//     };

//     const fetchAnswers = async () => {
//       try {
//         const response = await axios.get(`${backend_url}/api/answer/${question._id}`);
//         console.log(response.data.data);
//         setAnswers(response.data.data); // Assuming the response contains the answer data
//       } catch (error) {
//         console.error('Error fetching answers:', error);
//       }
//     };

//     fetchAnswers();
//     fetchData();
//     fetchUpvoteStatus();
//   }, [backend_url, question._id, question.userId, user]);

//   const handleMoreClick = (e) => {
//     e.stopPropagation();
//     setShowOptions(!showOptions);
//   };

//   const handleAnswerClick = (e) => {
//     e.stopPropagation();
//     setShowAnswerPopup(true);
//   };

//   const closeAnswerPopup = () => {
//     setShowAnswerPopup(false);
//   };

//   const handleComponentClick = (e) => {
//     if (stopOnClick) {
//       return;
//     }
//     e.stopPropagation();
//     navigate("Answer", { state: { question } }); // Update this path to match your route
//   };

//   const handleUpvotes = async (e) => {
//     e.stopPropagation();
//     setIsUpvote((prev) => !prev);
//     try {
//       const response = await axios.post(`${backend_url}/api/question/upvote`, {
//         questionId: question._id,
//         userId: user._id
//       });

//       // console.log("Response:", response);

//       if (response.data.success) {
//         const updatedQuestion = response.data.question;
//         // console.log("Updated Question:", updatedQuestion);

//         if (updatedQuestion && typeof updatedQuestion.upvotes === 'number') {
//           setUpvotes(updatedQuestion.upvotes);
//         } else {
//           console.error("Unexpected API response structure:", response.data);
//         }
//       } else {
//         console.error("API call was not successful:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating upvotes:", error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   if (loading) {
//     // return <div>Loading...</div>;
//     return (
//       <div className="flex justify-center items-center h-32">
//         <TailSpin height="50" width="50" color="#4A90E2" ariaLabel="loading" />
//       </div>
//     );
//   }
//   if (!user) {
//     return null;
//   }

//   const handleBookmark = async (e) => {
//     e.stopPropagation();
//     try {
//       const response = await axios.post(`${backend_url}/api/bookmark/add`, {
//         questionId: question._id,
//         userId: user._id
//       });

//       if (response.data.success) {
//         toast.success(response.data.message);
//         console.log("Bookmark added");
//       } else {
//         toast.error(response.data.message);
//         console.error("Error adding bookmark:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error adding bookmark:", error);
//     }
//   };

//   const handleCopyLink = (e) => {
//     e.stopPropagation();
//     const publicUrl = `${window.location.origin}/question/${question._id}`;
//     navigator.clipboard.writeText(publicUrl)
//       .then(() => {
//         toast.success("Link copied to clipboard!");
//       })
//       .catch((error) => {
//         toast.error("Failed to copy link.");
//         console.error("Error copying link:", error);
//       });
//   };

//   return (
//     <div className="bg-gray-100 xl:p-6 p-4 rounded-lg shadow-lg w-full md:w-1/2 my-4 place-items-center relative">
//       <button className="absolute top-2 right-2 text-gray-500">
//         <FiX size={20} />
//       </button>
//       <div className="cursor-pointer">
//         <div className="flex items-center mb-4">
//           <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
//             <span className="text-gray-500 text-lg">AS</span>
//           </div>
//           <div>
//             <h2 className="text-base font-semibold">
//               {User.firstName} {User.lastName}
//             </h2>
//             <div className="flex gap-x-2">
//               <p className="text-gray-600 text-xs">
//                 Second year BTECH CSE Student
//               </p>
//               <p className="text-gray-500 text-[11px] font-thin">
//                 {formatDate(question.createdAt)}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <h3 className="text-base font-medium mb-2 w-full">{question.body}</h3>

//           {question.files.map((file) => (
//             <img src={file} alt="image" key={file} className="mt-3 mb-3" />
//           ))}

//           <p className="text-gray-500 text-[11px] font-normal mb-1 ml-2" onClick={handleComponentClick}>
//             {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
//           </p>
//           <div className="flex flex-row items-center justify-between sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center mb-2 sm:mb-0">
//               <button
//                 onClick={handleAnswerClick}
//                 className="text-blue-600 mr-4 px-4 py-2 bg-blue-100 rounded-lg"
//               >
//                 Answer
//               </button>
//               <button
//                 className={`flex items-center text-green-600 px-4 py-2 bg-green-100 rounded-lg mr-4 ${isUpvote ? 'bg-green-600 text-white' : ''}`}
//                 onClick={handleUpvotes}
//               >
//                 <FiArrowUp className={`mr-1 ${isUpvote ? 'text-white' : ''}`} />{upvotes}
//               </button>
//             </div>
//             <div className="relative">
//               <button
//                 onClick={handleMoreClick}
//                 className="text-gray-500"
//               >
//                 <FiMoreHorizontal size={20} />
//               </button>
//               {showOptions && (
//                 <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
//                   <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleCopyLink}>
//                     <FiLink className="mr-2" /> Copy Link
//                   </button>
//                   <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleBookmark}>
//                     <FiBookmark className="mr-2" /> Bookmark
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {showAnswerPopup && <AnswerPopup setShowAnswerPopup={setShowAnswerPopup} question={question} />}
//     </div>
//   );
// };

// export default Hero;
