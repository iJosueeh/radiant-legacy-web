import React, { useState, useContext } from 'react'
import './Register.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await registerUser(nombre, email, password);
            if (response.token) {
                login(response.token);
                navigate("/");
            } else {
                setError('Registro exitoso, pero no se recibió token.');
            }
        } catch (err) {
            console.log(err);
            setError("Error al registrar. Por favor, intenta de nuevo.");
        }
    }

    return (
        <div className="container mt-5 pt-5 d-flex justify-content-center">
            <div className="bg-white p-5 rounded-4 shadow-lg" style={{ maxWidth: "420px", width: "100%" }}>
                <h2 className="text-center mb-4 fw-bold text-dark">Crea tu cuenta</h2>
                {error && <div className="alert alert-danger p-2">{error}</div>}
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div>
                        <label className="form-label fw-medium">Nombre completo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Juan Pérez"
                            required
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label fw-medium">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="tu@correo.com"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label fw-medium">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label fw-medium">Confirma tu contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-warning w-100 mt-2 fw-semibold">Registrarse</button>
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="text-warning fw-semibold">Inicia sesión</Link>
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Register
