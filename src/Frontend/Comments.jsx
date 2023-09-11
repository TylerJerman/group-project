import React from 'react';
import AddComment from './commentsFolder/AddComment.jsx'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Comments({comments, commentId}) {

  const userName1 = useSelector((state) => state.userName)
  const navigate = useNavigate()


  const deleteComment = async (commentId, recipeId) => {
    const info = {commentId: commentId}

    const {data} = await axios.post('/api/deleteComment', info)
    
    navigate(`/recipes/${recipeId}`)
  }

  const commentSection = comments.map(({ commentId, userName, message, recipeId }) => {

    if (userName === userName1) {
      return (
        <div key={commentId}>
          <p>{userName}: {message}</p>
          <div>
            <button onClick={() => deleteComment(commentId, recipeId)}>Delete</button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div key={commentId}>
          <p>{userName}: {message}</p>
        </div>
      )
    }


});

  const commentSection = comments.map(({ commentId, userId, userName, message }) => (
    <div key={commentId}>
       
    <p><Link to={`/users/${userId}`}>{userName}</Link>: {message}</p>
  </div>
  ));

  return (
    <>
    { userName1 &&
      <>
        <AddComment/> 
        {commentSection}
      </>
    }
    </>
  )
};