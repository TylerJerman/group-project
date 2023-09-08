import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';


export default function RecipePage() {

  const userName = useSelector((state) => state.userName)
  
  const dispatch = useDispatch()

  const rating = useSelector((state) => state.rating)
  const ratingMessage = useSelector((state) => state.ratingMessage)

  const [downVoted, setDownVoted] = useState('')


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

  const {
    recipes: { title, images, steps, ingredients }, 
    } = useLoaderData()
    
  
    if (ratingMessage)
    {
      return (
       <div>
         <div>
           <h1>{title}</h1>
           { userName &&
             <div>
               <>
               { ratingMessage.length < 3 &&
                 <button onClick={clickUpVote}>^</button>
               }
               </>
               <h3>upvotes: {rating}</h3>
               <>
               { ratingMessage.length > 2 &&
                 <button onClick={clickDownVote}>v</button>
               }
               </>
             </div>
           }
         </div>
         <img src={images} />
         <p>{steps}</p>
         <p>{ingredients}</p>
       </div>
     );
    }
    else
    {
      return (
        <div>
          <div>
            <h1>{title}</h1>
            { userName &&
              <div>
                <>
                  <button onClick={clickUpVote}>^</button>
                </>
                <h3>upvotes: {rating}</h3>
                <>
                  <button onClick={clickDownVote}>v</button>
                </>
              </div>
            }
          </div>
          <img src={images} />
          <p>{steps}</p>
          <p>{ingredients}</p>
        </div>
      );
    }
}
 
