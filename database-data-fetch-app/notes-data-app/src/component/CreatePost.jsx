import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const [value, setValue] = useState('');
    return (
        <div className='container'>
            Create your Post Here
            <form>
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter your title" />
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput2">Another label</label>
                    <ReactQuill className="text-editor" editorState={value} onChange={setValue} />
                </div>
                <button type="submit" className="btn btn-primary">Post</button>
            </form>
        </div>
    )
}

export default CreatePost
