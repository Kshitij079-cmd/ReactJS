import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Home';
import Navbar from './component/Navbar';
import About from './component/About';
import Contact from './component/Contact';
import NoteState from './context/smallnotes/NotesState';
import AlertState from './context/smallnotes/AlertState';
import Alert from './component/Alert';
import { useState } from 'react';
import Login from './component/Login';
import Signup from './component/signup';
import Footer from './component/Footer';
import Posts from './component/Posts';
import PostsStates from './context/smallnotes/PostsStates';
import CreatePost from './component/CreatePost';

function App() {
  
  const routes = createBrowserRouter([
    {
      path: "/",
      element:(<>
      <Navbar/> 
      <Alert/>
      <div className="container">
         <Home />
      </div>
      <Footer/>
      </>
        ),
      },
      {
        path: "/About",
        element: (<>
          <Navbar/>
          <Alert/>
          <div className="container">
             <About />
          </div>
      <Footer/>
          </>
            ),
        },
      {
        path: "/Contact",
        element: (<>
          <Navbar/>
           <Alert/>
          <div className="container">
             <Contact />
          </div>
      <Footer/>
          </>
            ),
        },
      {
        path: "/Posts",
        element: (<>
          <Navbar/>
           <Alert/>
          <div className="container">
          <PostsStates>
             <Posts />
             </PostsStates>
          </div>
      <Footer/>
          </>
            ),
        },
      {
        path: "/login",
        element: (<>
          <Navbar/>
           <Alert />
             <Login />
      <Footer/>
          </>
            ),
        },
      {
        path: "/signup",
        element: (<>
          <Navbar/>
           <Alert/>
             <Signup />
      <Footer/>
          </>
            ),
        },
      {
        path: "/CreatePost",
        element: (<>
          <Navbar/>
           <Alert/>
          <div className="">
             <CreatePost />
          </div>
      <Footer/>
          </>
            ),
        },
        
        ]);
  return (

    <div className="App"> 
    <AlertState>
    <NoteState>
    <RouterProvider router={routes} />
    </NoteState>
    </AlertState>
    </div>
 
  );
}

export default App;
