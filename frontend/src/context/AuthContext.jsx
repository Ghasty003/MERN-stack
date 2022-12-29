import React, { createContext } from "react";
import { useReducer } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return state;
    }
}


export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    console.log(state)

    return (
        <AuthContext.Provider value={{dispatch, ...state}}>
            { children }
        </AuthContext.Provider>
    )
}


export default AuthContext;