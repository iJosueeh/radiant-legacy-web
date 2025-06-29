import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductoPorId } from "../services/productoService";
import {
  getResenasAprobadas,
  crearResenaUsuario,
  getResenasDelUsuario
} from "../services/resenaService";
import { AuthContext } from "../context/AuthContext";
import StarRatingInput from "../components/StarRatingInput";
import StarRatingDisplay from "../components/StarRatingDisplay";

const ProductoPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [producto, setProducto] = useState(null);
  const [resenas, setResenas] = useState([]);
  const [miResena, setMiResena] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);

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
        <div className="col-md-6">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded shadow-sm" />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center rounded shadow-sm" style={{ height: "300px" }}>
              <span className="text-muted">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{producto.nombre}</h2>
          <p className="text-muted">{producto.descripcion}</p>
          <p className="fs-4 fw-bold text-primary">S/. {producto.precio}</p>
          <p className="text-muted">Stock disponible: <strong>{producto.stock}</strong></p>
          <button className="btn btn-dark mt-3">Añadir al carrito</button>
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
            className="mb-3 p-3 bg-light rounded shadow-sm border resena-hover"
            style={{
              transition: "all 0.3s",
              cursor: "default"
            }}
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