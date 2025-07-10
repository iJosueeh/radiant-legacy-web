import axiosInstance from "../api/axiosInstance";

export const crearPedido = async (pedido) => {
  const response = await axiosInstance.post("/pedidos/crear", pedido);
  return response.data;
};

export const obtenerPedidosPorUsuario = async (idUsuario) => {
  const res = await axiosInstance.get(`/pedidos/cliente/${idUsuario}/resumen`);
  return res.data;
};