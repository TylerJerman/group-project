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
import Home from './Frontend/Home.jsx';
import IndexPage from './Frontend/IndexPage.jsx';
import Timeline from './Frontend/Timeline.jsx';
import SignUp from './Frontend/SignUp.jsx';
import LogIn from './Frontend/LogIn.jsx';
import axios from 'axios';
import store from './store.js'
import { Provider } from 'react-redux'
import RecipePage from './Frontend/RecipePage.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    
      <Route path="/" element={<App />} >
        <Route index element={<IndexPage />} />

        {/** */}
        <Route
          path="recipes"
          element={<Timeline />}
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
            return { recipes: res.data };
          }}
        />

        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
      </Route>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
