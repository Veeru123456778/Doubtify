import mongoose, { Schema } from 'mongoose'

const DownvotesSchema =  new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
  
    answerId:{
        type:Schema.Types.ObjectId,
        ref:'answerModel'
    }
},{timestamps:true})


const downvoteModel = mongoose.model('downvoteModel',DownvotesSchema);

export default downvoteModel;

  // questionId:{
    //     type:Schema.Types.ObjectId,
    //     ref:'QuestionModel',
    // },