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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
   
    password: { type: String, required: function() { return !this.googleId; } },

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
    googleId: { type: String, unique: true, sparse: true },

  },
  { timestamps: true }
);

const userModel = mongoose.model.User || mongoose.model("User", userSchema);

export default userModel;
