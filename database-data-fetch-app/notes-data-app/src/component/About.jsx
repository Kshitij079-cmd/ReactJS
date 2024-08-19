import React, { useContext, useEffect }  from 'react'
import NoteContext from '../context/smallnotes/noteContext.jsx'

const About = () => {
  // const a = useContext(NoteContext)
  // useEffect(()=>{
  //   a.update();
  // }, [a])
  return (
    <div>
      <header className="App-header">
        {/* <h1>Note; <br/> title: {a.notes.title} and<br/>description:  {a.notes.description}</h1> */}
        <h1>This is about page</h1>
      </header>
    </div>
  )
}

export default About
