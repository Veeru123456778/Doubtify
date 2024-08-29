// import questionModel from "../models/questionModel.js";
// import upvoteModel from "../models/upvotesModel.js";
// import uploadOnCloud from "../Utils/cloudinary.js";
// import fs from 'fs';

// const addQuestion = async(req,res)=>{
//      const {userId} = req.params;
//      const {body,category,subCategory} = req.body;
//      const files = req.files;
     
//      if (!userId || !body || !category || !subCategory) {
//         return res.status(400).json({ message: "Incomplete data provided" });
//       }

//       let filesArray=[];
//       if(files){
        
//       await Promise.all(files.map(async(file)=>{
//         const localFilepath = file ? file.path : null;
//         let cloudinaryResponse = null;
//         if (localFilepath) {
//             console.log('Uploading file to Cloudinary:', localFilepath);
//             try {
//               cloudinaryResponse = await uploadOnCloud(localFilepath);
//               console.log('Cloudinary response:', cloudinaryResponse);
//               filesArray.push(cloudinaryResponse.url);
//               fs.unlinkSync(localFilepath); // Remove file after successful upload
//             } catch (error) {
//               console.error('Error uploading to Cloudinary:', error);
//               return res.status(500).json({ success: false, message: "Error uploading profile picture", error: error.message });
//             }
//           }
    
//       }));

//     }
//       try{
//         const question = new questionModel({
//             userId:userId,
//             body:body,
//             category:category,
//             subCategory:subCategory,
//             files:filesArray
//           })
    
     
//          await question.save();
//          res.status(201).json({ message: "Question added successfully", data:{question} });
//       }
//       catch (error) {
//         console.error("Error adding question:", error);
//         res.status(500).json({ message: "Failed to add question" });
//       }
// }

// const getAllQuestions = async(req,res) => {
// try{
//   const page = parseInt(req.query.page) || 1;
//   const limit = 4;
//   const skip = (page - 1) * limit; // Calculate the number of items to skip

//   const questions = await questionModel.find().skip(skip).limit(limit);

//   res.json({success:true,data:questions});
// }
// catch(error){
// console.log("Error :",error);
// }
// }

// const getQuesById = async(req,res)=>{
// const {quesId} = req.params;
// try{

//   const question = await questionModel.find({_id:quesId});
//   res.json({success:true,data:question[0]});
// }
// catch(error){
// console.log("Error :",error);
// }
// }

// const getQuesByUserId = async(req,res)=>{
// const {userId} = req.params;
// try{
//   const questions = await questionModel.find({userId:userId});
//   res.json({success:true,data:{questions}});
// }
// catch(error){
// console.log("Error :",error);
// }
// }



// // const upvoteQuestion = async (req, res) => {
// //   const { questionId, userId } = req.body;

// //   try {
// //     const existingUpvote = await upvoteModel.findOne({ questionId, userId });

// //     const question = await questionModel.findById(questionId);

// //     if (!question) {
// //       return res.status(404).json({ success: false, message: 'Question not found' });
// //     }

// //     if (existingUpvote) {
// //       await upvoteModel.deleteOne({ _id: existingUpvote._id });
// //       console.log("Upvote removed");
// //       if (question.upvotes > 0) {
// //         question.upvotes -= 1;
// //       }
// //       await question.save();
// //       return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote removed' });
// //     } else {
// //       const upvoteInfo = new upvoteModel({ questionId, userId });
// //       await upvoteInfo.save();
// //       console.log("Upvote added");
// //       question.upvotes += 1;
// //       await question.save();
// //       return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote added' });
// //     }
// //   } catch (error) {
// //     console.error("Error updating upvotes:", error);
// //     res.status(500).json({ success: false, message: 'Internal server error' });
// //   }
// // };

// const upvoteQuestion = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     const question = await questionModel.findById(questionId).select('upvotes');

//     if (!question) {
//       return res.status(404).json({ success: false, message: 'Question not found' });
//     }

//     // Use findOneAndUpdate with upsert to toggle upvote in one atomic operation
//     const existingUpvote = await upvoteModel.findOneAndDelete({ questionId, userId });

//     if (existingUpvote) {
//       // If upvote exists, remove it and decrement upvotes
//       question.upvotes -= 1;
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, message: 'Upvote removed' });
//     } else {
//       // If upvote does not exist, add it and increment upvotes
//       await new upvoteModel({ questionId, userId }).save();
//       question.upvotes += 1;
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, message: 'Upvote added' });
//     }
//   } catch (error) {
//     console.error("Error updating upvotes:", error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };


// // const getUpvoteStatus = async (req, res) => {
// //   const { questionId, userId } = req.body;

// //   try {
// //     const existingUpvote = await upvoteModel.findOne({ questionId, userId });

// //     if (existingUpvote) {
// //       return res.json({ success: true, isUpvoted: true });
// //     } else {
// //       return res.json({ success: true, isUpvoted: false });
// //     }
// //   } catch (error) {
// //     console.error("Error checking upvote status:", error);
// //     res.status(500).json({ success: false, message: 'Internal server error' });
// //   }
// // };

// const getUpvoteStatus = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     const existingUpvote = await upvoteModel.findOne({ questionId, userId });

//     return res.json({ success: true, isUpvoted: !!existingUpvote });
//   } catch (error) {
//     console.error("Error checking upvote status:", error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };


// export {addQuestion,getAllQuestions,getQuesById,getQuesByUserId,upvoteQuestion,getUpvoteStatus};


// import questionModel from "../models/questionModel.js";
// import upvoteModel from "../models/upvotesModel.js";
// import uploadOnCloud from "../Utils/cloudinary.js";
// import fs from 'fs';
// import WebSocket from 'ws';

// const wss = new WebSocket.Server({ port: 8080 });

// const addQuestion = async(req,res)=>{
//      const {userId} = req.params;
//      const {body,category,subCategory} = req.body;
//      const files = req.files;
     
//      if (!userId || !body || !category || !subCategory) {
//         return res.status(400).json({ message: "Incomplete data provided" });
//       }

//       let filesArray=[];
//       if(files){
        
//       await Promise.all(files.map(async(file)=>{
//         const localFilepath = file ? file.path : null;
//         let cloudinaryResponse = null;
//         if (localFilepath) {
//             console.log('Uploading file to Cloudinary:', localFilepath);
//             try {
//               cloudinaryResponse = await uploadOnCloud(localFilepath);
//               console.log('Cloudinary response:', cloudinaryResponse);
//               filesArray.push(cloudinaryResponse.url);
//               fs.unlinkSync(localFilepath); // Remove file after successful upload
//             } catch (error) {
//               console.error('Error uploading to Cloudinary:', error);
//               return res.status(500).json({ success: false, message: "Error uploading profile picture", error: error.message });
//             }
//           }
    
//       }));

//     }
//       try{
//         const question = new questionModel({
//             userId:userId,
//             body:body,
//             category:category,
//             subCategory:subCategory,
//             files:filesArray
//           })
    
     
//          await question.save();
//          res.status(201).json({ message: "Question added successfully", data:{question} });
//       }
//       catch (error) {
//         console.error("Error adding question:", error);
//         res.status(500).json({ message: "Failed to add question" });
//       }
// }

// const getAllQuestions = async(req,res) => {
// try{
//   const page = parseInt(req.query.page) || 1;
//   const limit = 4;
//   const skip = (page - 1) * limit; // Calculate the number of items to skip

//   const questions = await questionModel.find().skip(skip).limit(limit);

//   res.json({success:true,data:questions});
// }
// catch(error){
// console.log("Error :",error);
// }
// }

// const getQuesById = async(req,res)=>{
// const {quesId} = req.params;
// try{

//   const question = await questionModel.find({_id:quesId});
//   res.json({success:true,data:question[0]});
// }
// catch(error){
// console.log("Error :",error);
// }
// }

// const getQuesByUserId = async(req,res)=>{
// const {userId} = req.params;
// try{
//   const questions = await questionModel.find({userId:userId});
//   res.json({success:true,data:{questions}});
// }
// catch(error){
// console.log("Error :",error);
// }
// }

// const upvoteQuestion = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     const existingUpvote = await upvoteModel.findOne({ questionId, userId });
//     const question = await questionModel.findById(questionId);

//     if (!question) {
//       return res.status(404).json({ success: false, message: 'Question not found' });
//     }

//     if (existingUpvote) {
//       await upvoteModel.deleteOne({ _id: existingUpvote._id });
//       question.upvotes -= 1;
//     } else {
//       const upvoteInfo = new upvoteModel({ questionId, userId });
//       await upvoteInfo.save();
//       question.upvotes += 1;
//     }

//     await question.save();

//     // Broadcast update
//     wss.clients.forEach(client => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ questionId, upvotes: question.upvotes }));
//       }
//     });

//     res.json({ success: true, question, message: existingUpvote ? 'Upvote removed' : 'Upvote added' });
//   } catch (error) {
//     console.error("Error updating upvotes:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const getUpvoteStatus = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     const existingUpvote = await upvoteModel.findOne({ questionId, userId });

//     return res.json({ success: true, isUpvoted: !!existingUpvote });
//   } catch (error) {
//     console.error("Error checking upvote status:", error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };


// export {addQuestion,getAllQuestions,getQuesById,getQuesByUserId,upvoteQuestion,getUpvoteStatus};




// questionController.js
import fs from 'fs';
import questionModel from '../models/questionModel.js'; // Adjust path as needed
import upvoteModel from '../models/upvotesModel.js'; // Adjust path as needed
import uploadOnCloud from '../Utils/cloudinary.js'; // Adjust path as needed

// Add a question
const addQuestion = async (req, res) => {
  const { userId } = req.params;
  const { body, category, subCategory } = req.body;
  const files = req.files;

  if (!userId || !body || !category || !subCategory) {
    return res.status(400).json({ message: "Incomplete data provided" });
  }

  let filesArray = [];
  if (files) {
    await Promise.all(files.map(async (file) => {
      const localFilepath = file ? file.path : null;
      let cloudinaryResponse = null;
      if (localFilepath) {
        console.log('Uploading file to Cloudinary:', localFilepath);
        try {
          cloudinaryResponse = await uploadOnCloud(localFilepath);
          console.log('Cloudinary response:', cloudinaryResponse);
          filesArray.push(cloudinaryResponse.url);
          fs.unlinkSync(localFilepath); // Remove file after successful upload
        } catch (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).json({ success: false, message: "Error uploading files", error: error.message });
        }
      }
    }));
  }

  try {
    const question = new questionModel({
      userId: userId,
      body: body,
      category: category,
      subCategory: subCategory,
      files: filesArray
    });

    await question.save();
    res.status(201).json({ message: "Question added successfully", data: { question } });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Failed to add question" });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const questions = await questionModel.find().skip(skip).limit(limit);

    res.json({ success: true, data: questions });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve questions" });
  }
};

// Get question by ID
const getQuesById = async (req, res) => {
  const { quesId } = req.params;
  try {
    const question = await questionModel.findById(quesId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, data: question });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve question" });
  }
};

// Get questions by user ID
const getQuesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const questions = await questionModel.find({ userId: userId });
    res.json({ success: true, data: { questions } });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve questions" });
  }
};

// Handle upvoting a question
const upvoteQuestion = async (req, res) => {
  const { questionId, userId } = req.body;

  try {
    const existingUpvote = await upvoteModel.findOne({ questionId, userId });
    const question = await questionModel.findById(questionId);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    if (existingUpvote) {
      await upvoteModel.deleteOne({ _id: existingUpvote._id });
      question.upvotes -= 1;
    } else {
      const upvoteInfo = new upvoteModel({ questionId, userId });
      await upvoteInfo.save();
      question.upvotes += 1;
    }

    await question.save();

    // Broadcast update to WebSocket clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ questionId, upvotes: question.upvotes }));
      }
    });

    res.json({ success: true, question, message: existingUpvote ? 'Upvote removed' : 'Upvote added' });
  } catch (error) {
    console.error("Error updating upvotes:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Check upvote status
const getUpvoteStatus = async (req, res) => {
  const { questionId, userId } = req.body;

  try {
    const existingUpvote = await upvoteModel.findOne({ questionId, userId });

    return res.json({ success: true, isUpvoted: !!existingUpvote });
  } catch (error) {
    console.error("Error checking upvote status:", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Export functions
export { addQuestion, getAllQuestions, getQuesById, getQuesByUserId, upvoteQuestion, getUpvoteStatus };

