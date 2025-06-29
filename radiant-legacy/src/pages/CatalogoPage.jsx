import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductosPorCategoria } from "../services/productoService";
import CatalogCard from "../components/CatalogCard";

const CatalogoPage = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nombreCategoria, setNombreCategoria] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setProductos([]);
        const data = await getProductosPorCategoria(id);
        setProductos(data);
        if (data.length > 0) {
          setNombreCategoria(data[0].coleccion?.nombre || "Catálogo");
        } else {
          setNombreCategoria("Catálogo vacío");
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  return (
    <div className="container catalogo-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">{nombreCategoria}</h2>
        <Link to="/" className="btn btn-outline-secondary">← Volver</Link>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : productos.length === 0 ? (
        <div className="alert alert-warning text-center">No hay productos disponibles.</div>
      ) : (
        <div className="row">
          {productos.map((prod) => (
            <div key={prod.id} className="col-md-4 mb-4">
              <CatalogCard
                id={prod.id}
                title={prod.nombre}
                description={prod.descripcion}
                image={prod.imagen}
                categoriaId={prod.coleccion?.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogoPage;