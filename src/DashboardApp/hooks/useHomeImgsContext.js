import { HomeImgsContext } from "../context/HomePageImgsContext";
import { useContext } from "react";

export const useHomeImgsContext = () => {
    const context = useContext(HomeImgsContext)

    if (!context) {
        throw Error('useHomeImgsContext must be inside a HomeContextProvider')
    }
    return context
}