import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../context/AuthContext";
import { getResenasPorUsuario, actualizarResena, eliminarResena } from "../services/resenaService";
import StarRatingDisplay from "../components/StarRatingDisplay";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const Resenas = () => {
    const { user } = useContext(AuthContext);
    const [resenas, setResenas] = useState([]);

    const [resenaSeleccionada, setResenaSeleccionada] = useState(null);
    const [formComentario, setFormComentario] = useState("");
    const [formCalificacion, setFormCalificacion] = useState(5);

    useEffect(() => {
        const cargarResenas = async () => {
            try {
                if (user?.id) {
                    const res = await getResenasPorUsuario(user.id);
                    setResenas(res);
                }
            } catch (error) {
                console.error("Error al cargar reseñas del usuario:", error);
            }
        };

        cargarResenas();
    }, [user]);

    const handleEditar = (resena) => {
        setResenaSeleccionada(resena);
        setFormComentario(resena.comentario);
        setFormCalificacion(resena.calificacion);

        const modal = new window.bootstrap.Modal(
            document.getElementById("modalEditarResena")
        );
        modal.show();
    };

    const handleGuardarEdicion = async () => {
        try {
            const data = {
                comentario: formComentario,
                calificacion: formCalificacion,
            };

            const actualizada = await actualizarResena(resenaSeleccionada.id, data);
            const nuevas = resenas.map((r) =>
                r.id === actualizada.id ? actualizada : r
            );
            setResenas(nuevas);
            toast.success("Reseña actualizada correctamente");

            const modal = window.bootstrap.Modal.getInstance(
                document.getElementById("modalEditarResena")
            );
            modal.hide();
        } catch (error) {
            console.error("Error al actualizar reseña:", error);
            toast.error("Ocurrió un error al guardar los cambios.");
        }

    };

    const handleEliminar = (resena) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eliminarResena(resena.id, user.id);
                    setResenas((prev) => prev.filter((r) => r.id !== resena.id));
                    Swal.fire(
                        'Eliminada',
                        'La reseña ha sido eliminada correctamente.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar reseña:", error);
                    Swal.fire(
                        'Error',
                        'Ocurrió un problema al eliminar la reseña.',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <DashboardLayout>
            <div className="card p-4 shadow-sm border-0 rounded-4 bg-white">
                <h3 className="fw-bold mb-4">Tus reseñas</h3>

                {resenas.length === 0 ? (
                    <p className="text-muted">Aún no has enviado ninguna reseña.</p>
                ) : (
                    resenas.map((resena) => (
                        <div
                            key={resena.id}
                            className="mb-4 p-4 bg-light rounded-4 shadow-sm border position-relative"
                        >
                            <div className="mb-2 d-flex justify-content-between align-items-center">
                                <h6 className="mb-0 text-primary fw-bold">
                                    {resena?.producto?.nombre || "Producto desconocido"}
                                </h6>
                                <span
                                    className={`badge px-3 py-2 rounded-pill ${resena.estado === "APROBADA"
                                        ? "bg-success"
                                        : "bg-warning text-dark"
                                        }`}
                                >
                                    {resena.estado}
                                </span>
                            </div>
                            <div className="mb-2">
                                <StarRatingDisplay value={resena.calificacion} />
                            </div>
                            <p className="mb-0">
                                <strong>Comentario:</strong> {resena.comentario}
                            </p>
                            <p className="text-muted small">
                                Publicada el:{" "}
                                {new Date(resena.fechaCreacion).toLocaleDateString()}
                            </p>

                            <div className="d-flex justify-content-end gap-2 mt-3">
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => handleEditar(resena)}
                                >
                                    <i className="bi bi-pencil me-1"></i> Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleEliminar(resena)}
                                >
                                    <i className="bi bi-trash me-1"></i> Eliminar
                                </button>
                            </div>

                        </div>
                    ))
                )}
            </div>

            {/* Modal para editar reseña */}
            <div
                className="modal fade"
                id="modalEditarResena"
                tabIndex="-1"
                aria-labelledby="modalEditarLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalEditarLabel">
                                Editar Reseña
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Calificación:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    min={1}
                                    max={5}
                                    value={formCalificacion}
                                    onChange={(e) => setFormCalificacion(Number(e.target.value))}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Comentario:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={formComentario}
                                    onChange={(e) => setFormComentario(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleGuardarEdicion}
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </DashboardLayout>
    );
};

export default Resenas;