import mongoose,{Schema}  from "mongoose";//helps to comunicate between database and node.js

//users info structure, destructuring of user  what a user required to create its id
// i will add role field here, later
const userSchema = new Schema({
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
//   export default userSchema
const User = mongoose.model("User",userSchema);

export default User;

