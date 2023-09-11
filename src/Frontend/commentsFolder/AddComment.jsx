import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditComment from './EditComment.jsx'

export default function AddComment({ onAddComment }) {
  const [comment, setComment] = useState('');

  const userName = useSelector((state) => state.userName)

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddComment(comment);
    setComment('');
  };

  return (
    <>
    <p>Test</p>
    { userName && 
      <div onSubmit={handleSubmit}>
        <label>
          Add comment:
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        <EditComment/>
      </div>
    }
    </>
  );
}

{/* <button onClick={addComment.bind(recipeId, userName)}>
      <input type="text"></input>Add Comment</button> */}