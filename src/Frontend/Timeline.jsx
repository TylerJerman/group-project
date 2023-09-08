import { Link, useLoaderData } from 'react-router-dom';



export default function Timeline() {
    const { recipes } = useLoaderData();

    const recipeListItems = recipes.map(({ recipeId, title, image }) => (
        <li key={recipeId}>
          <img src={image}/>
          <Link to={`/recipes/${recipeId}`}>{title}</Link>
        </li>
      ));
    return (
      <>
        <h1>recipe timeline data</h1>
        <ul>{recipeListItems}</ul>
      </>
    );
  }