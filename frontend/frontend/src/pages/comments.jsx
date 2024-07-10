// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import UserContext from '../context/userContext';
// import axios from 'axios';
// import { FiArrowUp, FiArrowDown, FiBookmark, FiLink } from 'react-icons/fi';
// import { toast } from 'react-toastify';

// const CommentsPage = () => {
//   const { questionId, answerId } = useParams();
//   const { backend_url, user, token, setUser } = useContext(UserContext);
//   const [question, setQuestion] = useState(null);
//   const [answer, setAnswer] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestionAndAnswer = async () => {
//       try {
//         const questionResponse = await axios.get(`${backend_url}/api/question/${questionId}`);
//         if (questionResponse.data.success) {
//           setQuestion(questionResponse.data.question);
//         }

//         const answerResponse = await axios.get(`${backend_url}/api/answer/${answerId}`);
//         if (answerResponse.data.success) {
//           setAnswer(answerResponse.data.answer);
//         }

//         const commentsResponse = await axios.get(`${backend_url}/api/comments/${answerId}`);
//         if (commentsResponse.data.success) {
//           setComments(commentsResponse.data.comments);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchQuestionAndAnswer();
//   }, [backend_url, questionId, answerId]);

//   const handleAddComment = async () => {
//     if (newComment.trim() === "") return;

//     try {
//       const response = await axios.post(`${backend_url}/api/comments/add`, {
//         answerId,
//         userId: user._id,
//         body: newComment,
//       });

//       if (response.data.success) {
//         setComments([...comments, response.data.comment]);
//         setNewComment("");
//         toast.success("Comment added!");
//       } else {
//         toast.error("Error adding comment");
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-300 rounded">Back</button>
//       {question && (
//         <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
//           <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
//           <p className="text-gray-700">{question.body}</p>
//         </div>
//       )}
//       {answer && (
//         <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">{answer.body}</h3>
//               <p className="text-gray-600 text-sm">{formatDate(answer.createdAt)}</p>
//             </div>
//             <div className="flex items-center">
//               <button className="flex items-center text-green-600 px-4 py-2 bg-green-100 rounded-lg mr-4">
//                 <FiArrowUp className="mr-1" /> {answer.upvotes}
//               </button>
//               <button className="flex items-center text-red-600 px-4 py-2 bg-red-100 rounded-lg mr-4">
//                 <FiArrowDown className="mr-1" /> {answer.downVotes}
//               </button>
//               <button className="flex items-center text-blue-600 px-4 py-2 bg-blue-100 rounded-lg mr-4">
//                 <FiBookmark className="mr-1" /> Bookmark
//               </button>
//               <button className="flex items-center text-gray-600 px-4 py-2 bg-gray-100 rounded-lg" onClick={() => {
//                 const link = `${window.location.origin}/question/${question._id}/answer/${answer._id}`;
//                 navigator.clipboard.writeText(link)
//                   .then(() => toast.success("Link copied to clipboard!"))
//                   .catch((err) => toast.error("Error copying link"));
//               }}>
//                 <FiLink className="mr-1" /> Copy Link
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
//         <h4 className="text-lg font-semibold mb-2">Comments</h4>
//         <div className="mb-4">
//           <textarea
//             className="w-full p-2 border rounded mb-2"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment"
//           ></textarea>
//           <button onClick={handleAddComment} className="px-4 py-2 bg-blue-500 text-white rounded">Comment</button>
//         </div>
//         {comments.map((comment) => (
//           <div key={comment._id} className="mb-2 p-2 border-b border-gray-300">
//             <p className="text-gray-700">{comment.body}</p>
//             <p className="text-gray-500 text-sm">{formatDate(comment.createdAt)}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentsPage;

import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../context/userContext';
import axios from 'axios';
import AnswerCard from '../components/AnswerCard';
import Hero from '../components/Hero';

const CommentsPage = () => {
  const location = useLocation();
  const { question, answer } = location.state;
  const { backend_url, user, token, setUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/comments/${answer._id}`);
        if (response.data.success) {
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [backend_url, answer._id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }

    try {
      const response = await axios.post(`${backend_url}/api/comments/add`, {
        answerId: answer._id,
        userId: user._id,
        text: newComment,
      });

      if (response.data.success) {
        setComments([...comments, response.data.comment]);
        setNewComment("");
      } else {
        console.error("Error adding comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col w-full items-center">
      <Hero stopOnClick={true} question={question} />
      <AnswerCard answer={answer} question={question} showFullAnswer={true} showComments={true} comments={comments} />
      
      <div className="mt-6 w-1/2">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <p>{comment.text}</p>
                <span className="text-sm text-gray-500">{comment.userName}</span>
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleAddComment} className="mt-6 w-full">
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-2 py-1 bg-blue-600 text-white rounded-lg"
          >
            Add Comment
          </button>
        </form>

      </div>
    </div>
  );
};

export default CommentsPage;

