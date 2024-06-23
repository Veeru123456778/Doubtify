import mongoose, { Schema } from 'mongoose'

const draftSchema = new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'questionModel'
    },

    // answer_id:{
    //     type:Schema.Types.ObjectId,
    //     ref:'answerModel'
    // },

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        },

    body:{
        type:String,
        required:true
    },

   
},{timestamps:true})

const draftModel = mongoose.model('draftModel',draftSchema);

export default draftModel;