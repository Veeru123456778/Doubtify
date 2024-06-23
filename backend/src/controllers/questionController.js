import questionModel from "../models/questionModel.js";
import upvoteModel from "../models/upvotesModel.js";
import uploadOnCloud from "../Utils/cloudinary.js";
import fs from 'fs';

const addQuestion = async(req,res)=>{
     const {userId} = req.params;
     const {body,category,subCategory} = req.body;
     const files = req.files;
     
     if (!userId || !body || !category || !subCategory) {
        return res.status(400).json({ message: "Incomplete data provided" });
      }

      let filesArray=[];
      if(files){
        
      await Promise.all(files.map(async(file)=>{
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
              return res.status(500).json({ success: false, message: "Error uploading profile picture", error: error.message });
            }
          }
    
      }));

    }
      try{
        const question = new questionModel({
            userId:userId,
            body:body,
            category:category,
            subCategory:subCategory,
            files:filesArray
          })
        // const question = new questionModel({
        //     userId:userId,
        //     body:body,
        //     categories:categories,
        //     subCategories:subCategories,
        //     files:filesArray
        //   })
     
         await question.save();
         res.status(201).json({ message: "Question added successfully", data:{question} });
      }
      catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Failed to add question" });
      }
}

const getAllQuestions = async(req,res) => {
try{
  const questions = await questionModel.find();
  // console.log(questions);
  res.json({success:true,data:questions});
}
catch(error){
console.log("Error :",error);
}
}

const getQuesById = async(req,res)=>{
const {quesId} = req.params;
try{

  const question = await questionModel.find({_id:quesId});
  // console.log(question[0]);
  res.json({success:true,data:question[0]});
}
catch(error){
console.log("Error :",error);
}
}

const getQuesByUserId = async(req,res)=>{
const {userId} = req.params;
try{
  const questions = await questionModel.find({userId:userId});
  res.json({success:true,data:{questions}});
}
catch(error){
console.log("Error :",error);
}
}


// const upvoteQuestion = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     // Check if the upvote already exists
//     const existingUpvote = await upvoteModel.findOne({ questionId: questionId, userId: userId });

//     // Fetch the question to update the upvote count
//     const question = await questionModel.findById(questionId);

//     if (!question) {
//       return res.status(404).json({ success: false, message: 'Question not found' });
//     }

//     if (existingUpvote) {
//       // If upvote exists, remove it and decrement the upvote count
//       // await existingUpvote.remove();
//       await upvoteModel.deleteOne({ _id: existingUpvote._id });

//       question.upvotes -= 1;
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, message: 'Upvote removed' });
//     } else {
//       // If upvote does not exist, add it and increment the upvote count
//       const upvoteInfo = new upvoteModel({
//         questionId: questionId,
//         userId: userId
//       });
//       await upvoteInfo.save();
//       question.upvotes += 1;
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, message: 'Upvote added' });
//     }
//   } catch (error) {
//     console.error("Error updating upvotes:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const upvoteQuestion = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     // Check if the upvote already exists
//     const existingUpvote = await upvoteModel.findOne({ questionId: questionId, userId: userId });

//     // Fetch the question to update the upvote count
//     const question = await questionModel.findById(questionId);

//     if (!question) {
//       return res.status(404).json({ success: false, message: 'Question not found' });
//     }

//     if (existingUpvote) {
//       // If upvote exists, remove it and decrement the upvote count
//       await upvoteModel.deleteOne({ _id: existingUpvote._id });
//       if(question.upvotes>0){
//       question.upvotes -= 1;
//     }
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, message: 'Upvote removed' });
//     } else {
//       // If upvote does not exist, add it and increment the upvote count
//       const upvoteInfo = new upvoteModel({
//         questionId: questionId,
//         userId: userId
//       });
//       await upvoteInfo.save();
//       question.upvotes += 1;
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, message: 'Upvote added' });
//     }
//   } catch (error) {
//     console.error("Error updating upvotes:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const upvoteQuestion = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     // Check if the upvote already exists
//     const existingUpvote = await upvoteModel.findOne({ questionId: questionId, userId: userId });

//     // Fetch the question to update the upvote count
//     const question = await questionModel.findById(questionId);

//     if (!question) {
//       return res.status(404).json({ success: false, message: 'Question not found' });
//     }

//     if (existingUpvote) {
//       // If upvote exists, remove it and decrement the upvote count
//       await upvoteModel.deleteOne({ _id: existingUpvote._id });
//       if (question.upvotes > 0) {
//         question.upvotes -= 1;
//       }
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote removed' });
//     } else {
//       // If upvote does not exist, add it and increment the upvote count
//       const upvoteInfo = new upvoteModel({
//         questionId: questionId,
//         userId: userId
//       });
//       await upvoteInfo.save();
//       question.upvotes += 1;
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote added' });
//     }
//   } catch (error) {
//     console.error("Error updating upvotes:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const getUpvoteStatus = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     const existingUpvote = await upvoteModel.findOne({ questionId: questionId, userId: userId });
//     res.json({ success: true, isUpvoted: !!existingUpvote });
//   } catch (error) {
//     console.error("Error fetching upvote status:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const upvoteQuestion = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     // Check if the upvote already exists
//     const existingUpvote = await upvoteModel.findOne({ questionId, userId });

//     // Fetch the question to update the upvote count
//     const question = await questionModel.findById(questionId);

//     if (!question) {
//       return res.status(404).json({ success: false, message: 'Question not found' });
//     }

//     if (existingUpvote) {
//       // If upvote exists, remove it and decrement the upvote count
//       await upvoteModel.deleteOne({ _id: existingUpvote._id });
//       if (question.upvotes > 0) {
//         question.upvotes -= 1;
//       }
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote removed' });
//     } else {
//       // If upvote does not exist, add it and increment the upvote count
//       const upvoteInfo = new upvoteModel({ questionId, userId });
//       await upvoteInfo.save();
//       question.upvotes += 1;
//       await question.save();
//       return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote added' });
//     }
//   } catch (error) {
//     console.error("Error updating upvotes:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const getUpvoteStatus = async (req, res) => {
//   const { questionId, userId } = req.body;

//   try {
//     const existingUpvote = await upvoteModel.findOne({ questionId, userId });

//     if (existingUpvote) {
//       return res.json({ success: true, isUpvoted: true });
//     } else {
//       return res.json({ success: true, isUpvoted: false });
//     }
//   } catch (error) {
//     console.error("Error checking upvote status:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

const upvoteQuestion = async (req, res) => {
  const { questionId, userId } = req.body;

  try {
    // Check if the upvote already exists
    const existingUpvote = await upvoteModel.findOne({ questionId, userId });
    // console.log("Existing upvote:", existingUpvote);

    // Fetch the question to update the upvote count
    const question = await questionModel.findById(questionId);
    // console.log("Question:", question);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    if (existingUpvote) {
      // If upvote exists, remove it and decrement the upvote count
      await upvoteModel.deleteOne({ _id: existingUpvote._id });
      console.log("Upvote removed");
      if (question.upvotes > 0) {
        question.upvotes -= 1;
      }
      await question.save();
      return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote removed' });
    } else {
      // If upvote does not exist, add it and increment the upvote count
      const upvoteInfo = new upvoteModel({ questionId, userId });
      await upvoteInfo.save();
      console.log("Upvote added");
      question.upvotes += 1;
      await question.save();
      return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote added' });
    }
  } catch (error) {
    console.error("Error updating upvotes:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getUpvoteStatus = async (req, res) => {
  const { questionId, userId } = req.body;

  try {
    const existingUpvote = await upvoteModel.findOne({ questionId, userId });
    // console.log("Upvote status for questionId:", questionId, "and userId:", userId, "is:", existingUpvote);

    if (existingUpvote) {
      return res.json({ success: true, isUpvoted: true });
    } else {
      return res.json({ success: true, isUpvoted: false });
    }
  } catch (error) {
    console.error("Error checking upvote status:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export {addQuestion,getAllQuestions,getQuesById,getQuesByUserId,upvoteQuestion,getUpvoteStatus};