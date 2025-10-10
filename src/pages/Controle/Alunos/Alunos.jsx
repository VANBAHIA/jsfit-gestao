import React, { useState, useEffect } from 'react';
import { Users, Search, Loader, Edit, Trash2, Plus } from 'lucide-react';
import { alunosService } from '../../../services/api/alunosService';
import AlunoForm from './AlunoForm';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import { pessoasService } from '../../../services/api/pessoasService';


function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, aluno: null });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      const dados = await alunosService.listarTodos();
      setAlunos(dados.data || []);
      setErro(null);
    } catch (error) {
      setErro('Erro ao carregar alunos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNovoAluno = () => {
    setAlunoSelecionado(null);
    setMostrarForm(true);
  };

const handleEditarAluno = async (aluno) => {
  try {
    // ✅ Buscar dados completos do aluno antes de editar
    const alunoCompleto = await alunosService.buscarPorId(aluno.id);
    setAlunoSelecionado(alunoCompleto.data); // ← Importante: usar .data
    setMostrarForm(true);
  } catch (error) {
    alert('Erro ao carregar dados do aluno: ' + error.message);
  }
};


const handleSalvarAluno = async (dados) => {
  try {
    setSalvando(true);
    
    if (alunoSelecionado) {
      // ✅ EDIÇÃO: Atualiza pessoa e aluno
      if (dados.pessoa) {
        await pessoasService.atualizar(dados.pessoaId, dados.pessoa);
      }
      await alunosService.atualizar(alunoSelecionado.id, {
        ...dados,
        pessoa: undefined // Remove do payload do aluno
      });
    } else {
      // ✅ CRIAÇÃO: Cria pessoa primeiro, depois aluno
      console.log('👤 Criando pessoa:', dados.pessoa);
      const pessoaCriada = await pessoasService.criar(dados.pessoa);
      console.log('✅ Pessoa criada:', pessoaCriada);
      
      // Pega o ID da pessoa criada (ajuste conforme retorno do backend)
      const pessoaId = pessoaCriada.id || pessoaCriada.data?.id;
      
      console.log('👨‍🎓 Criando aluno com pessoaId:', pessoaId);
      const dadosAluno = {
        pessoaId,
        vldExameMedico: dados.vldExameMedico,
        vldAvaliacao: dados.vldAvaliacao,
        objetivo: dados.objetivo,
        profissao: dados.profissao,
        empresa: dados.empresa,
        responsavel: dados.responsavel,
        horarios: dados.horarios,
        controleAcesso: dados.controleAcesso
      };
      
      const alunoCriado = await alunosService.criar(dadosAluno);
      console.log('✅ Aluno criado:', alunoCriado);
    }
    
    setMostrarForm(false);
    setAlunoSelecionado(null);
    await carregarAlunos();
  } catch (error) {
    console.error('❌ Erro detalhado:', error);
    console.error('❌ Resposta do servidor:', error.response?.data);
    alert('Erro ao salvar aluno: ' + (error.response?.data?.error || error.response?.data?.message || error.message));
  } finally {
    setSalvando(false);
  }
};


  const handleConfirmarExclusao = (aluno) => {
    setConfirmDelete({ isOpen: true, aluno });
  };

  const handleExcluirAluno = async () => {
    try {
      await alunosService.excluir(confirmDelete.aluno.id);
      setConfirmDelete({ isOpen: false, aluno: null });
      carregarAlunos();
    } catch (error) {
      alert('Erro ao excluir aluno: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Gestão de Alunos</h2>
              <p className="text-sm text-gray-600">Total: {alunos.length} alunos</p>
            </div>
          </div>
          <button onClick={handleNovoAluno}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold shadow-md">
            <Plus size={20} />
            Novo Aluno
          </button>
        </div>

        {erro && (
          <div className="m-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {erro}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nome</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">CPF</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Situação</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{aluno.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {aluno.pessoa?.nome1 || 'Sem nome'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {aluno.pessoa?.doc1 || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      aluno.pessoa?.situacao === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {aluno.pessoa?.situacao || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEditarAluno(aluno)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg" title="Editar">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleConfirmarExclusao(aluno)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg" title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {alunos.length === 0 && !erro && (
          <div className="p-8 text-center text-gray-500">
            Nenhum aluno cadastrado
          </div>
        )}
      </div>

{mostrarForm && (
  <AlunoForm
    aluno={alunoSelecionado}
    onSalvar={handleSalvarAluno}
    onCancelar={() => {
      setMostrarForm(false);
      setAlunoSelecionado(null); // ✅ Limpar ao cancelar
    }}
    salvando={salvando} // ✅ Nova prop
  />
)}

      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        titulo="Confirmar Exclusão"
        mensagem={`Tem certeza que deseja excluir o aluno ${confirmDelete.aluno?.pessoa?.nome1}? Todos os dados relacionados serão permanentemente removidos.`}
        onConfirmar={handleExcluirAluno}
        onCancelar={() => setConfirmDelete({ isOpen: false, aluno: null })}
      />
    </div>
  );
}

export default Alunos;