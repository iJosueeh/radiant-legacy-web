import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../context/AuthContext";
import { obtenerPedidosPorUsuario } from "../services/pedidoService";
import { Badge, Modal, Button, Card } from "react-bootstrap";

// Función auxiliar para color de estado
const colorBadge = (estado) => {
  switch (estado) {
    case "ENTREGADO":
      return "success";
    case "EN_PROCESO":
      return "warning";
    case "CANCELADO":
      return "danger";
    default:
      return "secondary";
  }
};

// Función auxiliar para ícono de estado
const iconoPorEstado = (estado) => {
  switch (estado) {
    case "ENTREGADO":
      return <i className="bi bi-check-circle-fill text-success me-1"></i>;
    case "EN_PROCESO":
      return <i className="bi bi-hourglass-split text-warning me-1"></i>;
    case "CANCELADO":
      return <i className="bi bi-x-circle-fill text-danger me-1"></i>;
    default:
      return <i className="bi bi-clock-fill text-secondary me-1"></i>;
  }
};

const Pedidos = () => {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [estadoFiltro, setEstadoFiltro] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");

  const abrirModal = (pedido) => {
    setPedidoSeleccionado(pedido);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setPedidoSeleccionado(null);
    setMostrarModal(false);
  };

  useEffect(() => {
    const cargarPedidos = async () => {
      if (user?.id) {
        try {
          const data = await obtenerPedidosPorUsuario(user.id);
          setPedidos(data.reverse());
        } catch (err) {
          console.error("Error al obtener pedidos:", err);
        }
      }
    };
    cargarPedidos();
  }, [user]);

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideEstado =
      estadoFiltro === "TODOS" || pedido.estado === estadoFiltro;

    const coincideBusqueda =
      pedido.id.toString().includes(busqueda) ||
      new Date(pedido.fecha).toLocaleDateString().includes(busqueda);

    return coincideEstado && coincideBusqueda;
  });

  return (
    <DashboardLayout>
      <div className="card p-4 shadow-sm border-0 rounded-4 bg-white">
        <h3 className="fw-bold mb-4 text-center">
          <i className="bi bi-box-seam me-2"></i>Mis Pedidos
        </h3>

        <div className="mb-4 d-flex flex-wrap gap-2 justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <select
              className="form-select"
              style={{ width: "180px" }}
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
            >
              <option value="TODOS">Todos los estados</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROCESO">En proceso</option>
              <option value="ENTREGADO">Entregado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>

            <input
              type="text"
              className="form-control"
              placeholder="Buscar por ID o fecha"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {pedidosFiltrados.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-inbox-fill fs-1 mb-3"></i>
            <p className="fs-5">No se encontraron pedidos con esos criterios.</p>
          </div>
        ) : (
          <div className="row g-3">
            {pedidosFiltrados.map((pedido) => (
              <div key={pedido.id} className="col-md-6 col-lg-4">
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <Card.Title className="mb-2 fw-semibold">
                      Pedido #{pedido.id}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <i className="bi bi-calendar-event me-1"></i>{" "}
                      {new Date(pedido.fecha).toLocaleString()}
                    </Card.Subtitle>

                    <p className="mb-1">
                      {iconoPorEstado(pedido.estado)}
                      <strong>Estado:</strong>{" "}
                      <Badge bg={colorBadge(pedido.estado)}>
                        {pedido.estado}
                      </Badge>
                    </p>

                    <p className="mb-1">
                      <i className="bi bi-truck me-1"></i>
                      <strong>Envío:</strong> {pedido.tipoEnvio}
                    </p>

                    <p className="mb-3">
                      <i className="bi bi-currency-dollar me-1"></i>
                      <strong>Total:</strong> S/{" "}
                      {pedido.total != null ? pedido.total.toFixed(2) : "0.00"}
                    </p>

                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => abrirModal(pedido)}
                    >
                      <i className="bi bi-eye me-1"></i>Ver Detalles
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Detalles */}
        {pedidoSeleccionado && (
          <Modal show={mostrarModal} onHide={cerrarModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Detalles del Pedido #{pedidoSeleccionado.id}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(pedidoSeleccionado.fecha).toLocaleString()}
              </p>
              <p>
                <strong>Tipo de Envío:</strong> {pedidoSeleccionado.tipoEnvio}
              </p>
              <hr />
              <h5>Productos:</h5>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidoSeleccionado.detalles?.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.nombreProducto}</td>
                      <td>{detalle.cantidad}</td>
                      <td>S/ {detalle.precioUnitario.toFixed(2)}</td>
                      <td>S/ {detalle.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
              <h5 className="text-end">
                Total: S/{" "}
                {pedidoSeleccionado.total != null
                  ? pedidoSeleccionado.total.toFixed(2)
                  : "0.00"}
              </h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrarModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pedidos;