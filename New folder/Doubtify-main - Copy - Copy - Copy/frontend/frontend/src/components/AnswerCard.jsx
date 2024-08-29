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
      {/* <button className="absolute top-2 right-2 text-gray-500">
        <FiX size={20} />
      </button> */}
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
              className={`flex items-center text-green-600 px-4 py-2 bg-green-100 rounded-lg mr-4 ${isUpvote ? 'bg-green-600 text-white' : ''}`}
              onClick={handleUpvotes}
            >
              {/* <FiArrowUp className={`mr-1 ${isUpvote ? 'text-white' : ''}`} /> {upvotes} */}
              <TbArrowBigUpFilled className={`mr-1 ${isUpvote ? 'text-white' : ''}`} />{upvotes}

            </button>
            <button
              className={`flex items-center text-red-600 px-4 py-2 bg-red-100 rounded-lg mr-4 ${isDownvote ? 'bg-red-600 text-white' : ''}`}
              onClick={handleDownvotes}
            >
              {/* <FiArrowDown className={`mr-1 ${isDownvote ? 'text-white' : ''}`} /> {downVotes} */}
              <TbArrowBigDownFilled className={`mr-1 ${isDownvote ? 'text-white' : ''}`} />{downVotes}

            </button>

            <button className="flex items-center text-blue-600 px-4 py-2 bg-blue-100 rounded-lg mr-4" onClick={handleComments}>
               {/* <FiMessageSquare className="mr-1" /> {comments.length} */}
               <RiMessageFill  className="mr-1" />{comments.length}

              </button>
          </div>

          <div className="relative">
            <button onClick={handleMoreClick} className="text-gray-500">
              <FiMoreHorizontal size={20} />
            </button>
            {showOptions && (
              <div className={`absolute right-0 mt-2  border rounded shadow-lg z-10 ${isDarkTheme ?'text-[#E0E0E0] border-[#404b5a] bg-[#323B4A]':' border-gray-300 bg-white'}`}>
                <button className={`flex items-center px-4 py-2   ${isDarkTheme ?'hover:bg-[#2C3545]':'hover:bg-gray-100'}`} onClick={handleCopyLink}>
                  <FiLink className="mr-2" /> Copy Link
                </button>
                <button className={`flex items-center px-4 py-2   ${isDarkTheme ?'hover:bg-[#2C3545]':'hover:bg-gray-100'}`} onClick={handleBookmark}>
                  <FaBookmark className="mr-2" /> Bookmark
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



// import React, { useState, useEffect, useContext } from 'react';
// import { FiX, FiMoreHorizontal, FiLink, FiBookmark, FiArrowUp, FiArrowDown, FiMessageSquare } from 'react-icons/fi';
// import UserContext from '../context/userContext';
// import useFetchUser from '../hooks/useFetchUser';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AnswerCard = ({ answer, question }) => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [Users, setUsers] = useState("");
//   const { backend_url, user, token, setUser } = useContext(UserContext);
//   const [isUpvote, setIsUpvote] = useState(false);
//   const [isDownvote, setIsDownvote] = useState(false);
//   const [upvotes, setUpvotes] = useState(answer.upvotes || 0);
//   const [downVotes, setDownvotes] = useState(answer.downVotes || 0);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [isCommentClick, setIsCommentClick] = useState(false);

//   const loading = useFetchUser(token, setUser);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(`${backend_url}/api/user/otheruserInfo`, { user_Id: answer.userId });
//         if (response.data.success) {
//           setUsers(response.data.user);
//         }
//       } catch (error) {
//         console.error("Error Finding User Info:", error);
//       }
//     };

//     const fetchVoteStatus = async () => {
//       try {
//         const response = await axios.post(`${backend_url}/api/answer/voteStatus`, {
//           answerId: answer._id,
//           userId: user?._id
//         });
//         if (response.data.success) {
//           setIsUpvote(response.data.isUpvoted);
//           setIsDownvote(response.data.isDownvoted);
//         }
//       } catch (error) {
//         console.error("Error checking vote status:", error);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`${backend_url}/api/comments/${answer._id}`);
//         if (response.data.success) {
//           setComments(response.data.comments);
//         }
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };

//     if (user) {
//       fetchData();
//       fetchVoteStatus();
//       fetchComments();
//     }

//   }, [backend_url, user, answer._id, answer.userId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const handleUpvotes = async (e) => {
//     e.stopPropagation();
//     try {
//       const response = await axios.post(`${backend_url}/api/answer/upvote`, {
//         answerId: answer._id,
//         userId: user._id
//       });

//       if (response.data.success) {
//         const updatedAnswer = response.data.answer;
//         if (updatedAnswer && typeof updatedAnswer.upvotes === 'number') {
//           setUpvotes(updatedAnswer.upvotes);
//           setIsUpvote(!isUpvote);
//           if (isDownvote) {
//             setDownvotes(updatedAnswer.downVotes);
//             setIsDownvote(false);
//           }
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

//   const handleDownvotes = async (e) => {
//     e.stopPropagation();
//     try {
//       const response = await axios.post(`${backend_url}/api/answer/downvote`, {
//         answerId: answer._id,
//         userId: user._id
//       });

//       if (response.data.success) {
//         const updatedAnswer = response.data.answer;
//         if (updatedAnswer && typeof updatedAnswer.downVotes === 'number') {
//           setDownvotes(updatedAnswer.downVotes);
//           setIsDownvote(!isDownvote);
//           if (isUpvote) {
//             setUpvotes(updatedAnswer.upvotes);
//             setIsUpvote(false);
//           }
//         } else {
//           console.error("Unexpected API response structure:", response.data);
//         }
//       } else {
//         console.error("API call was not successful:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating downvotes:", error);
//     }
//   };

//   const handleMoreClick = () => {
//     setShowOptions(!showOptions);
//   };

//   const handleBookmark = async (e) => {
//     e.stopPropagation();
//     try {
//       const response = await axios.post(`${backend_url}/api/bookmark/add`, {
//         answerId: answer._id,
//         questionId: question._id,
//         userId: user._id
//       });

//       if (response.data.success) {
//         console.log("Bookmark added");
//       } else {
//         console.error("Error adding bookmark:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error adding bookmark:", error);
//     }
//   };

//   const handleRemoveBookmark = async (e) => {
//     e.stopPropagation();
//     try {
//       const response = await axios.post(`${backend_url}/api/bookmarks/remove`, {
//         answerId: answer._id,
//         questionId: question._id,
//         userId: user._id
//       });

//       if (response.data.success) {
//         console.log("Bookmark removed");
//       } else {
//         console.error("Error removing bookmark:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error removing bookmark:", error);
//     }
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${backend_url}/api/comments/add`, {
//         answerId: answer._id,
//         userId: user._id,
//         body: newComment
//       });

//       if (response.data.success) {
//         setComments([...comments, response.data.comment]);
//         setNewComment("");
//         toast.success("Comment added!");
//       } else {
//         console.error("Error adding comment:", response.data.message);
//         toast.error("Error adding comment");
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       toast.error("Error adding comment");
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const handleCopyLink = () => {
//     const link = `${window.location.origin}/question/${question._id}/answer/${answer._id}`;
//     navigator.clipboard.writeText(link)
//       .then(() => {
//         toast.success("Link copied to clipboard!");
//       })
//       .catch((err) => {
//         console.error("Error copying link:", err);
//         toast.error("Error copying link");
//       });
//   };

//   return (
//     <div className="bg-gray-100 xl:p-6 p-4 rounded-lg shadow-lg md:w-1/2 w-full my-4 place-items-center relative">
//       <button className="absolute top-2 right-2 text-gray-500">
//         <FiX size={20} />
//       </button>
//       <div className="flex items-center mb-4">
//         <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
//           <span className="text-gray-500 text-lg">AS</span>
//         </div>
//         <div>
//           <h2 className="text-base font-semibold">{Users.firstName} {Users.lastName}</h2>
//           <div className='flex gap-x-2'> 
//             <p className="text-gray-600 text-xs">Second year BTECH CSE Student</p>
//             <p className="text-gray-500 text-[11px] font-thin">{formatDate(answer.createdAt)}</p>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h3 className="text-base font-extralight mb-2">{answer.body}</h3>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <button
//               className={`flex items-center text-green-600 px-4 py-2 bg-green-100 rounded-lg mr-4 ${isUpvote ? 'bg-green-600 text-white' : ''}`}
//               onClick={handleUpvotes}
//             >
//               <FiArrowUp className={`mr-1 ${isUpvote ? 'text-white' : ''}`} /> {upvotes}
//             </button>
//             <button
//               className={`flex items-center text-red-600 px-4 py-2 bg-red-100 rounded-lg mr-4 ${isDownvote ? 'bg-red-600 text-white' : ''}`}
//               onClick={handleDownvotes}>
//                <FiArrowDown className={`mr-1 ${isDownvote ? 'text-white' : ''}`} /> {downVotes}
//             </button>
//             <button className="flex items-center text-blue-600 px-4 py-2 bg-blue-100 rounded-lg mr-4" onClick={()=>{setIsCommentClick((prevValue)=>!prevValue)}}>
//               <FiMessageSquare className="mr-1" /> {comments.length}
//             </button>
//           </div>
//           <div className="flex items-center">
//             <button
//               className="flex items-center text-gray-600 px-4 py-2 bg-gray-100 rounded-lg mr-4"
//               onClick={handleCopyLink}
//             >
//               <FiLink className="mr-1" /> Copy Link
//             </button>
//             <button className="flex items-center text-gray-600 px-4 py-2 bg-gray-100 rounded-lg mr-4" onClick={handleMoreClick}>
//               <FiMoreHorizontal className="mr-1" />
//             </button>
//             {showOptions && (
//               <div className="absolute top-0 right-0 mt-8 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
//                 <button
//                   className="flex items-center text-gray-600 px-4 py-2 bg-gray-100 rounded-lg mb-2"
//                   onClick={handleBookmark}
//                 >
//                   <FiBookmark className="mr-1" /> Bookmark
//                 </button>
//                 <button
//                   className="flex items-center text-gray-600 px-4 py-2 bg-gray-100 rounded-lg"
//                   onClick={handleRemoveBookmark}
//                 >
//                   <FiBookmark className="mr-1" /> Remove Bookmark
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         {isCommentClick && <form onSubmit={handleAddComment} className="mt-4">
//            <textarea
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             rows="2"
//             placeholder="Add a comment..."
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           ></textarea>
//           <button
//             type="submit"
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
//           >
//             Comment
//           </button> 
//         </form>}
//         <div className="mt-4">
//           {comments.map((comment) => (
//             <div key={comment._id} className="bg-gray-200 p-2 rounded-lg mb-2">
//               <p className="text-sm">{comment.body}</p>
//               <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnswerCard;

