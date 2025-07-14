import axiosInstance from "../api/axiosInstance";

export const registrarLogAdmin = async ({
  accion,
  descripcion,
  tipo,
  adminId,
}) => {
  try {
    await axiosInstance.post("/admin/logs/registrar", {
      accion,
      descripcion,
      tipo,
      admin: { id: adminId },
    });
  } catch (err) {
    console.error("Error al registrar log:", err);
  }
};
