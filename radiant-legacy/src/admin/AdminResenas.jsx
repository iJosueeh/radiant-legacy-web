import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';
import { Table, Button, Badge, Modal } from 'react-bootstrap';
import { registrarAccionAdmin } from '../services/adminLogService';
import { AuthContext } from '../context/AuthContext';

const AdminResenas = () => {
    const { user } = useContext(AuthContext);
    const [resenas, setResenas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resenaSeleccionada, setResenaSeleccionada] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchResenas = async () => {
        try {
            const res = await axiosInstance.get("/resenas/todas");
            setResenas(res.data);
        } catch {
            Swal.fire('Error', 'No se pudieron cargar las reseñas.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const moderarSiguiente = async (aprobar) => {
        try {
            const res = await axiosInstance.post(`/resenas/moderar/siguiente?aprobar=${aprobar}`);
            const estado = aprobar ? 'aprobada' : 'rechazada';
            Swal.fire(`Reseña ${estado}`, `ID: ${res.data.id}`, 'success');

            await registrarAccionAdmin({
                accion: `Reseña ${estado}`,
                descripcion: `El administrador ${user.nombreCompleto} ${estado} la reseña con ID ${res.data.id}.`,
                tipo: "RESEÑA",
                adminId: user.id
            });

            fetchResenas();
        } catch {
            Swal.fire('Sin pendientes', 'No hay reseñas pendientes.', 'info');
        }
    };

    const eliminarResena = async (resena) => {
        if (resena.estado === 'APROBADA') {
            Swal.fire('No permitido', 'No puedes eliminar una reseña ya aprobada.', 'info');
            return;
        }

        const confirm = await Swal.fire({
            title: '¿Eliminar reseña?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosInstance.delete(`/resenas/${resena.id}/usuario/${resena.usuario.id}`);

            await registrarAccionAdmin({
                accion: "Eliminación de reseña",
                descripcion: `El administrador ${user.nombreCompleto} eliminó la reseña con ID ${resena.id} del usuario ${resena.usuario.nombreCompleto}.`,
                tipo: "RESEÑA",
                adminId: user.id
            });

            Swal.fire('Eliminada', 'La reseña fue eliminada correctamente.', 'success');
            fetchResenas();
        } catch {
            Swal.fire('Error', 'No se pudo eliminar la reseña.', 'error');
        }
    };

    const badgeEstado = (estado) => {
        switch (estado) {
            case 'PENDIENTE': return 'secondary';
            case 'APROBADA': return 'success';
            case 'RECHAZADA': return 'danger';
            default: return 'light';
        }
    };

    const abrirModal = (resena) => {
        setResenaSeleccionada(resena);
        setShowModal(true);
    };

    useEffect(() => {
        fetchResenas();
    }, []);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold"><i className="bi bi-chat-dots me-2"></i> Gestión de Reseñas</h2>
                <div className="d-flex gap-2">
                    <Button variant="success" onClick={() => moderarSiguiente(true)}>
                        <i className="bi bi-hand-thumbs-up"></i> Aprobar siguiente
                    </Button>
                    <Button variant="danger" onClick={() => moderarSiguiente(false)}>
                        <i className="bi bi-hand-thumbs-down"></i> Rechazar siguiente
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2">Cargando reseñas...</p>
                </div>
            ) : (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Producto</th>
                            <th>Calificación</th>
                            <th>Comentario</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resenas.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.usuario?.nombreCompleto || '—'}</td>
                                <td>{r.producto?.nombre || '—'}</td>
                                <td>{r.calificacion} ⭐</td>
                                <td>{r.comentario.length > 40 ? r.comentario.slice(0, 40) + '...' : r.comentario}</td>
                                <td><Badge bg={badgeEstado(r.estado)}>{r.estado}</Badge></td>
                                <td>{new Date(r.fechaCreacion).toLocaleString()}</td>
                                <td className="d-flex gap-2">
                                    <Button variant="outline-dark" size="sm" onClick={() => abrirModal(r)}>
                                        <i className="bi bi-eye"></i> Ver
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => eliminarResena(r)}>
                                        <i className="bi bi-trash"></i> Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* MODAL DETALLES */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalle de la Reseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {resenaSeleccionada ? (
                        <>
                            <p><strong>Usuario:</strong> {resenaSeleccionada.usuario?.nombreCompleto || '—'}</p>
                            <p><strong>Producto:</strong> {resenaSeleccionada.producto?.nombre || '—'}</p>
                            <p><strong>Calificación:</strong> {resenaSeleccionada.calificacion} ⭐</p>
                            <p><strong>Comentario:</strong></p>
                            <p>{resenaSeleccionada.comentario}</p>
                            <p><strong>Estado:</strong> {resenaSeleccionada.estado}</p>
                            <p><strong>Fecha:</strong> {new Date(resenaSeleccionada.fechaCreacion).toLocaleString()}</p>
                        </>
                    ) : (
                        <p>No se pudo cargar la información.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminResenas;
