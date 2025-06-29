import { useEffect, useState } from "react";

export const useCarritoCount = () => {
  const [count, setCount] = useState(0);

  const actualizar = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCount(total);
  };

  useEffect(() => {
    actualizar();
    window.addEventListener("storage", actualizar);
    return () => window.removeEventListener("storage", actualizar);
  }, []);

  return { count, actualizar };
};