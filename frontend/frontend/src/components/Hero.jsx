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
import { TbArrowBigUpFilled } from "react-icons/tb";


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

  useEffect(()=>{
    if(question.files && question.files.length>0){
    const link = document.createElement('link');
    link.rel = 'preload'
    link.as = "image";
    link.href = question.files[0];
    document.head.appendChild(link);
  }
  },[question.files])

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


  const handleComponentClick = (e) => {
    if (stopOnClick) {
      return;
    }
    e.stopPropagation();
    navigate("Answer", { state: { question } });
  };


  const handleUpvotes = async (e) => {
    e.stopPropagation();
  
    // Optimistically toggle the upvote state and update the upvotes count
    setIsUpvote((prev) => !prev);
    setUpvotes((prev) => (isUpvote ? prev - 1 : prev + 1));
  
    try {
      const response = await axios.post(`${backend_url}/api/question/upvote`, {
        questionId: question._id,
        userId: user._id
      });
  
      if (response.data.success) {
        const updatedQuestion = response.data.question;
        if (updatedQuestion && typeof updatedQuestion.upvotes === 'number') {
          // Update the upvotes count based on the server response
          setUpvotes(updatedQuestion.upvotes);
        }
        // Set the upvote state based on the server response
        setIsUpvote(response.data.message === 'Upvote added');
      } else {
        console.error("API call was not successful:", response.data.message);
        // Revert optimistic update if the API call fails
        setIsUpvote((prev) => !prev);
        setUpvotes((prev) => (isUpvote ? prev + 1 : prev - 1));
      }
    } catch (error) {
      console.error("Error updating upvotes:", error);
      // Revert optimistic update in 
    }
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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

  const transformUrl = (url) => {
    // Apply transformations: resize to 800x600, auto format and quality
    return `${url.replace('/upload/', '/upload/f_auto,q_auto/')}`;
  };

  return (
    <div className={`xl:p-6 p-4 rounded-lg  shadow-slate-600 shadow-sm w-full md:w-1/2 my-4 place-items-center relative ${isDarkTheme ? `bg-[#1f2530]` : 'bg-gray-100'}`}>
      
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
                <img src={transformUrl(file)} alt={`image-${index}`} className="h-80 w-full overflow-hidden mt-3 mb-3" />
              </div>
            ))}
          </Slider>}

          {question.files.length===1 && question.files.map((file, index) => (
              <div key={index}>
                <img src={transformUrl(file)} alt={`image-${index}`} className="mt-3 mb-3" />
              </div>
            ))}

          <p className={`${isDarkTheme ? 'text-gray-200':'text-gray-500'} text-[11px] font-normal mb-1 ml-2 relative z-10`} onClick={handleComponentClick}>
            {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
          </p>
          <div className="flex flex-row items-center justify-between sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <button
                onClick={handleAnswerClick}
                className="text-blue-600 mr-2 px-4 py-1 bg-blue-100 rounded-lg"
              >
                {load?
      <TailSpin color="#00BFFF" height={23} width={23} className="mr-2 px-4 py-1" />
   :<p>Answer</p>}

                
              </button>
              <button
                className={`flex items-center text-green-600 px-4 py-1 bg-green-100 rounded-lg mr-2 ${isUpvote ? 'bg-green-600 text-white' : ''}`}
                onClick={handleUpvotes}
              >
                                <TbArrowBigUpFilled  className={`mr-1 ${isUpvote ? 'text-white' : ''}`}/>{upvotes}

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
                <div  className={`absolute right-0 mt-2  rounded shadow-lg z-10 ${isDarkTheme ?'text-[#E0E0E0] border-[#404b5a] bg-[#323B4A]':'bg-white border border-gray-300'}`}>
                  <button className={`flex items-center px-4 py-2   ${isDarkTheme ?'hover:bg-[#2C3545]':'hover:bg-gray-100'}`} onClick={handleCopyLink}>
                    <FiLink className="mr-2" /> Copy Link
                  </button>
                  <button className={`flex items-center px-4 py-2   ${isDarkTheme ?'hover:bg-[#2C3545]':'hover:bg-gray-100'}`} onClick={handleBookmark}>
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

