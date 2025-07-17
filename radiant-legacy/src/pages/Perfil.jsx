import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from '../services/authService';
import Swal from 'sweetalert2';
import DashboardLayout from '../layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { registrarAccionAdmin } from '../services/adminLogService';

const Perfil = () => {
    const { user, login, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!loading && (!user || !user.id)) {
            console.error("No se pudo obtener el usuario actual del contexto:", user);
            Swal.fire({
                title: "Sesión inválida",
                text: "No se pudo obtener el usuario actual. Es posible que tu sesión haya expirado.",
                icon: "error",
                confirmButtonText: "Ir al login"
            }).then(() => {
                navigate("/login");
            });
        } else if (user) {
            setNombreCompleto(user.nombreCompleto || '');
            setTelefono(user.telefono || '');
            setDireccion(user.direccion || '');
        }
    }, [loading, user, navigate]);

    if (loading) return <p className="text-center mt-5">Cargando sesión...</p>;
    if (!user || !user.id) return null;

    const handleSave = async (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            Swal.fire("Error", "Las contraseñas no coinciden", "error");
            return;
        }
        try {
            const updatedData = {
                nombreCompleto,
                telefono,
                direccion,
                email: user.credenciales.email,
                ...(password && { password }),
            };

            const updatedUser = await updateProfile(user.id, updatedData);
            login({ usuario: updatedUser });
            Swal.fire("¡Actualizado!", "Tu perfil ha sido modificado.", "success");
            console.log("Registrando acción con adminId:", user?.id);
            await registrarAccionAdmin({
                accion: "Actualización de perfil",
                descripcion: `El administrador actualizó su perfil.`,
                tipo: "PERFIL",
                adminId: user.id
            });
            console.log("Registrando acción con adminId:", user?.id);
        } catch (err) {
            console.error("Error al actualizar perfil:", err);
            Swal.fire("Error", err.message || "No se pudo actualizar.", "error");
        }
    };

    return (
        <DashboardLayout>
            <div className="card shadow-sm p-4 border-0 rounded-4">
                <h3 className="mb-4 fw-bold text-secondary">Editar Perfil</h3>

                <form onSubmit={handleSave} className="d-flex flex-column gap-3">
                    <div>
                        <label className="form-label fw-semibold">Nombre completo</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label fw-semibold">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label fw-semibold">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Nueva contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Confirmar contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success fw-semibold">
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default Perfil;