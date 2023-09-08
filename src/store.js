import { configureStore } from '@reduxjs/toolkit'


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
        // add new cases below
        default:
            return state
    }
}

const store = configureStore(
    {
        reducer: reducer
    }
)

export default store