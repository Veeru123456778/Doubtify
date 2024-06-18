import mongoose, { Schema } from 'mongoose'

const bookmarkSchema=  new mongoose.Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    question_id:{
        type:Schema.Types.ObjectId,
        ref:'QuestionModel',
        required:true
    },
    answer_id:{
        type:Schema.Types.ObjectId,
        ref:'answerModel'
    },

},{timestamps:true})

const bookmarkModel = mongoose.model('bookmarkModel',bookmarkSchema);

export default bookmarkModel;