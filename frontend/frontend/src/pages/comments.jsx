import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../context/userContext';
import axios from 'axios';
import AnswerCard from '../components/AnswerCard.jsx';
import Hero from '../components/Hero.jsx';

const CommentsPage = () => {
  const location = useLocation();
  const { question, answer } = location.state;
  const { backend_url, user, token, setUser,isDarkTheme } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/comments/${answer._id}`);
        if (response.data.success) {
          // Sort comments by createdAt in descending order
          const sortedComments = response.data.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setComments(sortedComments);
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
        answer_id: answer._id,
        user_id: user._id,
        body: newComment,
        question_id: question._id,
      });

      if (response.data.success) {
        // Add new comment to the beginning of comments array
        const updatedComments = [response.data.comment, ...comments];
        setComments(updatedComments);
        setNewComment("");
      } else {
        console.error("Error adding comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-6 flex flex-col w-full items-center">
      <Hero stopOnClick={true} question={question} />
      <AnswerCard answer={answer} question={question} showFullAnswer={true} showComments={true} comments={comments} />
      
      <div className="mt-6 w-1/2">
        <form onSubmit={handleAddComment} className="mb-4">
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

        <h2 className={`${isDarkTheme ? `text-white` : 'text-black'} text-xl font-semibold mb-4`}>Comments</h2>
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className={`p-3  ${isDarkTheme ? `bg-[#1f2530]` : 'bg-gray-100'} rounded-lg shadow-slate-700 shadow-sm flex flex-col gap-2`}>
              <div className="flex justify-between items-center mt-2">
              <div className='flex gap-2 items-center'>
            <img src={comment.user_id.profile_picture} alt={comment.user_id.firstName+comment.user_id.lastName} className='h-6 w-6 text-gray-500 rounded-full border-1 bg-gray-300 align-middle'/>
                  <span className={`${isDarkTheme ? `text-gray-500` : 'text-black'}`}>{comment.user_id.firstName} {comment.user_id.lastName}</span>
              </div>
                  <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                </div>

                <p className={`text-sm ${isDarkTheme ?'text-white':'text-gray-500'}`} >{comment.body}</p>
              
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
