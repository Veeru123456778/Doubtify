import mongoose,{Schema} from 'mongoose'

const questionSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
        },

    body:{
        type:String,
        required:true
    },
    categories:{
        type:String
    },
    subCategories:{
        type:String
    },
    files:[
        {type:String}
    ],
    upvotes:{
        type:Number,
        default:0
    }
    
},{timestamps:true})

const questionModel = mongoose.model('questionModel',questionSchema);

export default questionModel;