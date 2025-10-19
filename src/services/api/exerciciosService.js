// src/services/api/exerciciosService.js

import api from './axiosConfig';

export const exerciciosService = {
  /**
   * Lista todos os exercícios com paginação e filtros
   */
  async listarTodos(params = {}) {
    const { page = 1, limit = 50, busca = '', grupoId = '' } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(busca && { busca }),
      ...(grupoId && { grupoId })
    });

    return await api.get(`/exercicios?${queryParams}`);
  },

  /**
   * Busca um exercício por ID
   */
  async buscarPorId(id) {
    return await api.get(`/exercicios/${id}`);
  },

  /**
   * Cria um novo exercício
   */
  async criar(dados) {
    return await api.post('/exercicios', dados);
  },

  /**
   * Atualiza um exercício existente
   */
  async atualizar(id, dados) {
    return await api.put(`/exercicios/${id}`, dados);
  },

  /**
   * Exclui um exercício
   */
  async excluir(id) {
    return await api.delete(`/exercicios/${id}`);
  },

  /**
   * Upload de imagem do exercício
   */
  async uploadImagem(id, arquivo) {
    const formData = new FormData();
    formData.append('imagem', arquivo);
    
    return await api.post(`/exercicios/${id}/imagem`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default exerciciosService;