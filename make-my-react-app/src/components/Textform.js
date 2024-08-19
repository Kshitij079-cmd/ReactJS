import React, { useState } from "react";

export default function Textform(props) {
  const handleClick = () => {
    let newText = text.toUpperCase();
    if (newText === "") {
      props.showAlert("Enter some text to convert", "warning");
    } else {
      setText(newText);
      props.showAlert("Converted to uppercase", "success");
    }
  };

  const handleChanges = (e) => {
    setText(e.target.value);
  };

  const clearText = (e) => {
    setText("");
    props.showAlert("Text area is clean now", "success")
  };

  const copyToClipboard = async () => {
    if (text.trim() === "") {
      props.showAlert("No Text to copy", "warning")
    } else {
      try {
        await navigator.clipboard.writeText(text);
        console.log(text);
        props.showAlert("Copied to clipboard", "success");
      } catch (err) {
        props.showAlert("Unable to copy to clipboard", "danger");
      }
    }
  };

  const [text, setText] = useState("Clear texts and Enter new text here");

  return (
    <div className="container">
      <h1>{props.heading}</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          value={text}
          onChange={handleChanges}
          
          rows="3"
          style={{
            backgroundColor: props.defaultTheme === "dark" ? "#223140" : "#fff",
            color: props.defaultTheme === "dark" ? "#ffffff" : "#212529",
          }}
        >Hello</textarea>
      </div>
      <button disabled={text.length===0} className="btn btn-primary mx-2" onClick={handleClick}>
        Convert to uppercase
      </button>
      <button className="btn btn-primary mx-2" onClick={clearText}>
        Clear Text
      </button>
      <button disabled={text.length===0} className="btn btn-primary mx-2" onClick={copyToClipboard}>
        Copy to clipboard
      </button>
      <div className="container my-3">
        <p>
          {text.split(/\s+/).filter(word => word.length > 0).length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").filter(word => word.length > 0).length} minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to preview"}</p>
      </div>
    </div>
  );
}
