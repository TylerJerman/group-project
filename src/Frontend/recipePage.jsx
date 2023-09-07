import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';


export default function RecipePage() {

  const {
    recipes: { title, images, steps, ingredients }, 
    } = useLoaderData()
    
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
