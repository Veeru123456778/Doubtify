import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
      categoryName:{
        type:String,
        required:true,
        unique:true
      },
     questions:[
        {
            type:Schema.Types.ObjectId,
            ref:'questionModel'
        }
     ],
     count:{
        type:Number,
        default:0
     }
})

const categoryModel = mongoose.models.categoryModel ||  mongoose.model('categoryModel',categorySchema);

export default categoryModel;