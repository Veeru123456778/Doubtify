// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import UserContext from '../context/userContext';
// import axios from 'axios';

// const CommentRepliesPage = () => {
//   const { commentId } = useParams();
//   const { backend_url, user, isDarkTheme } = useContext(UserContext);
//   const [comment, setComment] = useState(null);
//   const [replies, setReplies] = useState([]);
//   const [newReply, setNewReply] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCommentAndReplies = async () => {
//       try {
//         // Fetch the comment and its replies
//         const response = await axios.get(`${backend_url}/api/comments/replies/${commentId}`);
//         if (response.data.success) {
//           setComment(response.data.comment); // Set the specific comment
//           const sortedReplies = response.data.replies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           setReplies(sortedReplies); // Set the sorted replies
//         }
//       } catch (error) {
//         console.error("Error fetching comment and replies:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchCommentAndReplies();
//   }, [backend_url, commentId]);
  
//   const handleAddReply = async (e) => {
//     e.preventDefault();
//     if (!newReply.trim()) {
//       return;
//     }

//     try {
//       const response = await axios.post(`${backend_url}/api/comments/add`, {
//         answer_id: comment.answer_id,
//         user_id: user._id,
//         body: newReply,
//         question_id: comment.question_id,
//         parentCommentId: commentId,
//       });

//       if (response.data.success) {
//         const updatedReplies = [response.data.comment, ...replies];
//         setReplies(updatedReplies);
//         setNewReply("");
//       } else {
//         console.error("Error adding reply:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error adding reply:", error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6 flex flex-col w-full items-center">
//       <div
//         className={`p-3 ${isDarkTheme ? `bg-[#1f2530]` : 'bg-gray-100'} rounded-lg shadow-slate-700 shadow-sm flex flex-col gap-2`}
//       >
//         {comment && (
//           <>
//             <div className="flex justify-between items-center mt-2">
//               <div className="flex gap-2 items-center">
//                 <img
//                   src={comment.user_id.profile_picture}
//                   alt={`${comment.user_id.firstName} ${comment.user_id.lastName}`}
//                   className="h-6 w-6 text-gray-500 rounded-full border-1 bg-gray-300 align-middle"
//                 />
//                 <span className={`${isDarkTheme ? `text-gray-500` : 'text-black'}`}>
//                   {comment.user_id.firstName} {comment.user_id.lastName}
//                 </span>
//               </div>
//               <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
//             </div>
//             <p className={`text-sm ${isDarkTheme ? 'text-white' : 'text-gray-500'}`}>{comment.body}</p>
//           </>
//         )}
//       </div>

//       <form onSubmit={handleAddReply} className="mt-6 mb-4 w-1/2">
//         <textarea
//           className="w-full p-2 border rounded-lg"
//           placeholder="Add a reply..."
//           value={newReply}
//           onChange={(e) => setNewReply(e.target.value)}
//         ></textarea>
//         <button
//           type="submit"
//           className="mt-2 px-2 py-1 bg-blue-600 text-white rounded-lg"
//         >
//           Add Reply
//         </button>
//       </form>

//       <h2 className={`${isDarkTheme ? `text-white` : 'text-black'} text-xl font-semibold mb-4`}>
//         Replies
//       </h2>
//       <div className="space-y-4">
//         {replies.map((reply) => (
//           <div
//             key={reply._id}
//             className={`p-3 ${isDarkTheme ? `bg-[#1f2530]` : 'bg-gray-100'} rounded-lg shadow-slate-700 shadow-sm flex flex-col gap-2`}
//           >
//             <div className="flex justify-between items-center mt-2">
//               <div className="flex gap-2 items-center">
//                 <img
//                   src={reply.user_id.profile_picture}
//                   alt={`${reply.user_id.firstName} ${reply.user_id.lastName}`}
//                   className="h-6 w-6 text-gray-500 rounded-full border-1 bg-gray-300 align-middle"
//                 />
//                 <span className={`${isDarkTheme ? `text-gray-500` : 'text-black'}`}>
//                   {reply.user_id.firstName} {reply.user_id.lastName}
//                 </span>
//               </div>
//               <span className="text-sm text-gray-500">{formatDate(reply.createdAt)}</span>
//             </div>
//             <p className={`text-sm ${isDarkTheme ? 'text-white' : 'text-gray-500'}`}>{reply.body}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentRepliesPage;
