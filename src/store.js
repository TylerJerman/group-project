import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
// import rootReducer from "../reducers/reducers";

let initialState = {message: ''}

const reducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case 'SET_MESSAGE':
            let newState = { ...state, message: action.payload }
            return newState
        case 'SET_USERNAME':
            let userNameState = { ...state, userName: action.payload }
            return userNameState
        case 'SET_RATING':
            let ratingState = { ...state, rating: action.payload }
            return ratingState
        case 'SET_RATING_MESSAGE':
            let ratingMessageState = { ...state, ratingMessage: action.payload }
            return ratingMessageState
        case 'SET_EMAIL':
            let emailState = { ...state, email: action.payload }
            return emailState
        case 'SET_RECIPE_ID':
            let recipeIdState = { ...state, recipeId: action.payload }
            return recipeIdState
        case 'SET_USER_ID':
            let userIdState = { ...state, userId: action.payload }
            return userIdState
        case 'IS_USERS_RECIPE':
            let isUsersRecipeState = { ...state, isUsersRecipe: action.payload }
            return isUsersRecipeState
        case 'SET_PROFILE_PIC':
            let profilePicState = { ...state, profilePic: action.payload }
            return profilePicState
        // add new cases below
        default:
            return state
    }
}

const persistConfig = {
    key: 'root',
    storage,
  }

// const store = configureStore(
//     {
//         reducer: reducer
//     }
// )

const persistedReducer = persistReducer(persistConfig,reducer )

export const store = configureStore({reducer: persistedReducer, middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})})

export const persistor = persistStore(store)

export default store