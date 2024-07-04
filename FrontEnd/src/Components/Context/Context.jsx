import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Context = createContext();


export default function ContextProvider({ children }) {
    const [token, setToken] = useState(sessionStorage.getItem("token") || null);
    const [loginUser, setLoginUser] = useState(null);
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        setLoginUser(null)
        setToken(null)
        sessionStorage.setItem("token", "")
    }
    return (
        <Context.Provider value={{
            token, setToken,
            loginUser, setLoginUser,
            handleLogout,
            pages, setPages,
            isLoading, setIsLoading
        }}>
            {children}
        </Context.Provider>
    )
}