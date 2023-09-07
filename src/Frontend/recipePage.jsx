import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';


export default function RecipePage() {

  // const dispatch = useDispatch();
  // const recipe = useSelector(state => state.recipe);
  // const comment = useSelector(state => state.comment);
  // const id = 1

  // const fetchRatings = async (id) => {
  //   try{
  //     const {data} = await axios.get(`/api/ratings/${id}`);
  //     dispatch({ type: 'SET_MESSAGE', payload: 'Recipe has been gathered' });
  //   } catch (error) {
  //     dispatch({ type: 'SET_MESSAGE', payload: error });
  //   }
  // }

  // const fetchRecipe = async (id) => {
  //   try {
  //     const { data } = await axios.get(`/api/recipes/${id}`);
  //     dispatch({ type: 'SET_MESSAGE', payload: 'Recipe has been gathered' });
  //   } catch (error) {
  //     dispatch({ type: 'SET_MESSAGE', payload: error });
  //   }
  // };

  const {
    recipes: { title, images, steps, ingredients }, 
    } = useLoaderData()
    

  // if (!recipes) {
  //   return <p>Loading...</p>;
  // } else {
     return (
      <div>
        <h1>{title}</h1>
        <img src={images} />
        <p>{steps}</p>
        <p>{ingredients}</p>
      </div>
    );
     }
 // }
