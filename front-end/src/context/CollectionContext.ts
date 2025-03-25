import { createContext, useContext } from "react";

interface CollectionContextType {
    draggingChild: boolean,
    setDraggingChild: (value: boolean) => void;
    allowSwipe: boolean;
    setAllowSwipe: (value: boolean) => void;
}

export const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const useSwipe = () => {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error("useSwipe must be used within a SwipeProvider");
    }
    return context;
};