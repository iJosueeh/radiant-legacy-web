import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../services/authService';

const Register = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    const [error, setError] = useState('');

    const handleNext = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        setError('');
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({
                nombreCompleto: nombre,
                telefono,
                direccion,
                email,
                password
            });

            if (typeof response === "string" && response.includes("correctamente")) {
                navigate("/login");
            } else {
                setError("No se pudo registrar. Intenta nuevamente.");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "Error al registrar.");
        }
    };


    return (
        <div className="container mt-5 pt-5 d-flex justify-content-center">
            <div className="bg-white p-5 rounded-4 shadow-lg" style={{ maxWidth: "420px", width: "100%" }}>
                <h2 className="text-center mb-4 fw-bold text-dark">Crea tu cuenta</h2>
                {error && <div className="alert alert-danger p-2">{error}</div>}

                <form onSubmit={step === 1 ? handleNext : handleSubmit} className="d-flex flex-column gap-3">
                    {step === 1 && (
                        <>
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
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
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
                            <div>
                                <label className="form-label fw-medium">Confirma tu contraseña</label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="••••••••"
                                        required
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? "Ocultar" : "Mostrar"}
                                    </button>
                                </div>
                            </div>
                            <button className="btn btn-warning w-100 mt-2 fw-semibold">Siguiente</button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div>
                                <label className="form-label fw-medium">Teléfono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="912345678"
                                    required
                                    value={telefono}
                                    onChange={e => setTelefono(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="form-label fw-medium">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Av. Siempre Viva 123"
                                    required
                                    value={direccion}
                                    onChange={e => setDireccion(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-success w-100 mt-2 fw-semibold">Registrarse</button>
                        </>
                    )}
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="text-warning fw-semibold">Inicia sesión</Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Register;
