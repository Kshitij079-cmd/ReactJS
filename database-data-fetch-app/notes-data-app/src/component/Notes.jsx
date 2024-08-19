/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/smallnotes/noteContext.jsx";
import AlertContext from "../context/smallnotes/AlertContext.jsx";
import NoteItem from "./noteItem.jsx";
import Addnote from "./Addnote.jsx";
import { useNavigate } from "react-router-dom";

const NotesComponent = () => {
    const fetchNotes = useContext(NoteContext);
    const { notes, getNotes, addNote, deleteNote, editNote } = fetchNotes; //getting all functions which are defined in noteContext
    const navigate = useNavigate();
    const alertMsg = useContext(AlertContext)
    const{showAlert}=alertMsg
    const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: " "}); // initial note value.//editing existing note
    useEffect(() => {
        // getNotes(); // fetching notes from server
        if(localStorage.getItem('token')){
            console.log("check done for token")
            console.log(
                "useEffect: token found in local storage",localStorage.getItem('token')
            )
            showAlert("!!! Logged in successfuly", "success")
            navigate("/")
            getNotes();
        }
        else{
            navigate("/login")
            console.log("Login to access Notes");
    
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        console.log("update note modal triggered")
        if (ref.current) {
            ref.current.click()
            setNote({   
                id: currentNote._id,
                etitle:currentNote.title,
                edescription:currentNote.description,
                etag:currentNote.tag
            })
        } else {
            console.error("Ref is not assigned to the button.");
        }
    };
    const handleClick = (e) => {
        console.log("updating note", note)
      editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        showAlert("Updated Note Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote />
            <button
                ref={ref}
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ display: "none" }}
            >
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={true}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ color: "black" }}>
                            <h5 className="modal-title" id="exampleModalLabel" >Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='editNote' style={{ color: "black" }}>
                                <h1>Add a new note</h1>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="etitle">Edit Title</label>
                                        <input type="text" className="form-control" id="etitle" name='etitle' placeholder="title" value={note.etitle} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edescription">Edit Descripttion</label>
                                        <textarea className="form-control" id="edescription" name="edescription" rows="3" value={note.edescription} onChange={onChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="etag">Edit Tag</label>
                                        <textarea className="form-control" id="etag" name="etag" rows="3" value={note.etag} onChange={onChange}></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button"  ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={handleClick} >Edit note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* Conditional rendering based on 'notes' array */}
                {notes.length === 0 ? (
                    <p>No notes to display.</p>
                ) : (notes&&
                    notes.map((note) => (
                        <NoteItem key={note._id} note={note} updateNote={updateNote} deleteNote={deleteNote} />
                    ))
                )}
            </div>
        </>

    )
}

export default NotesComponent
