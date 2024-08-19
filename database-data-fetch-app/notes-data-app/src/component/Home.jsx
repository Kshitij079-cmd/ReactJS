import React from "react";
import NoteContext from "../context/smallnotes/noteContext";
import NotesComponent from "./Notes";

const Home = () => {

  return (
    <div>
      <h1>This is iNotebook - your notes are secured in the cloud </h1> 
       <NotesComponent/>
       <br /><p>Note:- /the Front end and are backend are connected with the help of npm concurrently\</p>
    </div>
  );
};

export default Home;
