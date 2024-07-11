// routes/comments.js
import { addComment, getComments } from '../controllers/commentsController.js';
import express from 'express';
const commentRoutes = express.Router();

// Get comments for an answer
commentRoutes.get('/:answer_id', getComments);
commentRoutes.post('/add', addComment);

export default commentRoutes;