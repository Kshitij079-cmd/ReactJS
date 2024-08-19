import mongoose  from "mongoose";
const { Schema } = mongoose;

const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //storing user id from mongoDB to fetch notes related to that user id.Basically we want objectid from mongoose db
        ref:'user'
    },
    "title":{
        type:String,
        required:true
    },
    "description":{
        type:String,
        required:true,
    },
  
    "tag":{
        type:String,
        default: "General"
        },
    "date":{
        type:Date,  
        default:Date.now
                },
  });

const Notes = mongoose.model("Notes",notesSchema);
export default Notes;