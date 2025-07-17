import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";
import { registrarAccionAdmin } from '../services/adminLogService';
import { AuthContext } from '../context/AuthContext';

const AdminProductos = () => {
    const { user } = useContext(AuthContext);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [productoActual, setProductoActual] = useState(null);
    const [proveedores, setProveedores] = useState([]);
    const [colecciones, setColecciones] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);

    const fetchProductos = async () => {
        try {
            const response = await axiosInstance.get("/productos");
            setProductos(response.data);
        } catch {
            Swal.fire("Error", "No se pudieron cargar los productos", "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchDatosAuxiliares = async () => {
        try {
            const [resProv, resCol] = await Promise.all([
                axiosInstance.get("/proveedores"),
                axiosInstance.get("/colecciones"),
            ]);
            setProveedores(resProv.data);
            setColecciones(resCol.data);
        } catch {
            console.error("Error al cargar proveedores o colecciones");
        }
    };

    const handleEditar = (producto) => {
        setModoEdicion(true);
        setProductoActual({ ...producto });
        setShowModal(true);
    };

    const handleAgregar = () => {
        setModoEdicion(false);
        setProductoActual({
            nombre: "",
            descripcion: "",
            precio: 0,
            cantidad: 0,
            stock: 0,
            proveedor: { id: "" },
            coleccion: { id: "" },
        });
        setShowModal(true);
    };

    const handleGuardarCambios = async () => {
        try {
            if (modoEdicion) {
                await axiosInstance.put(`/productos/${productoActual.id}`, productoActual);
                Swal.fire("Actualizado", "Producto actualizado correctamente", "success");

                await registrarAccionAdmin({
                    accion: "Editar producto",
                    descripcion: `El administrador editó el producto con ID ${productoActual.id}`,
                    tipo: "PRODUCTO",
                    adminId: user.id
                });

            } else {
                const res = await axiosInstance.post("/productos", productoActual);
                Swal.fire("Creado", "Producto agregado correctamente", "success");

                await registrarAccionAdmin({
                    accion: "Crear producto",
                    descripcion: `El administrador creó el producto con ID ${res.data?.id || 'nuevo'}`,
                    tipo: "PRODUCTO",
                    adminId: user.id
                });

                console.log("Producto guardado:", res.data);
            }

            setShowModal(false);
            fetchProductos();

        } catch (error) {
            console.error("Error en guardar producto:", error);
            Swal.fire("Error", "No se pudo guardar el producto", "error");
        }
    };

    const handleEliminar = async (id) => {
        const confirm = await Swal.fire({
            title: "¿Eliminar producto?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosInstance.delete(`/productos/${id}`);
                fetchProductos();
                Swal.fire("Eliminado", "Producto eliminado exitosamente", "success");

                await registrarAccionAdmin({
                    accion: "Eliminar producto",
                    descripcion: `El administrador eliminó el producto con ID ${id}`,
                    tipo: "PRODUCTO",
                    adminId: user.id
                });

            } catch {
                Swal.fire("Error", "No se pudo eliminar el producto", "error");
            }
        }
    };

    useEffect(() => {
        fetchProductos();
        fetchDatosAuxiliares();
    }, []);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">
                    <i className="bi bi-box-seam me-2"></i> Gestión de Productos
                </h2>
                <Button variant="success" onClick={handleAgregar}>
                    <i className="bi bi-plus-circle me-1"></i> Agregar Producto
                </Button>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3">Cargando productos...</p>
                </div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {productos.map((producto) => (
                        <Col key={producto.id}>
                            <Card className="shadow h-100">
                                <Card.Body>
                                    <Card.Title className="fw-bold mb-2">{producto.nombre}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        S/. {producto.precio.toFixed(2)}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Stock:</strong> {producto.stock}<br />
                                        <strong>Cantidad:</strong> {producto.cantidad}<br />
                                        <strong>Proveedor:</strong> {producto.proveedor?.nombre || "-"}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between">
                                    <Button variant="outline-primary" size="sm" onClick={() => handleEditar(producto)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(producto.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Modal Agregar / Editar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modoEdicion ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={productoActual?.nombre || ""}
                                onChange={(e) => setProductoActual({ ...productoActual, nombre: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={productoActual?.descripcion || ""}
                                onChange={(e) => setProductoActual({ ...productoActual, descripcion: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={productoActual?.precio || 0}
                                onChange={(e) =>
                                    setProductoActual({ ...productoActual, precio: parseFloat(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                value={productoActual?.cantidad || 0}
                                onChange={(e) =>
                                    setProductoActual({ ...productoActual, cantidad: parseInt(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                value={productoActual?.stock || 0}
                                onChange={(e) =>
                                    setProductoActual({ ...productoActual, stock: parseInt(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Select
                                value={productoActual?.proveedor?.id || ""}
                                onChange={(e) =>
                                    setProductoActual({ ...productoActual, proveedor: { id: parseInt(e.target.value) } })
                                }
                            >
                                <option value="">Seleccione un proveedor</option>
                                {proveedores.map((prov) => (
                                    <option key={prov.id} value={prov.id}>
                                        {prov.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Colección</Form.Label>
                            <Form.Select
                                value={productoActual?.coleccion?.id || ""}
                                onChange={(e) =>
                                    setProductoActual({ ...productoActual, coleccion: { id: parseInt(e.target.value) } })
                                }
                            >
                                <option value="">Seleccione una colección</option>
                                {colecciones.map((col) => (
                                    <option key={col.id} value={col.id}>
                                        {col.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGuardarCambios}>
                        {modoEdicion ? "Guardar Cambios" : "Agregar Producto"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminProductos;