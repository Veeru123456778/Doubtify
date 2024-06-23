import mongoose, { Schema } from 'mongoose'

const bookmarkSchema=  new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    questionId:{
        type:Schema.Types.ObjectId,
        ref:'questionModel',
        required:true
    },
    answerId:{
        type:Schema.Types.ObjectId,
        ref:'answerModel'
    },

},{timestamps:true})

const bookmarkModel = mongoose.model('bookmarkModel',bookmarkSchema);

export default bookmarkModel;