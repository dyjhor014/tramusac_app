import axios from 'axios';

const API_BASE_URL = 'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/usuarios';

export const registerUser = async (name: string, email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/registro`, { nombre: name, correo: email, password });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/iniciar_sesion`, { correo: email, password });
};
