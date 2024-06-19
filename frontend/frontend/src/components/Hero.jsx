// src/components/Hero.js
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

const Hero = ({ stopOnClick, question }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const [upvotes,setUpvotes]=useState(question.upvotes || 0);
  const navigate = useNavigate();
  const { backend_url } = useContext(UserContext);
  const [user, setUser] = useState("");
  const [isUpvote, setIsUpvote] = useState(false);
  // useEffect(()=>{
  //   try{
  //   const getUserInfo = axios.get(`${backend_url}/api/user/userInfo`,userId);
  //   if(getUserInfo.data.success){
  //   setUser(getUserInfo.user);
  //   }
  // }
  // catch (error) {
  //   console.error('Error Finding User Info:', error);
  // }
  // },[])

  const userId = question.userId;
  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${backend_url}/api/user/otheruserInfo`,
          { userId }
        );
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error Finding User Info:", error);
      }
    };

    const fetchUpvoteStatus = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/question/upvoteStatus`, {
          questionId: question._id,
          userId: userId
        });
        if (response.data.success) {
          setIsUpvote(response.data.isUpvoted);
        }
      } catch (error) {
        console.error("Error checking upvote status:", error);
      }
    };

    fetchData();
    fetchUpvoteStatus();

  }, [backend_url, question._id, userId]);

  const handleMoreClick = () => {
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
    navigate("Answer",{state:{question}}); // Update this path to match your route
  };


// const handleUpvotes = async (e) => {
//   e.stopPropagation();
//   try {
//     // Make an API call to update the upvotes in the database
//     const response = await axios.post(`${backend_url}/api/question/upvote`, {
//       questionId: question._id,
//       userId: userId
//     });
//    console.log("Response:",response);
//     if (response.data.success) {
//       // If the database update is successful, fetch the updated question details
//       const updatedQuestionResponse = await axios.get(`${backend_url}/api/question/${question._id}`);
//       console.log("Question Updated",updatedQuestionResponse);
//       if (updatedQuestionResponse.data.success) {
//         // If the question details are successfully fetched, update the state with the new upvote count
       
//         setUpvotes(updatedQuestionResponse.data.question.upvotes);
//       }
//     }
//   } catch (error) {
//     console.error("Error updating upvotes:", error);
//   }
// };

const handleUpvotes = async (e) => {
  e.stopPropagation();
  setIsUpvote((prev)=>!prev);
  try {
    // Make an API call to update the upvotes in the database
    const response = await axios.post(`${backend_url}/api/question/upvote`, {
      questionId: question._id,
      userId: userId
    });

    console.log("Response:", response);

    if (response.data.success) {
      // Directly use the updated question object from the response
      const updatedQuestion = response.data.question;
      console.log("Updated Question:", updatedQuestion);

      if (updatedQuestion && typeof updatedQuestion.upvotes === 'number') {
        // If the question details are successfully fetched, update the state with the new upvote count
    
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

  // const formatDate = (dateString) => {
  //   const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  //   return new Date(dateString).toLocaleDateString("en-GB", options);
  // };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className=" bg-gray-100 xl:p-6 p-4 rounded-lg shadow-lg w-full md:w-1/2 my-4 place-items-center relative">
      <button className="absolute top-2 right-2 text-gray-500">
        <FiX size={20} />
      </button>
      <div className="cursor-pointer">
      {/* <div onClick={handleComponentClick} className="cursor-pointer"> */}
        <div className="flex items-center mb-4">
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
            <span className="text-gray-500 text-lg">AS</span>
          </div>
          <div>
            <h2 className="text-base font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex gap-x-2">
              <p className="text-gray-600 text-xs">
                Second year BTECH CSE Student
              </p>
              <p className="text-gray-500 text-[11px] font-thin">
                {formatDate(question.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium mb-2 w-full">{question.body}</h3>

          {question.files.map((file) => {
            return <img src={file} alt="image" key={file} className="mt-3 mb-3"/>;
          })}

          <p className="text-gray-500 text-[11px] font-normal mb-1 ml-2" onClick={handleComponentClick}>
            2 Answers
          </p>
          <div className="flex flex-row items-center justify-between sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <button
                onClick={handleAnswerClick}
                className="text-blue-600 mr-4 px-4 py-2 bg-blue-100 rounded-lg"
              >
                Answer
              </button>
              <button
                className={`flex items-center text-green-600 px-4 py-2 bg-green-100 rounded-lg mr-4  ${isUpvote ? 'bg-green-600 text-white' : ''}`}

                onClick={handleUpvotes} // Prevent navigation on Upvote button click
              >
                <FiArrowUp className={`mr-1 ${isUpvote?'text-white':''}`}  />{upvotes}
              </button>

            </div>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoreClick();
                }}
                className="text-gray-500"
              >
                <FiMoreHorizontal size={20} />
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <FiLink className="mr-2" /> Copy Link
                  </button>
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <FiBookmark className="mr-2" /> Bookmark
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAnswerPopup && <AnswerPopup onClose={closeAnswerPopup} question={question} />}
    </div>
  );
};

export default Hero;
