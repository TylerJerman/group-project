
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import RecipeForm from './newRecipeForm';
import axios from 'axios';



export default function Timeline() {
    const { recipes } = useLoaderData()
    const {recipeId, title, images, steps, ingredients, userId} = recipes

    const userName = useSelector((state) => state.userName)

    const thisUserId = useSelector((state) => state.userId)

    const dispatch = useDispatch()

    const getRating = async (title, recipeId, userId) =>
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

      dispatch({'type': 'SET_RECIPE_ID', 'payload': recipeId})

      if (thisUserId === userId)
      {
        dispatch({'type': 'IS_USERS_RECIPE', 'payload': 'true'})
      }
      else
      {
        dispatch({'type': 'IS_USERS_RECIPE', 'payload': ''})
      }
    }

    const recipeListItems = recipes.map(({ recipeId, title, images, userId }) => (
        <li key={recipeId}>
          <Link onClick={() => getRating(title, recipeId, userId)} to={`/recipes/${recipeId}`}>{title}</Link>
        </li>
      ));
    return (
      <>
        <h1>recipe timeline data</h1>
        <ul>{recipeListItems}</ul>

        { userName &&
          <Link to='/newrecipe'>new recipe</Link>
        }
      </>
    );
  }