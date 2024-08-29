import mongoose, { Schema } from 'mongoose'

const commentsSchema=  new mongoose.Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    question_id:{
        type:Schema.Types.ObjectId,
        ref:'QuestionModel',
    },
    answer_id:{
        type:Schema.Types.ObjectId,
        ref:'answerModel'
    },
    body:{
        type:String
    }

},{timestamps:true})


const commentsModel = mongoose.model('commentsModel',commentsSchema);

export default commentsModel;