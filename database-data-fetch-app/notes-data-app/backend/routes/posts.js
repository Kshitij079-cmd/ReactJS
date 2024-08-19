import fetchuser from "../middleware/fetchuser.mjs";
import express from "express";
import PostSchema from "../modules/PostSchema.mjs"
import { body, validationResult } from "express-validator";

const router = express.Router();
// Route 1: fetch post from database
router.get(
    "/fetchPosts",
    //  fetchuser, //WE HAVE NOT USED FETCH USER HERE TO SHOW ALL ARTICLES TO NEW USERS WHO VISITS OUR WEBSITE
      async (req, res) => {
    try {
      // const post = await PostSchema.find({visibility: "public"}); //have to fetch notes in described structures from users request id, it will all notes created by user
      const post = await PostSchema.find().populate(); //have to fetch notes in described structures from users request id, it will all notes created by user
      res.json(post);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Unable to fetch!!" });
      }
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  // Route 2: create post
  router.post(
    "/createPost",
    fetchuser,
    [
      body("title", "Enter the headiing").isLength({ min: 12 }).notEmpty(),
      body("description", "brief about you concern").isLength({ min: 12 }).notEmpty(),
    ],
    async (req, res) => {
      console.log("entered in Route to add new note");
      const { title, description} = req.body;
      const result = validationResult(req); // express validator has been used to avoid empty response,
      //if there are errors, return bad request
      if (!result.isEmpty()) {
        console.log("Validation errors:", result.array());
        return res.status(400).json({ errors: result.array() });
      }
      try {
        const addingPost = new PostSchema({
          title,
          description,
          user: req.user.id,
        });
        const savePost = await addingPost.save();
        res.json(savePost);
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ error: "Unable to Create your Post, try again later" });
        }
        console.error(error);
        res.status(500).send("Internal server error");
      }
    }
  );
  // Route 3: update post
  router.put(
    //we use put request to update any api data in  database
    "/updatePost/:id",
    fetchuser,
    async (req, res) => {
      console.log("entered in Route to update note");
      const { title, description } = req.body;
  
      try {
        //create new Note object
        const newPost = {};
        if (title) {
         newPost.title = title;
        }
        if (description) {
         newPost.description = description;
        }
     
       //find the post to update id
        let post = await PostSchema.findOne({ _id: req.params.id }); // thrown request on id  for eg :"6685b3123ba2433f0048e39b"  t
        if (!post) {
          return res.status(404).send("Note not found");
        }
        if (post.user.toString() !== req.user.id) {
          //if any post doesnot found on user id
          return res.status(401).send("Not allowed to update"); //unauthorise error
        }
        post = await PostSchema.findByIdAndUpdate(req.params.id, { $set: newPost }, { new: true }); //Find post on id and update
        res.json({ post });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ error: "Unable to add notes this moment, try again later" });
        }
        console.error(error);
        res.status(500).send("Internal server error");
      }
    }
  );
  // Route 4: delete post
  router.delete(
        //we use delete request to delete any api data in  database
        "/deletePost/:id", // want id number from mondoDB on which note exists
        fetchuser,
        async (req, res) => {
          try {
            let deletePost = await PostSchema.findById({ _id: req.params.id });
            if (!deletePost) {
              return res.status(404).send("Note not found");
            }
            if (deletePost.user.toString() !== req.user.id) {
              //if any note doesnot found on user id
              return res.status(401).send("Not allowed to delete"); //unauthorise error
            }
            deletePost = await PostSchema.findByIdAndDelete({ _id: req.params.id });
            console.log(`Note on ${req.params.id} has been deleted`);
            res.json({ success: "not have been deleted" });
          } catch (error) {
            if (error.code === 11000) {
              return res.status(400).json({ error: "Unable to add notes this moment, try again later" });
            }
            console.error(error);
            res.status(500).send("Internal server error");
          }
        }
      );
       export default router


