import axiosInstance from "../api/axiosInstance";

export const getResenasAprobadas = async (idProducto) => {
  const response = await axiosInstance.get(
    `/resenas/producto/${idProducto}/aprobadas`
  );
  return response.data;
};

export const crearResenaUsuario = async (idProducto, idUsuario, data) => {
  const response = await axiosInstance.post(
    `/resenas/producto/${idProducto}/usuario/${idUsuario}`,
    data
  );
  return response.data;
};

export const getResenasDelUsuario = async (idProducto, idUsuario) => {
  const response = await axiosInstance.get(
    `/resenas/producto/${idProducto}/usuario/${idUsuario}`
  );
  return response.data;
};

export const getResenasPorUsuario = async (idUsuario) => {
  const response = await axiosInstance.get(`/resenas/usuario/${idUsuario}`);
  return response.data;
};

export const actualizarResena = async (idResena, data) => {
  const response = await axiosInstance.put(`/resenas/${idResena}`, data);
  return response.data;
};

export const eliminarResena = async (idResena, idUsuario) => {
  const response = await fetch(`/resenas/${idResena}/usuario/${idUsuario}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return true;
};