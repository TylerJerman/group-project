import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function AddComment() {
  const [comment, setComment] = useState('');

  const userName = useSelector((state) => state.userName)
  const recipeId = useSelector((state) => state.recipeId)
  const userId = useSelector((state) => state.userId)

  const [commentErr, setCommentErr] = useState('')

  const navigate = useNavigate()

  const addComment = async () =>
  {
    if (comment !== '')
    {
      const info = {message: comment, userName: userName, recipeId: recipeId, userId: userId}
  
      console.log(recipeId)
  
      const {data} = await axios.post('/api/newComment', info)
  
      console.log(data)
  
      navigate('/recipes/' + recipeId)
    }
    else
    {
      setCommentErr('Cannot Submit Empty Comment')
    }
  }



  return (
    <form
      onSubmit={(e) => {e.preventDefault()
          addComment()
      }}
    >
      <div className="input-container">
        <label htmlFor="comment"> Comment: </label>
        <input 
        name="comment" 
        id="comment" 
        type="text" 
        onChange={(e) => setComment(e.target.value.trim())} />
        </div>
      <button type="submit" > Submit </button>
      { commentErr.length > 1 &&
        <h2>Cannot Submit Empty Comment</h2>
      }
    </form>
  );
}

  // <button onClick={addComment.bind(recipeId, userName)}>
  //       <input type="text"></input>Add Comment</button>