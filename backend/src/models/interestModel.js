import mongoose from "mongoose";

const interestSchema = new mongoose.Schema({
    names :[{
        type:String,
        required:true,
        unique:true
    }]
})

const Interest = mongoose.model('Interest', interestSchema);

export default Interest;