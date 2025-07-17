import axiosInstance from "../api/axiosInstance";

export const registrarAccionAdmin = async ({
  accion,
  descripcion,
  tipo,
  adminId,
}) => {
  try {
    const dto = {
      accion,
      descripcion,
      tipo,
      adminId,
    };
    await axiosInstance.post("/admin/logs/registrar", dto);
  } catch (err) {
    console.error("Error al registrar acción admin:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
  }
};
