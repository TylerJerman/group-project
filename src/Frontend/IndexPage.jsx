import { Link, useLoaderData } from 'react-router-dom';
import RecipeForm from './newRecipeForm';
import axios from 'axios';



export default function Timeline() {
    const { recipes } = useLoaderData()

    const handleRecipe = async (event, formData) => {
      event.preventDefault();

      const res = await axios.post('/api/new-recipe', formData);
    }

    const recipeListItems = recipes.map(({ recipeId, title, image }) => (
        <li key={recipeId}>
        <Link to={`/recipes/${recipeId}`}>{title}</Link>
        </li>
      ));
    return (
      <>
        <h1>recipe timeline data</h1>
        <div>{recipeListItems}</div>

        <RecipeForm onNewRecipe={handleRecipe} />
      </>
    );
  }
  