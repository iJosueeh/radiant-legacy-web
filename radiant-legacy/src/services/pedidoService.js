import axiosInstance from "../api/axiosInstance";

export const crearPedido = async (pedido) => {
  const response = await axiosInstance.post("/crear", pedido);
  return response.data;
};
