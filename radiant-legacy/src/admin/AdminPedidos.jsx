import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';
import { Table, Button, Badge, Modal } from 'react-bootstrap';

const AdminPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchPedidos = async () => {
        try {
            const res = await axiosInstance.get('/pedidos');
            setPedidos(res.data);
        } catch {
            Swal.fire('Error', 'No se pudieron cargar los pedidos', 'error');
        } finally {
            setLoading(false);
        }
    };

    const procesarSiguiente = async () => {
        const confirm = await Swal.fire({
            title: '¿Procesar el siguiente pedido en cola?',
            text: 'Se actualizará su estado y reducirá el stock si hay disponibilidad.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, procesar',
            cancelButtonText: 'Cancelar',
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosInstance.post('/pedidos/procesar-siguiente');

            if (!res.data || res.status === 204) {
                Swal.fire('Sin pedidos', 'No hay pedidos pendientes en la cola.', 'info');
            } else {
                const pedido = res.data;
                Swal.fire({
                    title: 'Pedido procesado',
                    html: `
                        <p><strong>ID:</strong> ${pedido.id}</p>
                        <p><strong>Cliente:</strong> ${pedido.nombreCliente || '—'}</p>
                        <p><strong>Tipo de Envío:</strong> ${pedido.tipoEnvio}</p>
                        `,
                    icon: 'success',
                });
                fetchPedidos();
            }
        } catch {
            Swal.fire('Error', 'No se pudo procesar el pedido', 'error');
        }
    };

    const deshacerUltimo = async () => {
        const confirm = await Swal.fire({
            title: '¿Deshacer el último pedido procesado?',
            text: 'Esto restaurará su stock y lo devolverá a estado pendiente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, deshacer',
            cancelButtonText: 'Cancelar',
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosInstance.post('/pedidos/deshacer');

            if (!res.data || res.status === 204) {
                Swal.fire('Nada que deshacer', 'No hay pedidos recientes para revertir.', 'info');
                return;
            }

            Swal.fire({
                title: 'Pedido revertido',
                html: `
                    <p><strong>ID:</strong> ${res.data.id}</p>
                    <p><strong>Cliente:</strong> ${res.data.nombreCliente || '—'}</p>
                    <p><strong>Tipo de Envío:</strong> ${res.data.tipoEnvio}</p>
                    `,
                icon: 'success',
            });



            fetchPedidos();
        } catch {
            Swal.fire('Error', 'No se pudo deshacer el pedido.', 'error');
        }
    };

    const cancelarPedido = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Cancelar este pedido?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosInstance.put(`/pedidos/${id}/cancelar`);
            Swal.fire('Cancelado', 'El pedido fue cancelado correctamente.', 'success');
            fetchPedidos();
        } catch {
            Swal.fire('Error', 'No se pudo cancelar el pedido.', 'error');
        }
    };

    const badgeColor = (estado) => {
        switch (estado) {
            case 'PENDIENTE': return 'secondary';
            case 'EN_PROCESO': return 'warning';
            case 'ENVIADO': return 'success';
            case 'CANCELADO': return 'danger';
            default: return 'light';
        }
    };

    const abrirDetalles = async (pedidoId) => {
        try {
            const res = await axiosInstance.get(`/pedidos/cliente/${pedidoId}/resumen`);
            const pedido = res.data.find((p) => p.id === pedidoId);
            setPedidoSeleccionado(pedido);
            setShowModal(true);
        } catch {
            Swal.fire('Error', 'No se pudo cargar el detalle del pedido', 'error');
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold"><i className="bi bi-truck me-2"></i> Gestión de Pedidos</h2>
                <div className="d-flex gap-2">
                    <Button variant="primary" onClick={procesarSiguiente}>
                        <i className="bi bi-play-circle"></i> Procesar siguiente
                    </Button>
                    <Button variant="outline-danger" onClick={deshacerUltimo}>
                        <i className="bi bi-arrow-counterclockwise"></i> Deshacer último
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2">Cargando pedidos...</p>
                </div>
            ) : (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Tipo Envío</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.id_cliente?.nombreCompleto || '—'}</td>
                                <td>{new Date(pedido.fecha).toLocaleString()}</td>
                                <td>S/. {pedido.total_final?.toFixed(2)}</td>
                                <td>
                                    <Badge bg={badgeColor(pedido.estado)}>{pedido.estado}</Badge>
                                </td>
                                <td>{pedido.tipoEnvio}</td>
                                <td className="d-flex gap-2">
                                    <Button
                                        variant="outline-dark"
                                        size="sm"
                                        onClick={() => abrirDetalles(pedido.id)}
                                    >
                                        <i className="bi bi-eye"></i> Ver
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => cancelarPedido(pedido.id)}
                                    >
                                        <i className="bi bi-x-circle"></i> Cancelar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* MODAL DETALLES */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalle del Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pedidoSeleccionado ? (
                        <>
                            <p><strong>Fecha:</strong> {new Date(pedidoSeleccionado.fecha).toLocaleString()}</p>
                            <p><strong>Estado:</strong> {pedidoSeleccionado.estado}</p>
                            <p><strong>Tipo de Envío:</strong> {pedidoSeleccionado.tipoEnvio}</p>
                            <p><strong>Total:</strong> S/. {pedidoSeleccionado.total.toFixed(2)}</p>

                            <h5 className="mt-4">Productos</h5>
                            <Table bordered size="sm">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unitario</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidoSeleccionado.detalles.map((detalle, i) => (
                                        <tr key={i}>
                                            <td>{detalle.nombreProducto}</td>
                                            <td>{detalle.cantidad}</td>
                                            <td>S/. {detalle.precioUnitario.toFixed(2)}</td>
                                            <td>S/. {detalle.subtotal.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <p>No hay información disponible</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminPedidos;