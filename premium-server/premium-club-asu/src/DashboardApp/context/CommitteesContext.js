import { createContext, useReducer } from "react";

export const CommitteesContext = createContext()

export const committeesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMITTEES':
            return {
                committees: action.payload
            }
        case 'SET_COMMITTEE':
            return {
                committeeAccessed: action.payload
            }
        case 'DELETE_COMMITTEE':
            return {
                committees: state.committees.filter((c) => c._id !== action.payload._id)
            }
        case 'UPDATE_COMMITTEE':
            return {
                committees: [action.payload, ...state.committees.filter((c) => c._id !== action.payload._id)]
            }
        default:
            return state
    }
}

export const CommitteesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(committeesReducer, {
        committees: null,
        committeeAccessed: null
    })

    return (
        <CommitteesContext.Provider value={{ ...state, dispatch }}>
            { children }
        </CommitteesContext.Provider>
    )
}