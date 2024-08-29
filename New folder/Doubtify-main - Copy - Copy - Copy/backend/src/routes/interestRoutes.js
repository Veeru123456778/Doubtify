import express from 'express'
import { getAllInterests } from '../controllers/interestController.js';

const inerestRouter = express.Router();

inerestRouter.get('/',getAllInterests);

export default inerestRouter;