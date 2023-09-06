import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function RecipePage() {
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.recipe);
  const comment = useSelector(state => state.comment);
  const id = 1
  const fetchRecipe = (id) => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/recipes/${id}`);
      dispatch({ type: 'SET_MESSAGE', payload: 'Recipe has been gathered' });
    } catch (error) {
      dispatch({ type: 'SET_MESSAGE', payload: error });
    }
  };

  if (!recipe) {
    return <p>Loading...</p>;
  } else {
     return (
      <div>
        <h1>{fetchRecipe}</h1>
        <h1>{recipe.userName}</h1>
        <img src={recipe.images} alt={recipe.userName} />
        <p>{recipe.recipe}</p>
      </div>
    );
  }
}