import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function RecipePage() {

  const dispatch = useDispatch();
  const recipe = useSelector(state => state.recipe);
  const comment = useSelector(state => state.comment);
  const id = 1

  const fetchRatings = async (id) => {
    try{
      const {data} = await axios.get(`/api/ratings/${id}`);
      dispatch({ type: 'SET_MESSAGE', payload: 'Recipe has been gathered' });
    } catch (error) {
      dispatch({ type: 'SET_MESSAGE', payload: error });
    }
  }

  const fetchRecipe = async (id) => {
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
        <h5>{fetchRatings}</h5>
        <h1>{recipe.userName}</h1>
        <img src={recipe.images} alt={recipe.userName} />
        <p>{recipe.recipe}</p>
        <p>{fetchComments}</p>
      </div>
    );
  }
}