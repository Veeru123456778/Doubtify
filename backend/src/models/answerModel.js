import mongoose, { Schema } from 'mongoose'

const answerSchema = new mongoose.Schema({
    questionId:{
        type:Schema.Types.ObjectId,
        ref:'QuestionModel',
        required:true
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
        },

    body:{
        type:String,
        required:true
    },
    files:[
        {type:String}
    ]

},{timestamps:true})

const answerModel = mongoose.model('answerModel',answerSchema);

export default answerModel;