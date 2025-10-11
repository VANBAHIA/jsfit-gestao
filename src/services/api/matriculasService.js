import api from './axiosConfig';

/**
 * Service para gerenciamento de Matrículas
 * Endpoints: /api/matriculas
 */
export const matriculasService = {
  /**
   * Lista todas as matrículas
   */
  listarTodos: async (params = {}) => {
    try {
      const response = await api.get('/matriculas', { params });
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao listar matrículas:', error);
      throw error;
    }
  },

  /**
   * Busca uma matrícula por ID
   */
  buscarPorId: async (id) => {
    try {
      if (!id) throw new Error('ID da matrícula é obrigatório');
      const response = await api.get(`/matriculas/${id}`);
      return { data: response.data };
    } catch (error) {
      console.error(`❌ Erro ao buscar matrícula ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cria uma nova matrícula
   */
  criar: async (dados) => {
    try {
      if (!dados.alunoId) throw new Error('Aluno é obrigatório');
      if (!dados.planoId) throw new Error('Plano é obrigatório');
      if (!dados.dataInicio) throw new Error('Data de início é obrigatória');

      const response = await api.post('/matriculas', dados);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar matrícula:', error);
      throw error;
    }
  },

  /**
   * Atualiza uma matrícula existente
   */
  atualizar: async (id, dados) => {
    try {
      if (!id) throw new Error('ID da matrícula é obrigatório');
      const response = await api.put(`/matriculas/${id}`, dados);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao atualizar matrícula ${id}:`, error);
      throw error;
    }
  },

  /**
   * Inativa uma matrícula
   */
  inativar: async (id, motivo) => {
    try {
      if (!id) throw new Error('ID da matrícula é obrigatório');
      const response = await api.patch(`/matriculas/${id}/inativar`, { motivo });
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao inativar matrícula ${id}:`, error);
      throw error;
    }
  },

  /**
   * Reativa uma matrícula
   */
  reativar: async (id) => {
    try {
      if (!id) throw new Error('ID da matrícula é obrigatório');
      const response = await api.patch(`/matriculas/${id}/reativar`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao reativar matrícula ${id}:`, error);
      throw error;
    }
  },

  /**
   * Exclui uma matrícula
   */
  excluir: async (id) => {
    try {
      if (!id) throw new Error('ID da matrícula é obrigatório');
      const response = await api.delete(`/matriculas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao excluir matrícula ${id}:`, error);
      throw error;
    }
  },

  /**
   * Lista matrículas por aluno
   */
  listarPorAluno: async (alunoId) => {
    try {
      if (!alunoId) throw new Error('ID do aluno é obrigatório');
      const response = await api.get('/matriculas', {
        params: { alunoId }
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao listar matrículas do aluno ${alunoId}:`, error);
      throw error;
    }
  }
};