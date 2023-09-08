import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Comments from './Comments.jsx';
import DeleteBtn from './Components/deleteRecipeBtn.jsx';
import axios from 'axios';


export default function RecipePage() {
  const navigate = useNavigate()
  const {recipe, comments} = useLoaderData();
  const {recipeId, title, images, steps, ingredients} = recipe

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/api/delete-recipe/recipes/${recipeId}`);
   
      navigate('/');
    
  };

    
  return (
    <div>
      <h1>{title}</h1>
      <img src={images} />
      <p>{steps}</p>
      <p>{ingredients}</p>
      <Comments comments={comments} recipeId={recipeId} />
      <DeleteBtn onDelete={handleDelete} />
    </div>
  );
}