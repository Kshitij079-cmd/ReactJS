import mongoose, { Schema } from "mongoose";

const userModel =  new Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true

    },
    "gender":{
        type:String,
        required:true
    },
    "date":{
        type:Date,  
        default:Date.now
        }
});
const user = mongoose.model("user",userModel);
export default user;