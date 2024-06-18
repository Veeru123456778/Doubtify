import answerModel from "../models/answerModel.js";
import uploadOnCloud from "../Utils/cloudinary.js";
import fs from 'fs';

const addAnswer = async(req,res)=>{
const {userId,questionId} = req.params;
const {body} = req.body ;

console.log(userId);
console.log(questionId);
console.log(body);

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
  console.log(answers);
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

export {addAnswer,getAllAnswersByQuesId}