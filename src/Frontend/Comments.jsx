import React from 'react';
import AddComment from './commentsFolder/AddComment.jsx'

export default function Comments({comments, recipeId}) {

  const commentSection = comments.map(({ commentId, userName, message }) => (
    <div key={commentId}>
    <p>{userName}: {message}</p>
  </div>
  ));

  return (
    <>
      <AddComment/> 
      {commentSection}
    </>
  )
};