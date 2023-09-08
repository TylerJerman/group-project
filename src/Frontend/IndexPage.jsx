import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import RecipeForm from './newRecipeForm';
import axios from 'axios';



export default function Timeline() {
    const { recipes } = useLoaderData()

    const recipeListItems = recipes.map(({ recipeId, title, image }) => (
        <li key={recipeId}>
        <Link to={`/recipes/${recipeId}`}>{title}</Link>
        </li>
      ));
    return (
      <>
        <h1>recipe timeline data</h1>
        <ul>{recipeListItems}</ul>

        <Link to='/newrecipe'>new recipe</Link>
      </>
    );
  }
  