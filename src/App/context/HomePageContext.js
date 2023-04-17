import { createContext, useReducer } from "react";

export const HomeContext = createContext()

export const homeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SECTIONS':
            return {
                sections: action.payload
            }
        default:
            return state
    }
}

export const HomeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(homeReducer, {
        sections: null
    })

    return (
        <HomeContext.Provider value={{ ...state, dispatch }}>
            { children }
        </HomeContext.Provider>
    )
}