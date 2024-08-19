import React, { useContext, useState } from 'react'
import NoteContext from '../context/smallnotes/noteContext';


const UpdateUserNote = () => {
    const fetchNotes = useContext(NoteContext);
    const { editNote } = fetchNotes;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: " "}); // initial note value
  
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div className='editNote' style={{color:"black"}}>
    <h1>Add a new note</h1>
    <form>
        <div className="form-group">
            <label htmlFor="etitle">Edit Title</label>
            <input type="text" className="form-control" id="etitle" name='etitle' placeholder="title" value={note.etitle} onChange={onChange}/>
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
  )
}

export default UpdateUserNote
