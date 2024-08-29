import mongoose, { Schema } from 'mongoose'

const upvotesSchema =  new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    questionId:{
        type:Schema.Types.ObjectId,
        ref:'QuestionModel',
    },
    answerId:{
        type:Schema.Types.ObjectId,
        ref:'answerModel'
    }
},{timestamps:true})


const upvoteModel = mongoose.model('upvoteModel',upvotesSchema);

export default upvoteModel;