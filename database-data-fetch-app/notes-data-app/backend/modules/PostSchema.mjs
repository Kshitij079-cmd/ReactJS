import mongoose  from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //storing user id from mongoDB to fetch notes related to that user id.Basically we want objectid from mongoose db
        ref:'user',
        required: true
    },
"title":{
        type:String,
        required:true
    },
    "description":{
        type:String,
        required:true,
    },
  
    "date":{
        type:Date,  
        default:Date.now
                },
    // visibility: { // New field to distinguish between public and private posts
    //     type: String,
    //     enum: ["public", "private"],
    //     default: "private" // Default visibility is private
    // }
  });

const Posts = mongoose.model("Posts",PostSchema);
export default Posts;