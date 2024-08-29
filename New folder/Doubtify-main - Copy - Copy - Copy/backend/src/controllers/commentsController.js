// controllers/commentController.js
import commentsModel from '../models/commentsModel.js';
import answerModel from '../models/answerModel.js';
import userModel from '../models/userModel.js';

const getComments = async (req, res) => {
  try {
    const comments = await commentsModel.find({ answer_id : req.params.answer_id }).populate('user_id');
    console.log(comments);
    res.json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const addComment = async (req, res) => {
  const { answer_id, user_id, body,question_id } = req.body;
  
  if (!answer_id || !user_id || !body || !question_id) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'userModel not found' });
    }

    const answer = await answerModel.findById(answer_id);
    if (!answer) {
      return res.status(404).json({ success: false, message: 'answerModel not found' });
    }

    const newComment = new commentsModel({
      body,
      answer_id: answer_id,
      user_id: user_id,
      question_id:question_id
    });

    await newComment.save();
    res.json({ success: true, comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export {getComments,addComment};
