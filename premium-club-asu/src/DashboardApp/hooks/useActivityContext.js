import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useActivityContext = () => {
    const context = useContext(ActivityContext)
    if (!context) {
        throw Error('useActivityContext must be inside an ActivityContextProvider')
    }
    return context
}