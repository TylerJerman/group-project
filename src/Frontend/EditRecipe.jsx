

import { useState } from 'react';

export default function EditForm({ onEdit }) {
  const [titleValue, setTitleValue] = useState('');
  const [stepsValue, setStepsValue] = useState('');
  const [ingredientsValue, setIngredientsValue] = useState('');
  const [imagesValue, setImagesValue] = useState('');

  

  return (
    <form
      onSubmit={(e) => {
        onEdit(e, {
          title: titleValue,
          steps: stepsValue,
          ingredients: ingredientsValue,
          images: imagesValue,
        });
      }}
    >
      <label htmlFor="title">title:</label>
      <input
        name="title"
        id="title"
        type="text"
        
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <label htmlFor="steps">steps:</label>
      <input
        name="steps"
        id="steps"
        type="text"
        
        onChange={(e) => setStepsValue(e.target.value)}
      />
      <label htmlFor="ingredients">ingredients:</label>
      <input
        name="ingredients"
        id="ingredients"
        type="text"
        
        onChange={(e) => setIngredientsValue(e.target.value)}
      />
      <label htmlFor="images">images:</label>
      <input
        name="images"
        id="images"
        type="text"
        
        onChange={(e) => setImagesValue(e.target.value)}
      />
      <button type="submit">edit recipe</button>
    </form>
  );
}