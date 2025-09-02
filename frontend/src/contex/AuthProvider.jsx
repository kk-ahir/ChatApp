import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider=({ children })=> {
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("messenger");

    let parsedUser = undefined;
    try {
        parsedUser = initialUserState ? JSON.parse(initialUserState) : undefined;
    } catch (e) {
        parsedUser = initialUserState; // fallback if it's a plain string
    }

    const [authUser, setAuthUser] = useState(parsedUser);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
