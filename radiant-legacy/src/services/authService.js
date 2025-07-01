import axiosInstance from "../api/axiosInstance";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    localStorage.removeItem("userInfo");
    localStorage.setItem("usuario", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    const backendMessage =
      error.response?.data?.message || error.response?.data || "Error de login";

    throw new Error(backendMessage);
  }
};

export const registerUser = async ({
  nombreCompleto,
  telefono,
  direccion,
  email,
  password,
}) => {
  try {
    const response = await axiosInstance.post("/auth/registro", {
      nombreCompleto,
      telefono,
      direccion,
      credenciales: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error en el registro");
  }
};

export const updateProfile = async (userId, data) => {
  try {
    const response = await axiosInstance.put(`/auth/usuarios/${userId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar perfil"
    );
  }
};
