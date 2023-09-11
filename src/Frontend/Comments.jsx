import React from 'react';
import AddComment from './commentsFolder/AddComment.jsx'
import { Link } from 'react-router-dom';

export default function Comments({comments, recipeId}) {

  const commentSection = comments.map(({ commentId, userId, userName, message }) => (
    <div key={commentId}>
       
    <p><Link to={`/users/${userId}`}>{userName}</Link>: {message}</p>
  </div>
  ));

  return (
    <>
      <AddComment/> 
      {commentSection}
    </>
  )
};