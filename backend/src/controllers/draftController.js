// controllers/draftController.js
import draftModel from '../models/draftModel.js';
import mongoose from 'mongoose';
import questionModel from '../models/questionModel.js';

const addDraft = async (req, res) => {
  try {
    const { question_id, body, user_id } = req.body.data;

    const newDraft = new draftModel({
      question_id,
      body,
      user_id
    });

    await newDraft.save();

    res.status(200).json({ success: true, message: 'Draft saved successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save draft', error });
  }
};

const getDrafts = async(req,res)=>{
  const { userId } = req.params;

  try {
      const drafts = await draftModel.find({ user_id:userId }).populate('question_id');

      return res.json({ success: true, drafts });
  } catch (error) {
      console.error("Error retrieving drafts:", error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const removeDraft = async(req,res)=>{
  const { draftId } = req.params;

  // Debug log to inspect userId
  console.log("Received draftId:", draftId);

  try {
      // Find bookmarks for the specified user and populate the referenced models
      const drafts = await draftModel.findByIdAndDelete({ _id:draftId });

      // Debug log to inspect the query result

      // if (!drafts || drafts.length === 0) {
      //     console.warn("No drafts found for Deletion:", draftId);
      // }

      return res.json({ success: true, message:"Draft Deleted Successfully" ,drafts });
  } catch (error) {
      console.error("Error retrieving drafts:", error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const UpdateDraft = async (req, res) => {
  const { question_id, user_id, body } = req.body.data; 

  try {
      const draft = await draftModel.findOneAndUpdate(
          { 
              question_id, 
              user_id
          },
          { body },
          { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.status(200).json({ success: true, draft });
  } catch (error) {
      console.error('Error updating/creating draft:', error);
      return res.status(500).json({ success: false, message: 'Failed to update/create draft' });
  }
};

export { addDraft,getDrafts,removeDraft,UpdateDraft };
