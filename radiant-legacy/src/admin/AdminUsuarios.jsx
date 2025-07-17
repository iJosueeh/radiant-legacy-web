import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import { registrarAccionAdmin } from '../services/adminLogService';
import { AuthContext } from '../context/AuthContext';

const AdminUsuarios = () => {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const response = await axiosInstance.get("/auth/usuarios");
      setUsuarios(response.data);
    } catch {
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleEstado = async (id, estadoActual) => {
    const accion = estadoActual === "ACTIVO" ? "desactivar" : "activar";
    try {
      await axiosInstance.put(`/auth/usuarios/${id}/${accion}`);
      Swal.fire({
        icon: "success",
        title: `Usuario, nuevo estado "${accion}" correctamente`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("Registrando acción con adminId:", user?.id);
      await registrarAccionAdmin({
        accion: estadoActual === "ACTIVO" ? "Desactivación de usuario" : "Activación de usuario",
        descripcion: `El administrador ${user.nombreCompleto} ${estadoActual === "ACTIVO" ? "desactivó" : "activó"} al usuario con ID ${id}.`,
        tipo: "USUARIO",
        adminId: user.id
      });

      console.log("Registrando acción con adminId:", user?.id);

      fetchUsuarios();
    } catch {
      Swal.fire("Error", "No se pudo cambiar el estado del usuario", "error");
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioActual({ ...usuario });
    setShowModal(true);
  };

  const handleGuardarCambios = async () => {
    try {
      await axiosInstance.put(`/auth/usuarios/${usuarioActual.id}`, usuarioActual);

      await registrarAccionAdmin({
        accion: "Edición de usuario",
        descripcion: `El administrador ${user.nombreCompleto} editó al usuario con ID ${usuarioActual.id}.`,
        tipo: "USUARIO",
        adminId: user.id
      });
      setShowModal(false);
      fetchUsuarios();
      Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
    } catch {
      Swal.fire("Error", "No se pudo actualizar el usuario", "error");
    }
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este usuario será eliminado (estado inactivo).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.put(`/auth/usuarios/${id}/desactivar`);
          fetchUsuarios();
          Swal.fire("Eliminado", "El usuario fue desactivado.", "success");

          await registrarAccionAdmin({
            accion: "Eliminación de usuario",
            descripcion: `El administrador ${user.nombreCompleto} eliminó (desactivó) al usuario con ID ${id}.`,
            tipo: "USUARIO",
            adminId: user.id
          });
        } catch {
          Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">
        <i className="bi bi-people-fill me-2"></i> Gestión de Usuarios
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Cargando usuarios...</p>
        </div>
      ) : (
        <div className="row g-4">
          {usuarios.map((usuario) => {
            const inicial = usuario.nombreCompleto?.charAt(0)?.toUpperCase() || "U";

            return (
              <div className="col-md-6 col-lg-4" key={usuario.id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "45px",
                          height: "45px",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {inicial}
                      </div>
                      <div className="text-start">
                        <h5 className="mb-0 fw-semibold">{usuario.nombreCompleto}</h5>
                        <small className="text-muted">{usuario.email}</small>
                      </div>
                    </div>

                    <div className="text-start mb-2">
                      <p className="mb-1">
                        <i className="bi bi-telephone me-2"></i>
                        {usuario.telefono}
                      </p>
                      <p className="mb-1">
                        <i className="bi bi-geo-alt me-2"></i>
                        {usuario.direccion}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span
                        className={`badge rounded-pill ${usuario.estado === "ACTIVO" ? "bg-success" : "bg-secondary"
                          }`}
                      >
                        {usuario.estado}
                      </span>
                      <span className="badge bg-info text-dark text-uppercase">{usuario.rol}</span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary w-100"
                        onClick={() => handleEditar(usuario)}
                      >
                        <i className="bi bi-pencil-square me-1"></i> Editar
                      </button>
                      <button
                        className={`btn btn-sm w-100 ${usuario.estado === "ACTIVO"
                          ? "btn-outline-danger"
                          : "btn-outline-success"
                          }`}
                        onClick={() => toggleEstado(usuario.id, usuario.estado)}
                      >
                        {usuario.estado === "ACTIVO" ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-dark w-100"
                        onClick={() => handleEliminar(usuario.id)}
                      >
                        <i className="bi bi-trash me-1"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                value={usuarioActual?.nombreCompleto || ""}
                onChange={(e) =>
                  setUsuarioActual({ ...usuarioActual, nombreCompleto: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={usuarioActual?.telefono || ""}
                onChange={(e) =>
                  setUsuarioActual({ ...usuarioActual, telefono: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={usuarioActual?.direccion || ""}
                onChange={(e) =>
                  setUsuarioActual({ ...usuarioActual, direccion: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUsuarios;