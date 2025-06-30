import AxiosInstance from "../api/axiosInstance";

export const registrarProductoVisto = async (idUsuario, idProducto) => {
  await AxiosInstance.post(`/historial/usuario/${idUsuario}/producto/${idProducto}`);
};

export const obtenerHistorialUsuario = async (idUsuario) => {
  const res = await AxiosInstance.get(`/historial/usuario/${idUsuario}`);
  return res.data;
};
