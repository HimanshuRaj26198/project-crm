import {createContext} from "react";
import {useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();


export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async (currentToken)=>{
        try{
            let result = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
                headers: {
                    Authorization:`Bearer ${currentToken}`
                }
            });
            setUser(result.data)
        }catch(err){
            console.log("Failed to fetch user", err);

        }
    }

    const login = async (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);
        await fetchUser(accessToken);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        setToken(null);
    };

    useEffect(()=>{
       const initAuth = async () => {
        const storedToken = localStorage.getItem("accessToken");

        if (storedToken) {
            setToken(storedToken);
            await fetchUser(storedToken);
        }

        setLoading(false);
    };

    initAuth();
    },[]);

    return <AuthContext.Provider  value={{user, token, loading, login, logout}}>
        {children}
    </AuthContext.Provider>
}