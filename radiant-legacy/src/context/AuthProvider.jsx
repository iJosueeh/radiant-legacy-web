import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (nombreUsuario) => {
        localStorage.setItem("userName", nombreUsuario);
        setUser(nombreUsuario);
    };

    const logout = () => {
        localStorage.removeItem("userName");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


