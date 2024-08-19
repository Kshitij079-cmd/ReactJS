import React, { useState } from "react";
import NoteContext from "./noteContext.jsx";
import AlertContext from "./AlertContext.jsx";
function NoteState(props) {
  const host = "http://localhost:5001/"; 
  const ApiNotes = [];
  const [notes, setNotes] = React.useState(ApiNotes)
  const [alert, showAlert] = React.useState({ show: false, message: "", type
    : "" });
  console.log("will use useState", useState)

    //get all notes
    const getNotes = async () => {
  const token = localStorage.getItem('token');// error occuring because it was not calling the token
      //calling api to fetch notes from database
      const rawResponse = await fetch(`${host}fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      console.log("fetched notes from database", rawResponse)
      const response = await rawResponse.json();
      setNotes(response)
      showAlert("Fetched note from database", 'success'); 
    }
 
  //add a note
  const addNote = async (title, description, tag) => {
  const token = localStorage.getItem('token');

    //api call
    console.log(" checking the token",token)
    if (!token) {
      console.error('Token not found');
      return;
  }
    const rawResponse = await fetch(`${host}addNotes/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({ 
        title, description, tag })
    });
    const content = await rawResponse.json();
    console.log(content)
    setNotes((prevNotes) => {
      return [...prevNotes, content];
      });
      if(setNotes()){
        showAlert('Note added successfully', 'success'); 
      }
      else{
        showAlert('Error adding note', 'error');
      }
     
    console.log(content);
    setNotes(notes.concat(content)) //adds an array in existing array
  }
  //delete a note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const rawResponse = await fetch(`${host}deleteNote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
  
      if (!rawResponse.ok) {
        throw new Error('Failed to delete note');
        // showAlert("Failed to delete note ", "error")
      }
  
      const response = await rawResponse.json();
      console.log(response);
  
      // Logic to delete note from the frontend
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
  
      setNotes(newNotes);
      showAlert("Note has been deleted", "success");
    } catch (error) {
      console.error('Error deleting note:', error);
      showAlert("An error occurred while deleting the note", "error");
    }
  }
  
  //edit a note
  const editNote = async (id, title, description, tag) => {
    
    //API call
    try {
      const token = localStorage.getItem('token');
    const rawResponse = await fetch(`${host}updateNotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({ title, description, tag })
    });
    const content = await rawResponse.json();
    if (!content) {
      console.error("failed to update", content)
      showAlert("Failed to update","danger")
    }
    else {
      showAlert("updated notes sucessfully", "success")
    }
    //logic to edit in client side
    const newNotes = notes.map(note => {
      if (note._id === id) { // Match the note by ID
        return { ...note, title, description, tag }; // Update the note's content
      }
      return note;
    });
    setNotes(newNotes)
    // console.log("what is happening over here",getNotes());
  }catch(error){
    console.error('Error editing note:', error);
    showAlert("An error occurred while editing the note", "error");
  }
  }
  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>{props.children}</NoteContext.Provider>
  )

};
export default NoteState;
