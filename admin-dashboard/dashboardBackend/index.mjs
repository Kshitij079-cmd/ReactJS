import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
const port = 5001;

const ThreadsURI= "mongodb://127.0.0.1:27017/Threads"
const  Users_URI = "mongodb://127.0.0.1:27017/Users"
const multiConnection =()=>{
    const ThreadsDB=  mongoose.createConnection(ThreadsURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    const UserDB= mongoose.createConnection(Users_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    return { ThreadsDB, UserDB };
}

let app = express()
app.use(cors());
app.use(express.json());

// axios.use()
app.listen(port,()=>{
    console.log(`Dashboard backend is running on http://localhost:${port}`)})
    console.log("Test server is still running with cors enables on ", port )
    export default multiConnection