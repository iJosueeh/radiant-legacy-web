import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';
import { Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { registrarLogAdmin } from '../services/logger';

const AdminCitas = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [citaEditando, setCitaEditando] = useState(null);

    const admin = JSON.parse(sessionStorage.getItem('usuario'));

    const fetchCitas = async () => {
        try {
            const res = await axiosInstance.get('/api/citas');
            setCitas(res.data);
        } catch {
            Swal.fire('Error', 'No se pudieron cargar las citas.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const atenderCita = async () => {
        const confirm = await Swal.fire({
            title: '¿Atender la siguiente cita?',
            text: 'Se atenderá a la próxima cita en cola.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, atender',
            cancelButtonText: 'Cancelar',
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosInstance.put('/api/citas/atender');
            Swal.fire('Cita atendida', `ID: ${res.data.id}`, 'success');

            await registrarLogAdmin({
                accion: 'Atención de cita',
                descripcion: `Se atendió la cita con ID: ${res.data.id}`,
                tipo: 'MODIFICACIÓN',
                adminId: admin.id
            });

            fetchCitas();
        } catch {
            Swal.fire('Sin citas', 'No hay citas pendientes.', 'info');
        }
    };

    const cancelarCita = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Cancelar esta cita?',
            text: 'No podrás revertir esta acción.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosInstance.delete(`/api/citas/${id}`);
            Swal.fire('Cancelada', 'La cita fue cancelada correctamente.', 'success');

            await registrarLogAdmin({
                accion: 'Cancelación de cita',
                descripcion: `Se canceló la cita con ID: ${id}`,
                tipo: 'ELIMINACIÓN',
                adminId: admin.id
            });

            fetchCitas();
        } catch {
            Swal.fire('Error', 'No se pudo cancelar la cita.', 'error');
        }
    };

    const badgeEstado = (estado) => {
        switch (estado) {
            case 'PENDIENTE':
                return <Badge bg="warning" text="dark"><i className="bi bi-hourglass-split me-1" /> Pendiente</Badge>;
            case 'ATENDIDA':
                return <Badge bg="primary"><i className="bi bi-check-circle me-1" /> Atendida</Badge>;
            case 'CANCELADA':
                return <Badge bg="danger"><i className="bi bi-x-circle me-1" /> Cancelada</Badge>;
            case 'COMPLETADA':
                return <Badge bg="success"><i className="bi bi-check-circle me-1" /> Completada</Badge>;
            default:
                return <Badge bg="secondary">Desconocido</Badge>;
        }
    };

    const tipoContactoTexto = (valor) => {
        const mapa = {
            0: 'WhatsApp',
            1: 'Llamada',
            2: 'Email',
        };

        return mapa[valor] || '—';
    };

    const abrirEditar = (cita) => {
        console.log("Cita a editar:", cita);
        setCitaEditando({ ...cita });
        setShowEditModal(true);
    };

    const guardarEdicion = async () => {
        console.log("🔍 Guardando cita:", citaEditando);
        if (!citaEditando || typeof citaEditando !== 'object' || citaEditando.id == null) {
            console.error("❌ citaEditando no válido:", citaEditando);
            Swal.fire('Error', 'No hay una cita válida para guardar.', 'error');
            return;
        }

        try {
            const camposIncompletos =
                !citaEditando.motivo ||
                !citaEditando.telefono ||
                !citaEditando.modoCita ||
                citaEditando.tipoContacto === '' ||
                citaEditando.tipoContacto === null;

            if (camposIncompletos) {
                Swal.fire('Campos incompletos', 'Por favor completa todos los campos.', 'warning');
                return;
            }

            const { id, ...data } = citaEditando;

            // Forzar string si backend lo espera como String
            data.tipoContacto = String(data.tipoContacto);

            await axiosInstance.put(`/api/citas/${id}`, data);

            Swal.fire('Guardado', 'Cita actualizada correctamente.', 'success');

            await registrarLogAdmin({
                accion: 'Actualización de cita',
                descripcion: `Se actualizó la cita con ID: ${id}`,
                tipo: 'MODIFICACIÓN',
                adminId: admin.id
            });

            setShowEditModal(false);
            setCitaEditando(null);
            fetchCitas();
        } catch (err) {
            console.error('Error al guardar cita:', err);
            Swal.fire('Error', 'No se pudo guardar la cita.', 'error');
        }
    };


    useEffect(() => {
        fetchCitas();
    }, []);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold"><i className="bi bi-calendar-check me-2"></i> Gestión de Citas</h2>
                <Button variant="primary" onClick={atenderCita}>
                    <i className="bi bi-play-circle"></i> Atender siguiente
                </Button>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2">Cargando citas...</p>
                </div>
            ) : (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Motivo</th>
                            <th>Teléfono</th>
                            <th>Modo</th>
                            <th>Tipo de contacto</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.id}</td>
                                <td>{new Date(cita.fecha_cita).toLocaleString()}</td>
                                <td>{cita.motivo}</td>
                                <td>{cita.telefono}</td>
                                <td>{cita.modoCita || '—'}</td>
                                <td>{tipoContactoTexto(cita.tipoContacto)}</td>
                                <td>{badgeEstado(cita.estado)}</td>
                                <td className="d-flex gap-2">
                                    <Button variant="outline-primary" size="sm" onClick={() => abrirEditar(cita)}>
                                        <i className="bi bi-pencil"></i> Editar
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => cancelarCita(cita.id)}>
                                        <i className="bi bi-x-circle"></i> Cancelar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Modal para editar cita */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {citaEditando && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Motivo</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={citaEditando.motivo || ''}
                                    onChange={(e) =>
                                        setCitaEditando({ ...citaEditando, motivo: e.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={citaEditando.telefono || ''}
                                    onChange={(e) =>
                                        setCitaEditando({ ...citaEditando, telefono: e.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Modo de Cita</Form.Label>
                                <Form.Select
                                    value={citaEditando.modoCita || ''}
                                    onChange={(e) =>
                                        setCitaEditando({ ...citaEditando, modoCita: e.target.value })
                                    }
                                >
                                    <option value="">Seleccione</option>
                                    <option value="PRESENCIAL">Presencial</option>
                                    <option value="VIRTUAL">Virtual</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Select
                                    value={citaEditando.tipoContacto ?? ''}
                                    onChange={(e) =>
                                        setCitaEditando({ ...citaEditando, tipoContacto: Number(e.target.value) })
                                    }
                                >
                                    <option value="">Seleccione</option>
                                    <option value={0}>WhatsApp</option>
                                    <option value={1}>Llamada</option>
                                    <option value={2}>Email</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    value={citaEditando.estado || ''}
                                    onChange={(e) =>
                                        setCitaEditando({ ...citaEditando, estado: e.target.value })
                                    }
                                >
                                    <option value="">Seleccione</option>
                                    <option value="PENDIENTE">Pendiente</option>
                                    <option value="ATENDIDA">Atendida</option>
                                    <option value="CANCELADA">Cancelada</option>
                                    <option value="COMPLETADA">Completada</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (citaEditando) {
                                guardarEdicion({ ...citaEditando });
                            } else {
                                console.warn("❌ citaEditando es null al intentar guardar");
                                Swal.fire('Error', 'No hay una cita seleccionada para guardar.', 'error');
                            }
                        }}
                    >
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminCitas;
