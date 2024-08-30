import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { FiX, FiMoreHorizontal, FiLink, FiBookmark, FiArrowUp, FiArrowDown,FiMessageSquare } from 'react-icons/fi';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { RiMessageFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa";



const AnswerCard = ({ answer, question }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [Users, setUsers] = useState("");
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownvote] = useState(false);
  const [upvotes, setUpvotes] = useState(answer.upvotes || 0);
  const [downVotes, setDownvotes] = useState(answer.downVotes || 0);
  const [comments, setComments] = useState([]);
  const [isCommentClick, setIsCommentClick] = useState(false);
  const [newComment, setNewComment] = useState("");

  const navigate = useNavigate();
  
  const { backend_url, user, token, setUser, isDarkTheme } = useContext(UserContext);
  
  const loading = useFetchUser(token, setUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/user/otheruserInfo`, { user_Id: answer.userId });
        if (response.data.success) {
          setUsers(response.data.user);
        }
      } catch (error) {
        console.error("Error Finding User Info:", error);
      }
    };

    const fetchVoteStatus = async () => {
      try {
        const response = await axios.post(`${backend_url}/api/answer/voteStatus`, {
          answerId: answer._id,
          userId: user?._id
        });
        if (response.data.success) {
          setIsUpvote(response.data.isUpvoted);
          setIsDownvote(response.data.isDownvoted);
        }
      } catch (error) {
        console.error("Error checking vote status:", error);
      }
    };

    
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/comments/${answer._id}`);
        if (response.data.success) {
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (user) {
      fetchData();
      fetchVoteStatus();
      fetchComments();
    }

  }, [backend_url, user, answer._id, answer.userId]);

  if (loading) {
    return <div></div>;
  }

  const handleUpvotes = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${backend_url}/api/answer/upvote`, {
        answerId: answer._id,
        userId: user._id
      });

      if (response.data.success) {
        const updatedAnswer = response.data.answer;
        if (updatedAnswer && typeof updatedAnswer.upvotes === 'number') {
          setUpvotes(updatedAnswer.upvotes);
          setIsUpvote(!isUpvote);
          if (isDownvote) {
            setDownvotes(updatedAnswer.downVotes);
            setIsDownvote(false);
          }
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

  const handleDownvotes = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${backend_url}/api/answer/downvote`, {
        answerId: answer._id,
        userId: user._id
      });

      if (response.data.success) {
        const updatedAnswer = response.data.answer;
        if (updatedAnswer && typeof updatedAnswer.downVotes === 'number') {
          setDownvotes(updatedAnswer.downVotes);
          setIsDownvote(!isDownvote);
          if (isUpvote) {
            setUpvotes(updatedAnswer.upvotes);
            setIsUpvote(false);
          }
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } else {
        console.error("API call was not successful:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating downvotes:", error);
    }
  };

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${backend_url}/api/bookmark/add`, {
        answerId: answer._id,
        questionId: question._id,
        userId: user._id
      });

      if (response.data.success) {
        console.log("Bookmark added");
      } else {
        console.error("Error adding bookmark:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const handleRemoveBookmark = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${backend_url}/api/bookmarks/remove`, {
        answerId: answer._id,
        questionId: question._id,
        userId: user._id
      });

      if (response.data.success) {
        console.log("Bookmark removed");
      } else {
        console.error("Error removing bookmark:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/question/${question._id}/answer/${answer._id}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying link:", err);
        toast.error("Error copying link");
      });
  };

  const handleComments = () => {
    navigate(`/question/${question._id}/answer/${answer._id}/comments`,{state:{question,answer}});
  };

  
  return (
    <div className={`xl:p-6 p-4 rounded-lg shadow-slate-600 shadow-sm md:w-1/2 w-full my-4 place-items-center relative ${isDarkTheme ? 'bg-[#1f2530]' : 'bg-gray-100'}`}>
     
      <div className="flex items-center mb-4">
        <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
          <span className="text-gray-500 text-lg">AS</span>
        </div>
        <div>
          <h2 className={`text-base font-semibold ${isDarkTheme?'text-white':'text-black'}`}>{Users.firstName} {Users.lastName}</h2>
          <div className='flex gap-x-2'>
            <p className={isDarkTheme?"text-gray-400 text-xs":"text-gray-600 text-xs"}>Second year BTECH CSE Student</p>
            <p className="text-gray-500 text-[11px] font-thin">{formatDate(answer.createdAt)}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className={`text-base font-extralight mb-2 ${isDarkTheme?'text-white':'text-black'}`}>{answer.body}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className={`flex items-center text-green-600 px-4 py-1 bg-green-100 rounded-lg mr-4 ${isUpvote ? 'bg-green-600 text-white' : ''}`}
              onClick={handleUpvotes}
            >
              <TbArrowBigUpFilled className={`mr-1 ${isUpvote ? 'text-white' : ''}`} />{upvotes}
              </button>
            <button
              className={`flex items-center text-red-600 px-4 py-1 bg-red-100 rounded-lg mr-4 ${isDownvote ? 'bg-red-600 text-white' : ''}`}
              onClick={handleDownvotes}
            >
              <TbArrowBigDownFilled className={`mr-1 ${isDownvote ? 'text-white' : ''}`} />{downVotes}
              </button>

            <button className="flex items-center text-blue-600 px-4 py-1 bg-blue-100 rounded-lg mr-4" onClick={handleComments}>
            <RiMessageFill  className="mr-1" />{comments.length}
            </button>
          </div>

          <div className="relative">
            <button onClick={handleMoreClick} className="text-gray-500">
              <FiMoreHorizontal size={20} />
            </button>
            {showOptions && (
              <div className={`absolute right-0 mt-2  rounded shadow-lg z-10 ${isDarkTheme ?'bg-[#323B4A] border-[#404b5a] text-[#E0E0E0]':'bg-white border border-gray-300'}`}>
                <button className={`flex items-center px-4 py-2   ${isDarkTheme ?'hover:bg-[#2C3545]':'hover:bg-gray-100'}`} onClick={handleCopyLink}>
                  <FiLink className="mr-2" /> Copy Link
                </button>
                <button className={`flex items-center px-4 py-2   ${isDarkTheme ?'hover:bg-[#2C3545]':'hover:bg-gray-100'}`} onClick={handleBookmark}>
                  <FiBookmark className="mr-2" /> Bookmark
                </button>
                <button className={`flex items-center px-4 py-2   ${isDarkTheme ?'hover:bg-[#2C3545]':'hover:bg-gray-100'}`} onClick={handleRemoveBookmark}>
                  <FiBookmark className="mr-2" /> Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;


