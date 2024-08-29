// controllers/commentController.js
import commentsModel from '../models/commentsModel.js';
import answerModel from '../models/answerModel.js';
import userModel from '../models/userModel.js';

const addComment = async (req, res) => {
  const { answer_id, user_id, body, question_id, parentCommentId } = req.body;

  if (!answer_id || !user_id || !body || !question_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
      const user = await userModel.findById(user_id);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      const answer = await answerModel.findById(answer_id);
      if (!answer) {
          return res.status(404).json({ success: false, message: 'Answer not found' });
      }

      const newComment = new commentsModel({
          body,
          answer_id,
          user_id,
          question_id,
          parentCommentId: parentCommentId || null
      });

      if (parentCommentId) {
          const parentComment = await commentsModel.findById(parentCommentId);
          if (!parentComment) {
              return res.status(404).json({ success: false, message: 'Parent comment not found' });
          }
          parentComment.childrenComments.push(newComment._id); // Fixed typo here
          await parentComment.save();
      }

      await newComment.save();
      res.json({ success: true, comment: newComment });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await commentsModel.find({ answer_id: req.params.answer_id })
      .populate('user_id')
      .populate({
        path: 'childrenComments', // Fixed typo here
        populate: { path: 'user_id' } // Populate the user details for each child comment
      });

    res.json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Controller function to get replies by comment ID
 const getRepliesByCommentId = async (req, res) => {
  const { comment_id } = req.params;

  try {
    // Find the comment
    const comment = await commentsModel.findById(comment_id).exec();
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Find replies to this comment
    const replies = await commentsModel.find({ parentCommentId: comment_id }).exec();
    
    res.json({ success: true, comment, replies });
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export {addComment,getComments,getRepliesByCommentId};


// import commentsModel from '../models/commentsModel.js'; // Assuming you have this model
// import questionModel from '../models/questionModel.js';
// import answerModel from '../models/answerModel.js';

// // Add a new comment
// export const addComment = async (req, res) => {
//     try {
//         const { user_id, question_id, answer_id, body, parentCommentId } = req.body;

//         // Validate required fields
//         if (!user_id || !question_id || !body) {
//             return res.status(400).json({ message: 'User ID, Question ID, and body are required.' });
//         }

//         // Check if the question exists
//         const question = await questionModel.findById(question_id);
//         if (!question) {
//             return res.status(404).json({ message: 'Question not found.' });
//         }

//         // Check if the answer exists (if provided)
//         if (answer_id) {
//             const answer = await answerModel.findById(answer_id);
//             if (!answer) {
//                 return res.status(404).json({ message: 'Answer not found.' });
//             }
//         }

//         // Create a new comment
//         const newComment = new commentsModel({
//             user_id,
//             question_id,
//             answer_id,
//             body,
//             parentCommentId
//         });

//         await newComment.save();

//         return res.status(201).json({ success:true,message: 'Comment added successfully.', comment: newComment });
//     } catch (error) {
//         console.error('Error adding comment:', error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// // Get comment for a question (with optional answer filtering)
// export const getComments = async (req, res) => {
//     try {
//         const { question_id, answer_id } = req.query;

//         // Fetch top-level comment for a specific question/answer
//         const comment = await commentsModel.find({
//             question_id,
//             answer_id,
//             parentCommentId: null
//         }).populate('user_id');

//         // Fetch replies for each comment
//         const comments = await Promise.all(comment.map(async comment => {
//             const replies = await commentsModel.find({ parentCommentId: comment._id }).populate('user_id');
//             return {
//                 ...comment.toObject(),
//                 replies
//             };
//         }));

//         return res.status(200).json({success:true,comments});
//     } catch (error) {
//         console.error('Error fetching comment:', error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// // Optionally: Update a comment
// export const updateComment = async (req, res) => {
//     try {
//         const { comment_id, body } = req.body;

//         // Check if the comment exists
//         const comment = await commentsModel.findById(comment_id);
//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found.' });
//         }

//         // Update the comment body
//         comment.body = body;
//         await comment.save();

//         return res.status(200).json({ message: 'Comment updated successfully.', comment });
//     } catch (error) {
//         console.error('Error updating comment:', error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// // Optionally: Delete a comment
// export const deleteComment = async (req, res) => {
//     try {
//         const { comment_id } = req.params;

//         // Check if the comment exists
//         const comment = await commentsModel.findById(comment_id);
//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found.' });
//         }

//         // Delete the comment
//         await comment.remove();

//         return res.status(200).json({ message: 'Comment deleted successfully.' });
//     } catch (error) {
//         console.error('Error deleting comment:', error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };
