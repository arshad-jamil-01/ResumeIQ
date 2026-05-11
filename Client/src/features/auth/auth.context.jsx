import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [usere, setusere] = useState(null)
    const [loading, setloading] = useState(false)

    return (
        <AuthContext.AuthProvider value={{user, setusere, loading, setloading}}>
            {children}
        </AuthContext.AuthProvider>
    )

}