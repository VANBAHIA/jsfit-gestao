import api from './axiosConfig';

export const funcoesService = {
  listarTodos: async (params = {}) => {
    const response = await api.get('/funcoes', { params });
    return response.data;
  }
};