import questionModel  from '../models/questionModel.js';

// Endpoint to handle search queries
const searchQuestions = async (req, res) => {
  const query = req.query.q;
  console.log(query);
  try {
    // Perform a search query based on your database model and search algorithm
    const results = await questionModel.find({ $text: { $search: query } })
      .sort({ score: { $meta: 'textScore' } }) // Sort by relevance score if needed
      .limit(10); // Limit to 10 results for example
    console.log(results);
    res.json(results);
  } catch (error) {
    console.error('Error searching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export  {searchQuestions};