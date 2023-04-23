import { useContext } from "react";
import { ActivityImgContext } from "../context/ActivityImgContext";

export const useActivityImgContext = () => {
    const context = useContext(ActivityImgContext)
    if (!context) {
        throw Error('useActivityImgContext must be inside an ActivityImgContextProvider')
    }
    return context
}