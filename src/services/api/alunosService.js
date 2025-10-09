import api from './axiosConfig';

export const alunosService = {
  listarTodos: async (params = {}) => {
    const response = await api.get('/alunos', { params });
    return response.data;
  },

  buscarPorId: async (id) => {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  },

  criar: async (dados) => {
    const response = await api.post('/alunos', dados);
    return response.data;
  },

atualizar: async (id, dados) => {
  // Atualiza aluno E pessoa em cascata
  const response = await api.put(`/alunos/${id}`, {
    ...dados,
    atualizarPessoa: true // Flag para backend processar
  });
  return response.data;
}, 

  excluir: async (id) => {
    const response = await api.delete(`/alunos/${id}`);
    return response.data;
  }
};