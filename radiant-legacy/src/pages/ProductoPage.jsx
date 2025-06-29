import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductoPorId } from "../services/productoService";
import {
  getResenasAprobadas,
  crearResenaUsuario,
  getResenasDelUsuario
} from "../services/resenaService";
import { AuthContext } from "../context/AuthContext";
import StarRatingInput from "../components/StarRatingInput";
import StarRatingDisplay from "../components/StarRatingDisplay";
import { agregarProductoAlCarrito } from "../services/carritoService";

const ProductoPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [resenas, setResenas] = useState([]);
  const [miResena, setMiResena] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [cantidad, setCantidad] = useState(1);

  const cargarDatos = useCallback(async () => {
    try {
      const data = await getProductoPorId(id);
      setProducto(data);

      const resenasAprobadas = await getResenasAprobadas(id);
      setResenas(resenasAprobadas);

      if (user?.id) {
        const resenaUsuario = await getResenasDelUsuario(id, user.id);
        if (resenaUsuario.length > 0) {
          setMiResena(resenaUsuario[0]);
        }
      }
    } catch (error) {
      console.error("Error al cargar producto o reseñas:", error);
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleAgregarAlCarrito = () => {
    if (!user) return alert("Debes iniciar sesión para añadir al carrito.");

    if (cantidad < 1 || cantidad > producto.stock) {
      return alert("Cantidad inválida.");
    }

    agregarProductoAlCarrito(producto, cantidad);
    navigate("/carrito");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión para dejar una reseña.");

    try {
      await crearResenaUsuario(id, user.id, {
        comentario,
        calificacion
      });
      alert("Tu reseña ha sido enviada y está pendiente de aprobación.");
      setComentario("");
      setCalificacion(5);
      setLoading(true);
      await cargarDatos();
    } catch (error) {
      console.error("Error al enviar reseña:", error);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando producto...</div>;
  if (!producto) return <div className="text-center mt-5 text-danger">Producto no encontrado.</div>;

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex justify-content-start mb-4">
        <Link to={`/catalogo/${producto.coleccion?.id}`} className="btn btn-outline-secondary">
          ← Volver a {producto.coleccion?.nombre ?? "catálogo"}
        </Link>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded shadow-sm" />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center rounded shadow-sm" style={{ height: "300px" }}>
              <span className="text-muted">Sin imagen</span>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <div className="card p-4 shadow-sm border-0 rounded-4 bg-white">
            <h2 className="fw-bold mb-3">{producto.nombre}</h2>

            <p className="text-muted mb-2">{producto.descripcion}</p>

            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="fs-4 fw-bold text-primary">S/. {producto.precio.toFixed(2)}</span>
              <span className={`badge px-3 py-2 ${producto.stock > 0 ? "bg-success" : "bg-danger"}`}>
                {producto.stock > 0 ? "Disponible" : "Agotado"}
              </span>
            </div>

            <div className="mb-3">
              <label className="form-label text-muted">
                <i className="bi bi-box-seam me-2"></i> Stock disponible:
              </label>
              <span className="fw-semibold">{producto.stock}</span>
            </div>

            <div className="mb-4">
              <label className="form-label">Cantidad:</label>
              <input
                type="number"
                className="form-control w-50"
                value={cantidad}
                min="1"
                max={producto.stock}
                onChange={(e) => setCantidad(Number(e.target.value))}
                disabled={producto.stock === 0}
              />
            </div>

            <button
              className="btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2 py-2"
              onClick={handleAgregarAlCarrito}
              disabled={producto.stock === 0}
            >
              <i className="bi bi-cart-plus"></i>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      <hr />
      <h4 className="fw-bold mb-3">Reseñas del producto</h4>

      {resenas.length === 0 ? (
        <p className="text-muted">Aún no hay reseñas aprobadas para este producto.</p>
      ) : (
        resenas.map((resena) => (
          <div
            key={resena.id}
            className="mb-3 p-3 bg-light rounded shadow-sm border"
            style={{ transition: "all 0.3s", cursor: "default" }}
          >
            <strong>Calificación:</strong>{" "}
            <StarRatingDisplay value={resena.calificacion} />
            <br />
            <strong>Comentario:</strong> {resena.comentario}
          </div>
        ))
      )}

      <hr />
      <h5 className="mt-4">Deja tu reseña</h5>

      {miResena ? (
        <div className="alert alert-info">
          Ya enviaste una reseña para este producto. Estado: <strong>{miResena.estado}</strong>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Calificación:</label>
            <StarRatingInput value={calificacion} onChange={setCalificacion} />
          </div>
          <div className="mb-3">
            <label className="form-label">Comentario:</label>
            <textarea
              className="form-control"
              rows="3"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Enviar reseña</button>
        </form>
      )}
    </div>
  );
};

export default ProductoPage;