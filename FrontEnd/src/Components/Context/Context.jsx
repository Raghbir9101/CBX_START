import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Context = createContext();
function getURL(link) {
    const parsedURL = new URL(link);

    // Get the protocol and hostname to create the base URL
    const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;

    return baseURL;
}


const currentURL = window.location.href;
// let apiLink = `${getURL(currentURL)}/`;
let apiLink = `${getURL(currentURL)}`;


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
            isLoading, setIsLoading,
            apiLink
        }}>
            {children}
        </Context.Provider>
    )
}

