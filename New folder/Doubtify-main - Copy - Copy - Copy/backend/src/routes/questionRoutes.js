import express from 'express'
import { addQuestion, getAllQuestions, getQuesById, getQuesByUserId, getUpvoteStatus, upvoteQuestion, } from '../controllers/questionController.js';
import { upload } from '../middlewares/multer.middleware.js';

const questionRouter = express.Router();

questionRouter.post('/:userId/add',upload.array('files'), addQuestion);
questionRouter.get('/questions',getAllQuestions);
questionRouter.get('/:quesId',getQuesById);
questionRouter.post('/upvote',upvoteQuestion);
questionRouter.post('/upvoteStatus',getUpvoteStatus);
questionRouter.get('/get/:userId',getQuesByUserId);


export default questionRouter;