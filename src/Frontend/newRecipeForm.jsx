import { useState } from 'react';
import { useSelector } from 'react-redux';


export default function RecipeForm({ onNewRecipe }) {
  
  const [titleValue, setTitleValue] = useState('')
  const [stepsValue, setStepsValue] = useState('');
  const [ingredientsValue, setIngredientsValue] = useState('');
  const [imageValue, setImageValue] = useState('');

  const userName = useSelector((state) => state.userName)

  // location name bio certification

  return (
    <form
      onSubmit={(e) => {
        onNewRecipe(e, {
          name: userName,
          title: titleValue,
          steps: stepsValue,
          ingredients: ingredientsValue,
          image: imageValue
        });
      }}
    >
      
        <label htmlFor="title">recipe title: </label>
        <input
          name="title"
          id="title"
          type="text"
          required
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <label htmlFor="steps"> steps: </label>
        <textarea
          className='steps'
          name="steps"
          id="steps"
          type="text"
          required
          onChange={(e) => setStepsValue(e.target.value)}
        />
      
      
        <label htmlFor="ingredients"> ingredients: </label>
        <textarea
          className='steps'
          name="ingredients"
          id="ingredients"
          type="text"
          required
          onChange={(e) => setIngredientsValue(e.target.value)}
        />
        <label htmlFor="image"> image URL: </label>
        <input
          name="image"
          id="image"
          type="text"
          required
          onChange={(e) => setImageValue(e.target.value)}
        />
      
      <button type="submit">create recipe</button>
    </form>
  );
}