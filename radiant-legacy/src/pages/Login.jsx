import React, { useState, useContext } from 'react'
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from "sweetalert2";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(null);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Por favor completa todos los campos.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await loginUser({ email, password });

            login(response);

            await Swal.fire({
                title: '¡Bienvenido!',
                text: 'Has iniciado sesión exitosamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                timer: 1800,
                showConfirmButton: false
            });

            const rol = response?.rol || response?.usuario?.rol;

            if (rol === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (err) {
            setError(err.message || "Credenciales incorrectas.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="min-vh-100 d-flex align-items-center justify-content-center bg-light pt-5">
            <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Inicia sesión</h2>

                {error && <div className="alert alert-danger p-2">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>
                    <button
                        className="btn btn-warning w-100 fw-semibold"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Acceder"}
                    </button>
                    <div className="text-center mt-3">
                        <small className="text-muted">
                            ¿No tienes cuenta?{" "}
                            <a href="/register" className="text-warning text-decoration-none">
                                Regístrate
                            </a>
                        </small>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;