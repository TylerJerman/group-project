import { useState } from 'react';


export default function RecipeForm({ onNewRecipe }) {
  const [nameValue, setNameValue] = useState('');
  const [titleValue, setTitleValue] = useState('')
  const [stepsValue, setStepsValue] = useState('');
  const [ingredientsValue, setIngredientsValue] = useState('');
  const [imageValue, setImageValue] = useState('');

  // location name bio certification

  return (
    <form
      onSubmit={(e) => {
        onNewRecipe(e, {
          name: nameValue,
          title: titleValue,
          steps: stepsValue,
          ingredients: ingredientsValue,
          image: imageValue
        });
      }}
    >
      <label htmlFor="name">first name:</label>
      <input
        name="name"
        id="name"
        type="text"
        required
        onChange={(e) => setNameValue(e.target.value)}
      />
      <label htmlFor="title">recipe title:</label>
      <input
        name="title"
        id="title"
        type="text"
        required
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <label htmlFor="steps">steps:</label>
      <input
        name="steps"
        id="steps"
        type="text"
        required
        onChange={(e) => setStepsValue(e.target.value)}
      />
      <label htmlFor="ingredients">ingredients:</label>
      <input
        name="ingredients"
        id="ingredients"
        type="text"
        required
        onChange={(e) => setIngredientsValue(e.target.value)}
      />
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