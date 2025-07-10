import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { crearPedido } from "../services/pedidoService";
import {
  eliminarProductoDelCarrito,
  obtenerCarrito,
  guardarCarrito,
} from "../services/carritoService";
import Swal from "sweetalert2";

const ProductoCarrito = ({ item, actualizarCantidad, eliminarProducto }) => (
  <div className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm bg-white">
    <div className="d-flex align-items-center gap-3">
      {item.imagen && (
        <img
          src={item.imagen}
          alt={item.nombre}
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
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
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Debes iniciar sesión con un correo válido para realizar el pedido.",
        confirmButtonText: "Ir a iniciar sesión",
      }).then(() => navigate("/login"));
      return;
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

      const primerProducto = carrito[0];

      await Swal.fire({
        icon: "success",
        title: "Pedido realizado",
        text: "¡Gracias por tu compra!",
        confirmButtonColor: "#3085d6",
      });

      localStorage.removeItem("carrito");
      setCarrito([]);

      if (primerProducto?.id) {
        navigate(`/producto/${primerProducto.id}`);
      } else {
        navigate(`/catalogo/${primerProducto.id}`);
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al procesar tu pedido. Intenta nuevamente.",
      });
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const cantidad = Math.max(1, Number(nuevaCantidad));
    const actualizado = carrito.map((item) =>
      item.id === id ? { ...item, cantidad } : item
    );
    guardarCarrito(actualizado);
    setCarrito(actualizado);

    // Opcional: mensaje al usuario
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: "Cantidad actualizada",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const eliminarProducto = (idProducto) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este producto será eliminado del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProductoDelCarrito(idProducto);
        setCarrito(obtenerCarrito());
        Swal.fire("Eliminado", "El producto fue eliminado del carrito.", "success");
      }
    });
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
              <p><strong>Total: S/. {total.toFixed(2)}</strong></p>

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