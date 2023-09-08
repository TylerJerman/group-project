import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Comments from './Comments.jsx';


export default function RecipePage() {

  const {recipe, comments} = useLoaderData();
  const {recipeId, title, images, steps, ingredients} = recipe
    
  return (
    <div>
      <h1>{title}</h1>
      <img src={images} />
      <p>{steps}</p>
      <p>{ingredients}</p>
      <Comments comments={comments} recipeId={recipeId} />
    </div>
  );
}