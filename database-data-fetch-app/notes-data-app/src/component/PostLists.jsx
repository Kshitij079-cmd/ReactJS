import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PostLists = (props) => {
    const navigate = useNavigate()
    // const {id} = useParams()
    const { post } = props

    return (

        <div>
            <div className="jumbotron">
                <h2 className="display-4 title">{post.title}</h2>
                <p className='description'>{post.description}</p>
                <div className="date">{post.date}</div>
                <a className="btn btn-primary btn-lg mt-3" href="/" role="button">Learn more</a>
            </div>
     
        </div>
    )
}

export default PostLists
