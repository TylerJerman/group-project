import { configureStore } from '@reduxjs/toolkit'


let initialState = {message: ''}

const reducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case 'SET_MESSAGE':
            let newState = { ...state, message: action.payload }
            return newState
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