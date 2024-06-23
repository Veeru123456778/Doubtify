import answerModel from "../models/answerModel.js";
import upvoteModel from "../models/upvotesModel.js";
import downvoteModel from "../models/downvoteModel.js";
import uploadOnCloud from "../Utils/cloudinary.js";
import fs from 'fs';

const addAnswer = async(req,res)=>{
const {userId,questionId} = req.params;
const {body} = req.body ;

// console.log(userId);
// console.log(questionId);
// console.log(body);

const files = req.files;
     

if (!userId || !questionId || !body) {
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
    const answer = new answerModel({
        userId:userId,
        questionId:questionId,
        body:body,
        files:filesArray
      })
 
     await answer.save();
     res.status(201).json({ message: "Answer added successfully", data:{answer} });
  }
  catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Failed to add question" });
  }
}

// const getAllQuestions = async(req,res) => {
// try{
//   const questions = await questionModel.find();
//   console.log(questions);
//   res.json({success:true,message:"Displaying all questions"});
// }
// catch(error){
// console.log("Error :",error);
// }
// }

const getAllAnswersByQuesId = async(req,res)=>{
const {quesId} = req.params;
try{
  const answers = await answerModel.find({questionId:quesId});
  // console.log(answers);
  res.json({success:true,data:answers});
}
catch(error){
console.log("Error :",error);
}
}

// const getQuesByUserId = async(req,res)=>{
// const {userId} = req.params;
// try{
//   const questions = await questionModel.find({userId:userId});
//   console.log(questions);
//   res.json({success:true,data:{questions}});
// }
// catch(error){
// console.log("Error :",error);
// }
// }

// const upvoteAnswer = async (req, res) => {
//   const { answerId, userId } = req.body;

//   try {
//     // Check if the upvote already exists
//     const existingUpvote = await upvoteModel.findOne({ answerId, userId });
//     console.log("Existing upvote:", existingUpvote);

//     // Fetch the question to update the upvote count
//     const answer = await answerModel.findById(answerId);
//     console.log("Answer: ", answer);

//     if (!answer) {
//       return res.status(404).json({ success: false, message: 'Answer not found' });
//     }

//     if (existingUpvote) {
//       // If upvote exists, remove it and decrement the upvote count
//       await upvoteModel.deleteOne({ _id: existingUpvote._id });
//       console.log("Upvote removed");
//       if (answer.upvotes > 0) {
//         answer.upvotes -= 1;
//       }
//       await answer.save();
//       return res.json({ success: true, upvotes: answer.upvotes, answer, message: 'Upvote removed' });
//     } else {
//       // If upvote does not exist, add it and increment the upvote count
//       const upvoteInfo = new upvoteModel({ answerId, userId });
//       await upvoteInfo.save();
//       console.log("Upvote added");
//       answer.upvotes += 1;
//       await answer.save();
//       return res.json({ success: true, upvotes: answer.upvotes, answer, message: 'Upvote added' });
//     }
//   } catch (error) {
//     console.error("Error updating upvotes:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const getUpvoteStatus = async (req, res) => {
//   const { answerId, userId } = req.body;

//   try {
//     const existingUpvote = await upvoteModel.findOne({ answerId, userId });
//     console.log("Upvote status for answerId:", answerId, "and userId:", userId, "is:", existingUpvote);

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

const upvoteAnswer = async (req, res) => {
  const { answerId, userId } = req.body;

  try {
    const existingUpvote = await upvoteModel.findOne({ answerId, userId });
    const existingDownvote = await downvoteModel.findOne({ answerId, userId });

    const answer = await answerModel.findById(answerId);

    if (!answer) {
      return res.status(404).json({ success: false, message: 'Answer not found' });
    }

    if (existingUpvote) {
      // If upvote exists, remove it and decrement the upvote count
      await upvoteModel.deleteOne({ _id: existingUpvote._id });
      if (answer.upvotes > 0) {
        answer.upvotes -= 1;
      }
      await answer.save();
      return res.json({ success: true, upvotes: answer.upvotes, answer, message: 'Upvote removed' });
    } else {
      // If upvote does not exist, add it and increment the upvote count
      const upvoteInfo = new upvoteModel({ answerId, userId });
      await upvoteInfo.save();
      answer.upvotes += 1;

      // If the user had downvoted, remove the downvote
      if (existingDownvote) {
        await downvoteModel.deleteOne({ _id: existingDownvote._id });
        if (answer.downVotes > 0) {
          answer.downVotes -= 1;
        }
      }

      await answer.save();
      return res.json({ success: true, upvotes: answer.upvotes, downVotes: answer.downVotes, answer, message: 'Upvote added' });
    }
  } catch (error) {
    console.error("Error updating upvotes:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getUpvoteStatus = async (req, res) => {
  const { answerId, userId } = req.body;

  try {
    const existingUpvote = await upvoteModel.findOne({ answerId, userId });
    const existingDownvote = await downvoteModel.findOne({ answerId, userId });

    return res.json({
      success: true,
      isUpvoted: !!existingUpvote,
      isDownvoted: !!existingDownvote
    });
  } catch (error) {
    console.error("Error checking upvote status:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const downvoteAnswer = async (req, res) => {
  const { answerId, userId } = req.body;

  try {
    const existingDownvote = await downvoteModel.findOne({ answerId, userId });
    const existingUpvote = await upvoteModel.findOne({ answerId, userId });

    const answer = await answerModel.findById(answerId);

    if (!answer) {
      return res.status(404).json({ success: false, message: 'Answer not found' });
    }

    if (existingDownvote) {
      // If downvote exists, remove it and decrement the downvote count
      await downvoteModel.deleteOne({ _id: existingDownvote._id });
      if (answer.downVotes > 0) {
        answer.downVotes -= 1;
      }
      await answer.save();
      return res.json({ success: true, downVotes: answer.downVotes, answer, message: 'Downvote removed' });
    } else {
      // If downvote does not exist, add it and increment the downvote count
      const downvoteInfo = new downvoteModel({ answerId, userId });
      await downvoteInfo.save();
      answer.downVotes += 1;

      // If the user had upvoted, remove the upvote
      if (existingUpvote) {
        await upvoteModel.deleteOne({ _id: existingUpvote._id });
        if (answer.upvotes > 0) {
          answer.upvotes -= 1;
        }
      }

      await answer.save();
      return res.json({ success: true, downVotes: answer.downVotes, upvotes: answer.upvotes, answer, message: 'Downvote added' });
    }
  } catch (error) {
    console.error("Error updating downvotes:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export {addAnswer,getAllAnswersByQuesId,upvoteAnswer,getUpvoteStatus,downvoteAnswer}