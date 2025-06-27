import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userToken");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("userToken", token);
        setUser(token);
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

