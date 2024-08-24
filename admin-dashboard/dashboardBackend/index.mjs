import {MongoClient, ServerApiVersion} from 'mongodb'
import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
const port = 5001;
const ChattingURI= "mongodb+srv://rajvanshikshitij:Hitman@007@clusterchat.s0fr0.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCHAT/"
const ThreadsURI= "/Threads"
const  Users_URI = "mongodb://127.0.0.1:27017/Users";
const client = new MongoClient(ChattingURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
const multiConnection =()=>{
    // const ChattingDB=  mongoose.createConnection(ChattingURI, {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true
    // })
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
console.log(multiConnection()," is connected")
// axios.use()
app.listen(port,()=>{
    console.log(`Dashboard backend is running on http://localhost:${port}`)})
    console.log("Test server is still running with cors enables on ", port )
    export default multiConnection