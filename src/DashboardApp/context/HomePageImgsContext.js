import { createContext, useReducer } from "react";

export const HomeImgsContext = createContext()

export const homeImgsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HOME_IMGS':
            return {
                homeImgs: action.payload
            }
        case 'CREATE_HOME_IMGS':
            return {
                homeImgs: [action.payload, ...state.homeImgs]
            };
        case 'DELETE_HOME_IMGS':
            return {
                homeImgs: state.homeImgs.filter((s) => s._id !== action.payload._id)
            }
        case 'UPDATE_HOME_IMGS':
            return {
                homeImgs: [action.payload, ...state.homeImgs.filter((s) => s._id !== action.payload._id)]
            }
        default:
            return state
    }
}

export const HomeImgsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(homeImgsReducer, {
        homeImgs: null
    })

    return (
        <HomeImgsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </HomeImgsContext.Provider>
    )
}