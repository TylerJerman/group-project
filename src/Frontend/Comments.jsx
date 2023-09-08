import { Link } from 'react-router-dom';

export default function Comments({comments, recipeId}) {


  const commentSection = comments.map(({ commentId, userName, message }) => (
    <div key={recipeId}>
  <p>{userName}: {message}</p>
  </div>
  ));

  return commentSection
};