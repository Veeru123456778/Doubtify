// import mongoose, { Mongoose, Types } from 'mongoose'
// const { Schema } = mongoose; // Destructure Schema from mongoose


// const commentsSchema=  Schema({
//     user_id:{
//         type:Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     question_id:{
//         type:Schema.Types.ObjectId,
//         ref:'QuestionModel',
//     },
//     answer_id:{
//         type:Schema.Types.ObjectId,
//         ref:'answerModel'
//     },
//     body:{
//         type:String
//     },
//     chidrenComments:[
//         {
//             type:Schema.Types.ObjectId,
//             ref:"commentsModel"
//         },
//     ],
//     parentCommentId:{
//         type:Types.Schema.ObjectId,
//         ref:'commentsModel',
//         default:null
//     }

// },{timestamps:true})


// const commentsModel = mongoose.model.commentsModel ||  mongoose.model('commentsModel',commentsSchema);

// export default commentsModel;

import mongoose from 'mongoose';

const { Schema } = mongoose; // Destructure Schema from mongoose

const commentsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, // Correct reference to ObjectId
        ref: 'User',
        required: true
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'QuestionModel'
    },
    answer_id: {
        type: Schema.Types.ObjectId,
        ref: 'answerModel'
    },
    body: {
        type: String
    },
    parentCommentId: {
        type: Schema.Types.ObjectId, // Correct reference to ObjectId
        ref: 'commentsModel' // Reference to the same model for parent comments
    },
    childrenComments: [
        {
            type: mongoose.Schema.Types.ObjectId, // Correct reference to ObjectId
            ref: 'commentsModel' // Reference to the same model for child comments
        }
    ]
}, { timestamps: true });

const commentsModel = mongoose.models.commentsModel || mongoose.model('commentsModel', commentsSchema);

export default commentsModel;
