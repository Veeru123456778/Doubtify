import Interest from '../models/interestModel.js';

export const getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.find();

    res.json(interests);
  } catch (error) {
    console.error('Error getting interests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
