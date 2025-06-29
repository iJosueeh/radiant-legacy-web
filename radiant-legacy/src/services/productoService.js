import axiosInstance from "../api/axiosInstance";

export const getProductos = async () => {
  try {
    const response = await axiosInstance.get("/productos");
    return response.data;
  } catch {
    throw new Error("Error al obtener productos");
  }
};

export const getProductosPorCategoria = async (categoriaId) => {
  try {
    const response = await axiosInstance.get(
      `/productos/categoria/${categoriaId}`
    );
    return response.data;
  } catch {
    throw new Error("Error al obtener productos");
  }
};

export const getProductoPorId = async (id) => {
  const response = await axiosInstance.get(`/productos/${id}`);
  return response.data;
};
