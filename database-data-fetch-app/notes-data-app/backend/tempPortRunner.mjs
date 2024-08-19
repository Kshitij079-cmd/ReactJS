import mongoose  from "mongoose";
import auth_with_OTP_router from "./routes/auth.js"
import express from 'express';
import cors from 'cors';
import axios from "axios";
const port = 5005;
let connection =  mongoose.connect("mongodb://127.0.0.1:27017/reactappdemo")//connecting to reactappdemo database in db
const react_URI = "mongodb://127.0.0.1:27017/reactappdemo"
const  test_URI = "mongodb://127.0.0.1:27017/test"
const multiConnection =()=>{
    const reactappConnection =  mongoose.createConnection(react_URI)
    const testConnection = mongoose.createConnection(test_URI)
    return { reactappConnection, testConnection };
}
console.log(`connection made to ${connection}`);
let app = express()
app.use(cors());
const connections = multiConnection();
//using axios
console.log("connected to databases",connections)
//available routes m
app.use(express.json());

app.use('/', auth_with_OTP_router)
// axios.use()
app.listen(port,()=>{
    console.log(`iNotebook backend is running on http://localhost:${port}`)})
    console.log("Test server is still running with cors enables on ", port )
    export default multiConnection