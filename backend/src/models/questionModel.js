import mongoose,{Schema} from 'mongoose';

const questionSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
        },

    body:{
        type:String,
        required:true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryModel'
      },
 
    files:[
        {type:String}
    ],
    upvotes:{
        type:Number,
        default:0
    }
    
},{timestamps:true})

questionSchema.index({ body: 'text'});


const questionModel = mongoose.model('questionModel',questionSchema);

export default questionModel;
