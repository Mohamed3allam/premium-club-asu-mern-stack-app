import { createContext, useReducer } from "react";

export const UsersContext = createContext()

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                users: action.payload
            }
        case 'SET_USER':
            return {
                userAccessed: action.payload
            }
        case 'CREATE_USER':
            return {
                users: [action.payload, ...state.users]
            };
        case 'DELETE_USER':
            return {
                users: state.users.filter((u) => u._id !== action.payload._id)
            }
        case 'UPDATE_USER':
            return {
                users: [action.payload, ...state.users.filter((u) => u._id !== action.payload._id)]
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }) => {
    const [state, dispatchUsers] = useReducer(usersReducer, {
        users: null,
        userAccessed: null
    })

    return (
        <UsersContext.Provider value={{ ...state, dispatchUsers }}>
            { children }
        </UsersContext.Provider>
    )
}