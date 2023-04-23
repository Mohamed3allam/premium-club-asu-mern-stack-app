import { createContext, useReducer } from "react";

export const ActivityContext = createContext()

export const activityReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ACTIVITIES':
            return {
                activities: action.payload
            }
        case 'CREATE_ACTIVITY':
            return {
                activities: [action.payload, ...state.activities]
            }
        case 'DELETE_ACTIVITY':
            return {
                activities: state.activities.filter((a)=> a._id !== action.payload._id)
            }
        case 'UPDATE_ACTIVITY':
            return {
                activities: [action.payload, ...state.activities.filter((a)=> a._id !== action.payload._id)]
            }
        default:
            return state
    }
}

export const ActivityContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(activityReducer, {
        activities: null
    })


    return (
        <ActivityContext.Provider value={{...state,dispatch}}>
            { children }
        </ActivityContext.Provider>
    )
}