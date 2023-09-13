import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store.js';
import Home from './Frontend/Home.jsx';
import IndexPage from './Frontend/IndexPage.jsx';
import Timeline from './Frontend/Timeline.jsx';
import SignUp from './Frontend/SignUp.jsx';
import LogIn from './Frontend/LogIn.jsx';
import axios from 'axios';
// import store from './store.js'
import { Provider } from 'react-redux'
import RecipePage from './Frontend/recipePage.jsx';
import RecipeForm from './Frontend/newRecipeForm.jsx';
import NewRecipePage from './Frontend/newRecipePage.jsx';
import Comments from './Frontend/Comments.jsx';
import UserProfile from './Frontend/UserProfile.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    
        <Route path="/" element={<App />} >
          <Route index element={<IndexPage />}
          loader={async () => {
            const res = await axios.get(`/api/recipes`);
            return { recipes: res.data };
          }}
        />

        <Route
          path="recipes/:recipeId"
          element={<RecipePage />}
          loader={async ({ params }) => {
            const res = await axios.get(
              `/api/recipes/${params.recipeId}`
            );
            console.log(res.data)
            return { recipe: res.data.recipe, comments: res.data.comments };
          }}
        />

        <Route
          path="users/:userId"
          element={<UserProfile />}
          loader={async ({ params }) => {
            const res = await axios.get(
              `/api/users/${params.userId}`
            );
            console.log(res.data)
            return { user: res.data };
          }}
        />

        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="newrecipe" element={<NewRecipePage />} />
        
      </Route>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>

    </Provider>
  </React.StrictMode>,
)
