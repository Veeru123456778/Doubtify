// routes/comments.js
import { addComment, getComments,getRepliesByCommentId } from '../controllers/commentsController.js';
import express from 'express';
const commentRoutes = express.Router();

// Get comments for an answer
commentRoutes.get('/:answer_id', getComments);
commentRoutes.post('/add', addComment);
commentRoutes.get('/replies/:comment_id', getRepliesByCommentId);

export default commentRoutes;