export const obtenerCarrito = () => {
  const carrito = localStorage.getItem("carrito");
  return carrito ? JSON.parse(carrito) : [];
};

export const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

export const agregarProductoAlCarrito = (producto, cantidad = 1) => {
  const carrito = obtenerCarrito();
  const existe = carrito.find((item) => item.id === producto.id);

  if (existe) {
    existe.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito(carrito);
  window.dispatchEvent(new Event("storage"));
};

export const eliminarProductoDelCarrito = (idProducto) => {
  const carrito = obtenerCarrito().filter((item) => item.id !== idProducto);
  guardarCarrito(carrito);
};
