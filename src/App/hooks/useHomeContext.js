import { HomeContext } from "../context/HomePageContext";
import { useContext } from "react";

export const useHomeContext = () => {
    const context = useContext(HomeContext)

    if (!context) {
        throw Error('useHomeContext must be inside a HomeContextProvider')
    }
    return context
}