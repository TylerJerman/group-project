import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Comments from './Comments.jsx';
import DeleteBtn from './RecipeFolder/deleteRecipeBtn.jsx';
import EditForm from './EditRecipe.jsx';
import axios from 'axios';

export default function RecipePage() {
  
  const {recipe, comments} = useLoaderData();
  const navigate = useNavigate()

  const userName = useSelector((state) => state.userName)
  
  const dispatch = useDispatch()

  const rating = useSelector((state) => state.rating)
  const ratingMessage = useSelector((state) => state.ratingMessage)

  const isUsersRecipe = useSelector((state) => state.isUsersRecipe)

  const [downVoted, setDownVoted] = useState('')
  const [showEdit, setShowEdit] = useState('')

  const [youSure, setYouSure] = useState('')

  const areYouSure = () =>
  {
    setYouSure('yes')
  }

  const cancel = () =>
  {
    setYouSure('')
  }

  const clickUpVote = async () =>
  {
    if (ratingMessage === "no")
    {
      dispatch({'type': 'SET_RATING', 'payload': (rating + 2)})
    }
    else
    {
      dispatch({'type': 'SET_RATING', 'payload': (rating + 1)})
    }
    dispatch({'type': 'SET_RATING_MESSAGE', 'payload': 'yes'})
    const info = {title: title, userName: userName}
    const {data} = await axios.post('/api/upVote', info)
    setDownVoted('')
  }

  const clickDownVote = async () =>
  {
    if (ratingMessage === "yes")
    {
      dispatch({'type': 'SET_RATING', 'payload': (rating - 2)})
    }
    else
    {
      dispatch({'type': 'SET_RATING', 'payload': (rating - 1)})
    }
    dispatch({'type': 'SET_RATING_MESSAGE', 'payload': 'no'})
    const info = {title: title, userName: userName}
    const {data} = await axios.post('/api/downVote', info)
    setDownVoted('true')
  }

  const {recipeId, title, images, steps, ingredients, userId} = recipe

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/api/delete-recipe/recipes/${recipeId}`);
   
      navigate('/');
    
  };

  const handleEdit = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post(`/api/edit-recipe/recipes/${recipeId}`, formData);

    navigate('/')
  }

  const showEditForm = () =>
  {
    setShowEdit('true')
  }
  
  const ingredientsList = ingredients.map((ingredient) => {
    return <li>
      <label class="container">{ingredient}
      <input  type="checkbox" />
      <span class="checkmark"> </span>
      </label>
    </li>
  });


  const hideEditForm = () =>
  {
    setShowEdit('')
  }

  const recipeSteps = steps.map((step) => {
   return <>

    <li className="step">{step}</li><hr/>
   
   </>
  })
  
    if (ratingMessage)
    {
      return (
        <div >
         <div className='recipe-title'>
           <h1 className='recipe-title'>{title}</h1>
           { userName &&
             <div>
               <>
                { ratingMessage.length < 3 &&
                  <button onClick={clickUpVote}>^</button>
                }
               </>
               <h3>Votes: {rating}</h3>
               <>
                { ratingMessage.length > 2 &&
                  <button onClick={clickDownVote}>v</button>
                }
               </>
             </div>
           }
         </div>
         <img className='recipe-image' alt={images} src={images} />
         {console.log(images)}
         <div className='recipe-info'>

              <div className='ingredients-card'>
                <h2 className='ingredients'>Ingredients:</h2>
                <ul className="stepsBox">{ingredientsList}</ul>

              </div> 
          <div className='steps-card'>
          <h2 className="stepsTitle">Steps:</h2>
          <ol className='steps1'>{recipeSteps}</ol>
          </div>
         </div>
         { isUsersRecipe.length > 1 &&
          <>
            <div className='delete-recipe-div'>
            { youSure.length < 1 &&
              <button onClick={areYouSure}>Delete Recipe</button>
            }
            { youSure.length > 1 &&
              <>
                <button onClick={handleDelete}>Are you sure?</button>
                <button onClick={cancel}>Cancel</button>
              </>
            }
            </div>
            <div className='edit-recipe-div'>
            <button onClick={showEditForm}>Edit Recipe</button>
            { showEdit.length > 1 &&
              <>
                <EditForm onEdit={handleEdit}/>
                <button onClick={hideEditForm}>Cancel</button>
              </>
            }
            </div>
          </>
         }
         <div>
          <Comments comments={comments} recipeId={recipeId} />
         </div>
      </div>
     );
    }
    else
    {
      return (
        <>
          <div>
            <h1>{title}</h1>
            { userName &&
              <div>
                <>
                  <button onClick={clickUpVote}>^</button>
                </>
                <h3>Votes: {rating}</h3>
                <>
                  <button onClick={clickDownVote}>v</button>
                </>
              </div>
            }
          </div>
          <img src={images} />
          <div className='recipe-info'>
          <div className='ingredients-card'>
                <h2 className='ingredients'>Ingredients:</h2>
                <ul className="stepsBox">{ingredientsList}</ul>

              </div> 
              <div className='steps-card'>
          <h2 className="stepsTitle">Steps:</h2>
          <ol className='steps1'>{recipeSteps}</ol>
          </div>
          </div>
          { isUsersRecipe.length > 1 &&
            <>
              <div>
              { youSure.length < 1 &&
                <button onClick={areYouSure}>Delete Recipe</button>
              }
              { youSure.length > 1 &&
                <>
                  <button onClick={handleDelete}>Are you sure?</button>
                  <button onClick={cancel}>Cancel</button>
                </>
              }
              </div>
              <button onClick={showEditForm}>Edit Recipe</button>
              { showEdit.length > 1 &&
                <>
                  <EditForm onEdit={handleEdit}/>
                  <button onClick={hideEditForm}>Cancel</button>
                </>
              }
            </>
          }
          <div>
            <Comments comments={comments} recipeId={recipeId} />
          </div>
        </>
      );
    }
}


// render the edit form and delete button if state.userId === recipe.userId