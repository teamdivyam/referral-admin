import { useState, createContext } from "react";

export const PageContext = createContext({
    currentPage: 0,
    setCurrentPage: () => {},
});

export const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <PageContext
            value={{
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </PageContext>
    );
};
