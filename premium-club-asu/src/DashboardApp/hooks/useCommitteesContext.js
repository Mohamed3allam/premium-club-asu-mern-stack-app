import { useContext } from "react";
import { CommitteesContext } from "../context/CommitteesContext";

export const useCommitteesContext = () => {
    const context = useContext(CommitteesContext)
    if (!context) {
        throw Error('useCommitteesContext must be inside an CommitteesContextProvider')
    }
    return context
}