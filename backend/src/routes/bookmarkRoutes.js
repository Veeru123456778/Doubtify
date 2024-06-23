import express from 'express';
import { getBookmarks,addBookmark,removeBookmark } from '../controllers/bookmarkController.js';

const bookmarkRouter = express.Router();

bookmarkRouter.get('/get/:userId',getBookmarks);
bookmarkRouter.post('/add',addBookmark);
bookmarkRouter.delete('/remove',removeBookmark);

export default bookmarkRouter;