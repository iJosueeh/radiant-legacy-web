import axiosInstance from "../api/axiosInstance";

export const obtenerTodosPedidos = async () => {
  const response = await axiosInstance.get("/pedidos/admin/lista");
  return response.data;
};

export const procesarSiguientePedido = async () => {
  const response = await axiosInstance.post("/pedidos/procesar-siguiente");
  return response.data;
};

export const cancelarPedido = async (id) => {
  await axiosInstance.put(`/pedidos/${id}/cancelar`);
};
