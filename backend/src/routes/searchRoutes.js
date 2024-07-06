import express from 'express';
import  {searchQuestions}  from '../controllers/searchController.js'; 

const searchrouter = express.Router();

// Search questions route
searchrouter.get('/ques', searchQuestions);

export default searchrouter;
