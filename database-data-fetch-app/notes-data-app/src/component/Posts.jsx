import React, { useContext, useEffect } from 'react'
import PostContext from '../context/smallnotes/PostContext'
import PostLists from './PostLists'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
    const navigate = useNavigate()
    const context = useContext(PostContext)
    const { posts, getPost } = context
    useEffect(()=>{
        getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleClickevent=()=>{
        if(localStorage.getItem("token")){
            navigate('/createpost')
        }
        else{
            alert("Please login to create a post")
            navigate('/login')
        }
    }
    return (
    <div>
        <h1>Posts</h1>
        <div className='create-new-post' onClick={handleClickevent}>
           <h2> Create New Post</h2></div>
     {posts.length===0?(<p>No Posts</p>)
     :
     (posts&&
        posts.map((post) =>(<>
     <PostLists key={post._id} post={post} />
     </>))
     )}
    </div>
  )
}

export default Posts
