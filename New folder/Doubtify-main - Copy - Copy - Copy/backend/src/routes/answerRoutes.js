import express from 'express'
import { addAnswer, getAllAnswersByQuesId, upvoteAnswer,getUpvoteStatus,downvoteAnswer,getAllAnswersByUserId } from '../controllers/answerController.js';
import { upload } from '../middlewares/multer.middleware.js';

const answerRouter = express.Router();

answerRouter.post('/:userId/:questionId/add',upload.array('files'),addAnswer);
answerRouter.get('/:quesId',getAllAnswersByQuesId);
// answerRouter.post('/upvote',upvoteAnswer);
// answerRouter.post('/upvoteStatus',getUpvoteStatus);
answerRouter.post('/upvote', upvoteAnswer);
answerRouter.post('/downvote', downvoteAnswer);
answerRouter.post('/voteStatus', getUpvoteStatus);
answerRouter.post('/:userId',getAllAnswersByUserId);

export default answerRouter;