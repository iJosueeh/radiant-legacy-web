import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { crearPedido } from "../services/pedidoService";
import {
  eliminarProductoDelCarrito,
  obtenerCarrito,
  guardarCarrito,
} from "../services/carritoService";

const ProductoCarrito = ({ item, actualizarCantidad, eliminarProducto }) => (
  <div className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm bg-white">
    <div className="d-flex align-items-center gap-3">
      {item.imagen && (
        <img
          src={item.imagen}
          alt={item.nombre}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
          }}
          className="rounded"
        />
      )}
      <div>
        <strong>{item.nombre}</strong>
        <br />
        <span>Precio: S/. {item.precio.toFixed(2)}</span>
        <br />
        <input
          type="number"
          min="1"
          className="form-control form-control-sm w-50 mt-1"
          value={item.cantidad}
          onChange={(e) => actualizarCantidad(item.id, e.target.value)}
        />
      </div>
    </div>
    <button
      className="btn btn-danger btn-sm"
      onClick={() => eliminarProducto(item.id)}
    >
      Eliminar
    </button>
  </div>
);

const CarritoPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState(obtenerCarrito());
  const [tipoEnvio, setTipoEnvio] = useState("NORMAL");

  useEffect(() => {
    const handleStorageChange = () => {
      setCarrito(obtenerCarrito());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const descuento = 0;
  const total = subtotal - descuento;

  const handleOrdenar = async () => {
    if (!user || !user.id || !user.email) {
      alert("Debes iniciar sesión con un correo válido para realizar el pedido.");
      return navigate("/login");
    }

    const pedido = {
      idCliente: user.id,
      idCupon: null,
      tipoEnvio,
      subtotal,
      descuento,
      detalles: carrito.map((item) => ({
        idProducto: item.id,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
      })),
    };

    try {
      await crearPedido(pedido);
      alert("Pedido realizado correctamente. ¡Gracias por tu compra!");
      localStorage.removeItem("carrito");
      setCarrito([]);
      navigate("/catalogo");
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Hubo un problema al procesar tu pedido.");
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const cantidad = Math.max(1, Number(nuevaCantidad));
    const actualizado = carrito.map((item) =>
      item.id === id ? { ...item, cantidad } : item
    );
    guardarCarrito(actualizado);
    setCarrito(actualizado);
  };

  const eliminarProducto = (idProducto) => {
    eliminarProductoDelCarrito(idProducto);
    setCarrito(obtenerCarrito());
  };

  return (
    <div className="container carrito-page">
      <h2 className="mb-4">Tu carrito</h2>

      {carrito.length === 0 ? (
        <div className="alert alert-warning text-center">No hay productos en el carrito.</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {carrito.map((item) => (
              <ProductoCarrito
                key={item.id}
                item={item}
                actualizarCantidad={actualizarCantidad}
                eliminarProducto={eliminarProducto}
              />
            ))}
          </div>

          <div className="col-md-4">
            <div className="p-3 border rounded bg-light shadow-sm">
              <h5>Resumen del pedido</h5>
              <p>Subtotal: S/. {subtotal.toFixed(2)}</p>
              <p>Descuento: S/. {descuento.toFixed(2)}</p>
              <p>
                <strong>Total: S/. {total.toFixed(2)}</strong>
              </p>

              <div className="mb-3">
                <label className="form-label">Tipo de envío:</label>
                <select
                  className="form-select"
                  value={tipoEnvio}
                  onChange={(e) => setTipoEnvio(e.target.value)}
                >
                  <option value="NORMAL">Normal</option>
                  <option value="PREMIUM">Premium (alta prioridad)</option>
                  <option value="ECONOMICO">Económico (baja prioridad)</option>
                </select>
              </div>

              <button className="btn btn-primary w-100" onClick={handleOrdenar}>
                Ordenar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoPage;