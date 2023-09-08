import { Link } from 'react-router-dom';

export default function Comments({comments, recipeId}) {


  const commentSection = comments.map(({ commentId, userName, message }) => (
    <li key={recipeId}>
  <p>{userName}{message}</p>
  </li>
  ));

  return commentSection
};