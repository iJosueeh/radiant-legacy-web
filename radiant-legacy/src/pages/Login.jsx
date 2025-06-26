import React from 'react'
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Por favor completa todos los campos.");
            return;
        }

        setError("");
        console.log({ email, password });
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
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-warning w-100 fw-semibold" type="submit">
                        Acceder
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

