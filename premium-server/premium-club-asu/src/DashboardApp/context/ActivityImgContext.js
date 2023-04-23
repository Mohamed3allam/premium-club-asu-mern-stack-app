import { createContext, useReducer } from "react";

export const ActivityImgContext = createContext()

export const activityImgReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ACTIVITY_IMGS':
            return {
                activityImgs: action.payload
            }
        case 'CREATE_ACTIVITY_IMGS':
            return {
                activityImgs: [action.payload, ...state.activityImgs]
            }
        case 'DELETE_ACTIVITY_IMGS':
            return {
                activityImgs: state.activityImgs.filter((ai)=> ai._id !== action.payload._id)
            }
        case 'UPDATE_ACTIVITY_IMGS':
            return {
                activityImgs: [action.payload, ...state.activityImgs.filter((ai)=> ai._id !== action.payload._id)]
            }
        default:
            return state
    }
}

export const ActivityImgContextProvider = ({ children }) => {

    const [state, dispatchActivityImage] = useReducer(activityImgReducer, {
        activityImgs: null
    })


    return (
        <ActivityImgContext.Provider value={{...state,dispatchActivityImage}}>
            { children }
        </ActivityImgContext.Provider>
    )
}