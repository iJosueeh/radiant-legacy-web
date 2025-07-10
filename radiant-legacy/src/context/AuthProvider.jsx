import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EXPIRACION_MS = 1000 * 60 * 60 * 6; // 6 horas

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("usuario");

      if (storedData && storedData !== "undefined") {
        const { usuario, expiracion } = JSON.parse(storedData);
        const ahora = Date.now();

        if (expiracion && ahora < expiracion) {
          setUser(usuario);
        } else {
          localStorage.removeItem("usuario");
          setUser(null);

          Swal.fire({
            title: "Sesión expirada",
            text: "Tu sesión ha caducado. Por favor, inicia sesión nuevamente.",
            icon: "info",
            confirmButtonText: "Ir al login",
            customClass: {
              popup: 'rounded-4 shadow'
            }
          }).then(() => {
            navigate("/login");
          });
        }
      }
    } catch (error) {
      console.error("Error al leer sesión:", error);
      localStorage.removeItem("usuario");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const login = (response) => {
    const ahora = Date.now();

    const usuario = response.usuario;
    const dataConTiempo = {
      usuario,
      expiracion: ahora + EXPIRACION_MS,
    };

    localStorage.setItem("usuario", JSON.stringify(dataConTiempo));
    setUser(usuario);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};