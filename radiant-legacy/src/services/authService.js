import axiosInstance from "../api/axiosInstance";

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (nombre, email, password) => {
  const response = await axiosInstance.post("/auth/register", {
    nombre,
    email,
    password,
  });
  return response.data;
};
