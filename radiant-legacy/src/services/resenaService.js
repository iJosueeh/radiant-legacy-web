import axiosInstance from "../api/axiosInstance";

export const getResenasAprobadas = async (idProducto) => {
  const response = await axiosInstance.get(`/resenas/producto/${idProducto}/aprobadas`);
  return response.data;
};

export const crearResenaUsuario = async (idProducto, idUsuario, data) => {
  const response = await axiosInstance.post(`/resenas/producto/${idProducto}/usuario/${idUsuario}`, data);
  return response.data;
};

export const getResenasDelUsuario = async (idProducto, idUsuario) => {
  const response = await axiosInstance.get(`/resenas/producto/${idProducto}/usuario/${idUsuario}`);
  return response.data;
};