/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext }  from 'react'
import NoteContext from '../context/smallnotes/noteContext';
import AlertContext from '../context/smallnotes/AlertContext';
const noteItem = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const noteContext = useContext(NoteContext)
    const alertContext = useContext(AlertContext)
    if (!noteContext) {
        // Handle potential missing context error (optional)
        throw new Error('NoteContext not provided');
      }
      const {  deleteNote } = noteContext;// using the function here
      const { showAlert } = alertContext; 
      const { note, updateNote } = props;
    return (
            <div className=" col-md-4 cards" >
                <div className="card my-3  ">
                    <div className="card-body" style={{ color: "black" }}>
                        <h4 className="card-title"><b>{note.title}</b></h4>
                        <p className="card-text">
                            {note.description}
                        </p>
                        <p className="card-text">
                            Tag: {note.tag}
                        </p>
                        <i className="fa-regular fa-trash-can me-3" onClick={()=>{deleteNote(note._id)
                            showAlert("Note deleted successfully", "success")
                        }}></i>
                        <i className="fa-regular fa-pen-to-square me-3"onClick={()=>{updateNote(note)
                            ;}} style={{ cursor: 'pointer' }}>   
                        </i>
                    </div>
                </div>
            </div>
    
    )
}

export default noteItem;
