
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import RecipeForm from './newRecipeForm';
import axios from 'axios';



export default function Timeline() {
    const { recipes } = useLoaderData()

    const userName = useSelector((state) => state.userName)
    console.log(userName)

    const dispatch = useDispatch()

    const getRating = async (title) =>
    {
      const info = {title: title}

      let counter = 0

      const {data} = await axios.post(`/api/ratings`, info)

      for (let i = 0; i < data.length; i++)
      {
        if (data[i].userName === userName && data[i].isUpVote === true)
        {
          dispatch({'type': 'SET_RATING_MESSAGE', 'payload': 'yes'})
        }
        else if (data[i].userName === userName && data[i].isUpVote === false)
        {
          dispatch({'type': 'SET_RATING_MESSAGE', 'payload': 'no'})
        }
        else
        {
          dispatch({'type': 'SET_RATING_MESSAGE', 'payload': ''})
        }

        if (data[i].isUpVote === true)
        {
          counter++
        }
        else if (data[i].isUpVote === false)
        {
          counter--
        }
      }

      dispatch({'type': 'SET_RATING', 'payload': counter})
    }

    const recipeListItems = recipes.map(({ recipeId, title, image }) => (
        <li key={recipeId}>
          <Link onClick={() => getRating(title)} to={`/recipes/${recipeId}`}>{title}</Link>
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
  