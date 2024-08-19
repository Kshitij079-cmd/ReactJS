import React, { useContext, useState } from 'react'
import NoteContext from '../context/smallnotes/noteContext';
import AlertContext from '../context/smallnotes/AlertContext';
const Addnote = () => {
    const fetchNotes = useContext(NoteContext);
    const alert = useContext(AlertContext);

    const { addNote } = fetchNotes;
    const{showAlert} = alert
    const [note, setNote] = useState({ title: "", description: "", tag: " default"}); // initial note value
    const handleClick = (e)=>{
        e.preventDefault();
        const { title, description, tag } = note;
        addNote(title, description, tag); 
            setNote({title: "", description: "", tag: " "})
           showAlert("!!! Note Added Successfully", "success");

    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div className='addnote' >
            <h1>Add a new note</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Add Title</label>
                    <input type="text" className="form-control" id="title" name='title' placeholder="title" value={note.title} onChange={onChange}minLength={5}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Add Descripttion</label>
                    <textarea className="form-control" id="description" name="description" value={note.description} rows="3" onChange={onChange}minLength={5}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Add Tag</label>
                    <textarea className="form-control" id="tag" name="tag" value={note.tag} rows="3" onChange={onChange}></textarea>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary mt-2" onClick={handleClick}>Add</button>
            </form>
        </div>



    )
}

export default Addnote
