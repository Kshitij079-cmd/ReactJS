import mongoose  from "mongoose";
import authRouter from './routes/userAuth.js'; // Import the router
// import auth_with_OTP_router from "./routes/auth.js" //THIS IS A DUPLICATE FILE
import notesRouter from './routes/notes.js'; // Import the router
import postsRouter from "./routes/posts.js"
import express from 'express';
import cors from 'cors';
const port = 5001;
let connection =  mongoose.connect("mongodb://127.0.0.1:27017/reactappdemo")//connecting to reactappdemo database in db
console.log(`connection made to ${connection}`);
let app = express()
app.use(cors());

//available routes m
app.use(express.json());      //we use app.use to use req.body and handle an api fetched, send to mongoDB / //suppose creating a user, getting login user info. This will parse api to database in form of JSON
//api handles users(our) request to other program and other program's request handles by apis.
// api handles clients request generated from by client from frontend requesting a specific data from server, which fetched and exposed to backend (endpoints where process to provide requested data exists)
//api handles server request generated from backend to other program, which fetched and exposed to backend (end     

app.use('/', /*making the path to the file/middle ware*/
              authRouter)//using app to authenticate the user , 
app.use('/', notesRouter)
app.use("/", postsRouter)
// app.use('/', auth_with_OTP_router)

app.listen(port,()=>{
  console.log(`iNotebook backend is running on http://localhost:${port}`)})
  console.log("server is still running with cors enables" )
  


 