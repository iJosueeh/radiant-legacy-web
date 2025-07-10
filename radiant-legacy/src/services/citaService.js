import AxiosInstance from "../api/axiosInstance";

export const enviarCita = (data) => {
  const response = AxiosInstance.post("/api/citas", data);
  return response.data;
};
