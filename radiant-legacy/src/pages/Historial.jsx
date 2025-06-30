import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { obtenerHistorialUsuario } from "../services/historialService";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

const Historial = () => {
  const { user } = useContext(AuthContext);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        if (user?.id) {
          const data = await obtenerHistorialUsuario(user.id);
          setHistorial((data || []).reverse()); // Evita error si data es null
        }
      } catch (error) {
        console.error("Error al cargar historial:", error);
      }
    };

    cargarHistorial();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="card p-4 shadow-sm border-0 rounded-4 bg-white">
        <h3 className="fw-bold mb-4">
          <i className="bi bi-clock-history me-2"></i>
          Historial de productos vistos
        </h3>

        {historial.length === 0 ? (
          <p className="text-muted">Aún no has visto ningún producto.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {historial.map((item) => {
              const producto = item.producto;

              // Si no hay producto relacionado, ignoramos esta entrada
              if (!producto) return null;

              return (
                <div key={item.id} className="col">
                  <div className="card h-100 shadow-sm">
                    {producto.imagen ? (
                      <img
                        src={producto.imagen}
                        className="card-img-top"
                        alt={producto.nombre}
                      />
                    ) : (
                      <div
                        className="bg-light d-flex align-items-center justify-content-center"
                        style={{ height: "200px" }}
                      >
                        <span className="text-muted">Sin imagen</span>
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title text-primary fw-bold">
                        {producto.nombre}
                      </h5>
                      <p className="card-text small text-muted mb-2">
                        Visto el:{" "}
                        {item.fechaVisto
                          ? new Date(item.fechaVisto).toLocaleString()
                          : "Fecha no disponible"}
                      </p>
                      <Link
                        to={`/producto/${producto.id}`}
                        className="btn btn-outline-primary w-100"
                      >
                        Ver nuevamente
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Historial;