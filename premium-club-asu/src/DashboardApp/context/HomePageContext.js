import { createContext, useReducer } from "react";

export const HomeContext = createContext()

export const homeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SECTIONS':
            return {
                sections: action.payload
            }
        case 'CREATE_SECTION':
            return {
                sections: [action.payload, ...state.sections]
            };
        case 'DELETE_SECTION':
            return {
                sections: state.sections.filter((s) => s._id !== action.payload._id)
            }
        // case 'UPDATE_SECTION':
        //     return {
        //         sections: [action.payload, ...state.sections.filter((s) => s._id !== action.payload._id)]
        //     }
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