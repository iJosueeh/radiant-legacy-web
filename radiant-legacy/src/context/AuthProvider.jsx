import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("usuario");

            if (storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.removeItem("usuario");
            }
        } catch (error) {
            console.error("Error al parsear usuario del localStorage:", error);
            localStorage.removeItem("usuario"); // limpiar si hay error
            setUser(null);
        }
    }, []);

    const login = (usuario) => {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setUser(usuario);
    };

    const logout = () => {
        localStorage.removeItem("usuario");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
