import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from '../services/authService';
import Swal from 'sweetalert2';
import DashboardLayout from '../layouts/DashboardLayout';

const Perfil = () => {
    const { user, login } = useContext(AuthContext);

    const [nombreCompleto, setNombreCompleto] = useState(user?.nombreCompleto || '');
    const [telefono, setTelefono] = useState(user?.telefono || '');
    const [direccion, setDireccion] = useState(user?.direccion || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                ...(password && { password }),
            };
            const updatedUser = await updateProfile(user.id, updatedData);
            login(updatedUser);
            Swal.fire("¡Actualizado!", "Tu perfil ha sido modificado.", "success");
        } catch (err) {
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