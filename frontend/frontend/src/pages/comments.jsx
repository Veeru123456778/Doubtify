import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import axios from "axios";
import AnswerCard from "../components/AnswerCard";
import Hero from "../components/Hero";
import { FaReply } from "react-icons/fa6";


const CommentsPage = () => {
  const location = useLocation();
  const { question, answer } = location.state;
  const { backend_url, user, isDarkTheme } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [replyComments, setReplyComments] = useState({});
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [isReplyingToReplying, setIsReplyingToReplying] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleReplyToReply = (ReplyToWhomId, firstName) => {
    if (activeReplyId === ReplyToWhomId) {
      setActiveReplyId(null); // Close if the same reply is clicked again
      setReplyText('');
      setNewComment('');
    } else {
      setActiveReplyId(ReplyToWhomId);
      setReplyText('');
      setReplyText(`@${firstName} `); // Prefill the reply with the username
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/comments/${answer._id}`
        );
        if (response.data.success) {
          const sortedComments = response.data.comments;

          // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setComments(sortedComments);

          // Organize replies under their respective parent comments
          const organizedReplies = {};
          sortedComments.forEach((comment) => {
            if (comment.parentCommentId) {
              if (!organizedReplies[comment.parentCommentId]) {
                organizedReplies[comment.parentCommentId] = [];
              }
              organizedReplies[comment.parentCommentId].push(comment);
            }
          });
          setReplyComments(organizedReplies);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [backend_url, answer._id, comments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`${backend_url}/api/comments/add`, {
        answer_id: answer._id,
        user_id: user._id,
        body: newComment,
        question_id: question._id,
        parentCommentId: null,
      });

      if (response.data.success) {
        setComments([response.data.comment, ...comments]);
        setNewComment("");
      } else {
        console.error("Error adding comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddReply = async (e, parentCommentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    try {
      const response = await axios.post(`${backend_url}/api/comments/add`, {
        answer_id: answer._id,
        user_id: user._id,
        body: replyText,
        question_id: question._id,
        parentCommentId,
      });

      if (response.data.success) {
        setReplyComments({
          ...replyComments,
          [parentCommentId]: [
            response.data.comment,
            ...(replyComments[parentCommentId] || []),
          ],
        });
        setReplyText("");
        setActiveReplyId(null);
        setIsReplyingToReplying(false);
        // setReplyingToCommentId(null);
      } else {
        console.error("Error adding reply:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    } 
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Simplified date formatting
  };

  const handleShowReply = (id) => {
    setReplyText('');
    setActiveReplyId(null);
    if (replyingToCommentId === id) {
      setShowReplies((prev) => !prev);
    } else {
      setReplyingToCommentId(id);
      setShowReplies(true);
    }
  };

  const renderComment = (comment) => {
    const replies = replyComments[comment._id] || [];

    return (
      <div
        key={comment._id}
        className={`p-3 ${
          isDarkTheme ? `bg-[#1f2530]` : "bg-gray-100"
        } rounded-lg shadow-slate-700 shadow-sm flex flex-col gap-2`}
      >
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2 items-center">
            <img
              src={comment.user_id.profile_picture}
              alt={`${comment.user_id.firstName} ${comment.user_id.lastName}`}
              className="h-6 w-6 text-gray-500 rounded-full border-1 bg-gray-300 align-middle"
            />

            <span className={`${isDarkTheme ? `text-gray-500` : "text-black"}`}>
              {comment.user_id.firstName} {comment.user_id.lastName}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <div className="flex align-middle items-center justify-between">
          <p
            className={`text-sm ${
              isDarkTheme ? "text-white" : "text-gray-500"
            }`}
          >
            {comment.body}
          </p>

          <button
            type="button"
            className="mt-2 px-1 py-0 bg-blue-600 text-white rounded-lg"
            onClick={() => handleShowReply(comment._id)}
          >
            {/* {replyingToCommentId === comment._id ? 'Cancel Reply' : 'Reply'} */}
            {showReplies && replyingToCommentId === comment._id ? (
              <p>cancel</p>
            ) : (
              <p>Reply</p>
            )}
          </button>
        </div>
        {comment.user_id._id!==user._id && replyingToCommentId === comment._id && showReplies && (
          <div className="mt-2">
            {!isReplyingToReplying && !activeReplyId && (
              <form onSubmit={(e) => handleAddReply(e, comment._id)}>
                <textarea
className={`w-full p-2 border rounded-lg ${isDarkTheme ?'border-[#404b5a] bg-[#323B4A] placeholder-[#E0E0E0] text-[#E0E0E0]':''}`}                  placeholder="Add a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  type="submit"
                  className={`"mt-2 px-2 py-0 bg-blue-600 text-white rounded-lg"`}
                >
                 Reply
                </button>
              </form>
            )}
          </div>
        )}
        {showReplies &&
          replyingToCommentId === comment._id &&
          replies.length > 0 && (
            <div className="ml-6 mt-2">
              {replies.map((childComment) => (
                <div
                  key={childComment._id}
                  className={`p-2  rounded-lg mb-2 ${isDarkTheme ?'border-[#404b5a] bg-[#323B4A] placeholder-[#E0E0E0] text-[#E0E0E0]':'bg-gray-200'}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <img
                        src={childComment.user_id.profile_picture}
                        alt={`${childComment.user_id.firstName} ${childComment.user_id.lastName}`}
                        className="h-4 w-4 text-gray-500 rounded-full border-1 bg-gray-300 align-middle"
                      />

                      <span className={` ${isDarkTheme ?'text-gray-200':'text-gray-500'}`}>
                        {childComment.user_id.firstName}{" "}
                        {childComment.user_id.lastName}
                      </span>
                    </div>
                    <span className={`text-xs  ${isDarkTheme ?'text-gray-100':'text-gray-400'}`}>
                      {formatDate(childComment.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <p className={`text-xs  ${isDarkTheme ?'text-gray-200':'text-gray-700'}`}>{childComment.body}</p>

                    {/* {childComment.user_id===user._id ?'': <button onClick={()=>handleReplyToReply(childComment._id,childComment.user_id)}>Reply child</button>} */}
                    {childComment.user_id._id !== user._id && (
                      <button
                      className={`"mt-2 px-1 py-0 bg-blue-600 text-white rounded-lg"`}

                        onClick={() =>
                          handleReplyToReply(
                            childComment._id,
                            childComment.user_id.firstName
                          )
                        }
                      >
                        Reply
                      </button>
                      
                    )}
                  </div>

                  {/* replytoReply[childComment._id] && */}
                  {activeReplyId == childComment._id && (
                    <form onSubmit={(e) => handleAddReply(e, comment._id)}>
                      <textarea
                        className={`w-full p-2 border rounded-lg ${isDarkTheme ?'border-[#404b5a] bg-[#323B4A] placeholder-[#E0E0E0] text-[#E0E0E0]':''}`}
                        placeholder="Add a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="mt-2 px-2 py-1 bg-blue-600 text-white rounded-lg"
                      >
                      {/* add reply */}
                        Reply
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>
    );
  };

  return (
    <div className="p-6 flex flex-col w-full items-center">
      <Hero stopOnClick={true} question={question} />
      <AnswerCard
        answer={answer}
        question={question}
        showFullAnswer={true}
        showComments={true}
        comments={comments}
      />

      <div className="mt-6 w-1/2">
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            className={`w-full p-2 border rounded-lg ${isDarkTheme ? ' border-[#404b5a] bg-[#323B4A] placeholder-[#E0E0E0] text-[#E0E0E0]':''} `}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 px-2 py-1 bg-blue-600 text-white rounded-lg"
          >
           Comment
          </button>
        </form>

        <h2
          className={`${
            isDarkTheme ? `text-white` : "text-black"
          } text-xl font-semibold mb-4`}
        >
          Comments
        </h2>
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          <div className="space-y-4">
            {!showReplies
              ? comments
                  .filter((c) => c.parentCommentId === null)
                  .map(renderComment)
              : comments
                  .filter((c) => c._id === replyingToCommentId)
                  .map(renderComment)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
