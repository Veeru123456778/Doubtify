// import mongoose, { Schema } from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       required: true,
//       type: String,
//     },
//     profile_picture: {
//       type: String,
//     },
//     firstName:{
//       type:String,
//       required:true
//     },
//     lastName:{
//       type:String,
//       required:true
//     },
//     interests: [
//        { type:String }
//       ]
//   ,
//     bio:{
//       type:String
//     },
//     comments:[
//       {
//         type:Schema.Types.ObjectId,
//       ref:'commentsModel'
//     }
//     ],
//     upvotes:[
//        {
//         type:Schema.Types.ObjectId,
//         ref:'upvoteModel'
//        }
//     ]
//   },
//   { timestamps: true }
// );

// const userModel = mongoose.model.User || mongoose.model("User", userSchema);

// export default userModel;

import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
   
    password: {
      type: String,
      required: function() { return !this.GoogleLogin; }, // Only require password if not a Google login
    },
    profile_picture: {
      type: String,
    },
    firstName:{
      type:String,
      required:true
    },
    lastName:{
      type:String,
      required:true
    },
    interests: [
       { type:String }
      ]
  ,
    bio:{
      type:String
    },
    comments:[
      {
        type:Schema.Types.ObjectId,
      ref:'commentsModel'
    }
    ],
    upvotes:[
       {
        type:Schema.Types.ObjectId,
        ref:'upvoteModel'
       }
    ],
    notifications:
      {
      type:[notificationSchema],
      default:[],
      }
  ,
    GoogleLogin: { type: Boolean ,default:false },
  },
  { timestamps: true }
);

const userModel = mongoose.model.User || mongoose.model("User", userSchema);

export default userModel;
