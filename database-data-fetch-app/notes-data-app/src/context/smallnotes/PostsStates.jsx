import React, { useContext, useState } from 'react'
import PostContext from './PostContext'
import { useParams } from 'react-router-dom';

const PostsStates = (props) => {
  const host = "http://localhost:5001/";
  const { id } = useParams()
  const PostsApi = [];
  const [posts, setPost] = useState(PostsApi)
  const context = useContext(PostContext);
  console.log("we have posts here", posts)
  const getPost = async () => {
    // const token = localStorage.getItem('token');// error occuring because it was not calling the token
    const rawResponse = await fetch(`${host}fetchPosts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': token
      }
    });
    console.log("fetched Post from database", rawResponse)
    if (!rawResponse) {
      console.log("failed to fetch")
    }
    const response = await rawResponse.json();
    setPost(response)
    //   showAlert("Fetched note from database", 'success'); 
  }
  const createPost = async (title, description) => {
    const token = localStorage.getItem('token');
    //api call
    console.log(" checking the token", token)
    if (!token) {
      console.error('Token not found');
      return;
    }
    const rawResponse = await fetch(`${host}createPost/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({
        title, description
      })
    });
    const content = await rawResponse.json();
    console.log(content)
    setPost((prevPost) => {
      return [...prevPost, content];
    });
    if (setPost()) {
      alert('Postadded successfully', 'success');
    }
    else {
      alert('Error adding post', 'error');
    }

    console.log(content);
    setPost(posts.concat(content)) //adds an array in existing array
  }

  return (
    <div>
      <PostContext.Provider value={{ posts, getPost, createPost }}>{props.children}</PostContext.Provider>
    </div>
  )
}


export default PostsStates
