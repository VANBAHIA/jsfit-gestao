import React, { useState, useEffect } from 'react';
import { FileText, Search, Loader, Edit, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';
import { matriculasService } from '../../../services/api/matriculasService';
import MatriculaWizard from './MatriculaWizard';
import ConfirmDialog from '../../../components/common/ConfirmDialog';

function Matriculas() {
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [mostrarWizard, setMostrarWizard] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, matricula: null, acao: null });
  const [busca, setBusca] = useState('');

  useEffect(() => {
    carregarMatriculas();
  }, []);

  const carregarMatriculas = async () => {
    try {
      setLoading(true);
      const resposta = await matriculasService.listarTodos();
      console.log('📦 Resposta da API:', resposta);

      setMatriculas(resposta.data?.data?.matriculas || []);

      setErro(null);
    } catch (error) {
      setErro('Erro ao carregar matrículas');
      console.error('❌ Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNovaMatricula = () => {
    setMostrarWizard(true);
  };

  const handleSucessoMatricula = () => {
    setMostrarWizard(false);
    carregarMatriculas();
  };

  const handleConfirmarAcao = (matricula, acao) => {
    setConfirmDialog({ isOpen: true, matricula, acao });
  };

  const handleExecutarAcao = async () => {
    const { matricula, acao } = confirmDialog;
    
    try {
      if (acao === 'excluir') {
        await matriculasService.excluir(matricula.id);
      } else if (acao === 'inativar') {
        await matriculasService.inativar(matricula.id, 'Inativada pelo usuário');
      } else if (acao === 'reativar') {
        await matriculasService.reativar(matricula.id);
      }
      
      setConfirmDialog({ isOpen: false, matricula: null, acao: null });
      carregarMatriculas();
    } catch (error) {
      alert('Erro ao executar ação: ' + error.message);
    }
  };

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor || 0);
  };

  const formatarData = (data) => {
    if (!data) return 'N/A';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const obterMensagemConfirmacao = () => {
    const { matricula, acao } = confirmDialog;
    
    switch (acao) {
      case 'excluir':
        return `Tem certeza que deseja excluir a matrícula do aluno ${matricula?.aluno?.pessoa?.nome1}? Esta ação não pode ser desfeita.`;
      case 'inativar':
        return `Deseja inativar a matrícula do aluno ${matricula?.aluno?.pessoa?.nome1}? O aluno não terá mais acesso à academia.`;
      case 'reativar':
        return `Deseja reativar a matrícula do aluno ${matricula?.aluno?.pessoa?.nome1}? O aluno voltará a ter acesso à academia.`;
      default:
        return '';
    }
  };

  const matriculasFiltradas = matriculas.filter(matricula => {
    if (!busca) return true;
    
    const termoBusca = busca.toLowerCase();
    const nomeAluno = matricula.aluno?.pessoa?.nome1?.toLowerCase() || '';
    const cpfAluno = matricula.aluno?.pessoa?.doc1 || '';
    const nomePlano = matricula.plano?.nome?.toLowerCase() || '';
    
    return nomeAluno.includes(termoBusca) || 
           cpfAluno.includes(termoBusca) || 
           nomePlano.includes(termoBusca);
  });

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
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Gestão de Matrículas</h2>
              <p className="text-sm text-gray-600">Total: {matriculas.length} matrícula(s)</p>
            </div>
          </div>
          <button 
            onClick={handleNovaMatricula}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 font-semibold shadow-md"
          >
            <Plus size={20} />
            Nova Matrícula
          </button>
        </div>

        {/* Busca */}
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por aluno, CPF ou plano..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Aluno</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Plano</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Valor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Data Início</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Vencimento</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {matriculasFiltradas.map((matricula) => (
                <tr key={matricula.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {matricula.aluno?.pessoa?.nome1 || 'Sem nome'}
                      </div>
                      <div className="text-xs text-gray-500">
                        Mat: {matricula.aluno?.matricula}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {matricula.plano?.nome || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {matricula.plano?.periodicidade}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    {formatarValor(matricula.valorFinal || matricula.valorMatricula)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatarData(matricula.dataInicio)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {matricula.diaVencimento ? `Dia ${matricula.diaVencimento}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      matricula.status === 'ATIVA'
                        ? 'bg-green-100 text-green-800'
                        : matricula.status === 'INATIVA'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {matricula.status || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {matricula.status === 'ATIVA' ? (
                        <button 
                          onClick={() => handleConfirmarAcao(matricula, 'inativar')}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg" 
                          title="Inativar"
                        >
                          <XCircle size={18} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleConfirmarAcao(matricula, 'reativar')}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg" 
                          title="Reativar"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleConfirmarAcao(matricula, 'excluir')}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg" 
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {matriculasFiltradas.length === 0 && !erro && (
          <div className="p-8 text-center text-gray-500">
            {busca ? 'Nenhuma matrícula encontrada' : 'Nenhuma matrícula cadastrada'}
          </div>
        )}
      </div>

      {mostrarWizard && (
        <MatriculaWizard
          onCancelar={() => setMostrarWizard(false)}
          onSucesso={handleSucessoMatricula}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        titulo={`Confirmar ${confirmDialog.acao === 'excluir' ? 'Exclusão' : confirmDialog.acao === 'inativar' ? 'Inativação' : 'Reativação'}`}
        mensagem={obterMensagemConfirmacao()}
        onConfirmar={handleExecutarAcao}
        onCancelar={() => setConfirmDialog({ isOpen: false, matricula: null, acao: null })}
      />
    </div>
  );
}

export default Matriculas;