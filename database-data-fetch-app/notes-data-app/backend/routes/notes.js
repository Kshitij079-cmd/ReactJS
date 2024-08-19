import fetchuser from "../middleware/fetchuser.mjs";
import express from "express";
import Notes from "../modules/Notes.mjs";
import { body, validationResult } from "express-validator";
import { deleteModel } from "mongoose";

// const express = (await import('express')).default
const router = express.Router();
//Route 1: Get all the notes of logged in user using: GET "/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id }); //have to fetch notes in described structures from users request id, it will all notes created by user
    res.json(notes);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Unable to fetch!!" });
    }
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//Route2: addiing a new note from same userid by using : POST  "/addNotes"
router.post(
  "/addNotes",
  fetchuser,
  [
    body("title", "Enter title").isLength({ min: 8 }).notEmpty(),
    body("description", "Enter note description").isLength({ min: 8 }).notEmpty(),
  ],
  async (req, res) => {
    console.log("entered in Route to add new note");
    const { title, description, tag } = req.body;
    const result = validationResult(req); // express validator has been used to avoid empty response,
    //if there are errors, return bad request
    if (!result.isEmpty()) {
      console.log("Validation errors:", result.array());
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const addingNote = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await addingNote.save();
      res.json(saveNote);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Unable to add notes this moment, try again later" });
      }
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 3: Updates a Note posted by a logged in user using "/updateNotes", Login required
router.put(
  //we use put request to update any api data in  database
  "/updateNotes/:id",
  fetchuser,
  // [
  //   body("title", "Enter title").isLength({ min: 8 }).notEmpty(),
  //   body("description", "Enter note description").isLength({ min: 8 }).notEmpty(),
  // ],
  async (req, res) => {
    console.log("entered in Route to update note");
    const { title, description, tag } = req.body;

    try {
      //create new Note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      //find the note to be updated and update it
      let note = await Notes.findOne({ _id: req.params.id }); // thrown request on id  for eg :"6685b3123ba2433f0048e39b"  t
      if (!note) {
        return res.status(404).send("Note not found");
      }
      if (note.user.toString() !== req.user.id) {
        //if any note doesnot found on user id
        return res.status(401).send("Not allowed to update"); //unauthorise error
      }
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); //Find note on id and update
      res.json({ note });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Unable to add notes this moment, try again later" });
      }
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 4: Deletes a Note posted by a logged in user using "/deleteNote", Login required
router.delete(
  //we use delete request to delete any api data in  database
  "/deleteNote/:id", // want id number from mondoDB on which note exists
  fetchuser,
  async (req, res) => {
    try {
      let deleteNote = await Notes.findById({ _id: req.params.id });
      if (!deleteNote) {
        return res.status(404).send("Note not found");
      }
      if (deleteNote.user.toString() !== req.user.id) {
        //if any note doesnot found on user id
        return res.status(401).send("Not allowed to delete"); //unauthorise error
      }
      deleteNote = await Notes.findByIdAndDelete({ _id: req.params.id });
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
export default router;
