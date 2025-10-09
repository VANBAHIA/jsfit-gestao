import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

function AlunoForm({ aluno, onSalvar, onCancelar }) {
  const [abaSelecionada, setAbaSelecionada] = useState('principal');
  const [formData, setFormData] = useState({
    pessoaId: '',
    vldExameMedico: '',
    vldAvaliacao: '',
    objetivo: '',
    profissao: '',
    empresa: '',
    responsavel: {
      nome: '',
      contatos: []
    },
    horarios: [],
    controleAcesso: {
      senha: '',
      impressaoDigital1: '',
      impressaoDigital2: ''
    }
  });

  useEffect(() => {
    if (aluno) {
      setFormData({
        ...aluno,
        vldExameMedico: aluno.vldExameMedico?.split('T')[0] || '',
        vldAvaliacao: aluno.vldAvaliacao?.split('T')[0] || ''
      });
    }
  }, [aluno]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
  };

  const handleChange = (campo, valor) => {
    setFormData(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleNestedChange = (objeto, campo, valor) => {
    setFormData(prev => ({
      ...prev,
      [objeto]: {
        ...prev[objeto],
        [campo]: valor
      }
    }));
  };

  // Horários
  const adicionarHorario = () => {
    setFormData(prev => ({
      ...prev,
      horarios: [...prev.horarios, {
        local: '',
        diasSemana: [],
        horarioEntrada: '',
        horarioSaida: ''
      }]
    }));
  };

  const removerHorario = (index) => {
    setFormData(prev => ({
      ...prev,
      horarios: prev.horarios.filter((_, i) => i !== index)
    }));
  };

  const handleHorarioChange = (index, campo, valor) => {
    setFormData(prev => ({
      ...prev,
      horarios: prev.horarios.map((h, i) => 
        i === index ? { ...h, [campo]: valor } : h
      )
    }));
  };

  const toggleDiaSemana = (index, dia) => {
    setFormData(prev => ({
      ...prev,
      horarios: prev.horarios.map((h, i) => {
        if (i !== index) return h;
        const dias = h.diasSemana || [];
        return {
          ...h,
          diasSemana: dias.includes(dia) 
            ? dias.filter(d => d !== dia)
            : [...dias, dia]
        };
      })
    }));
  };

  const diasSemana = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto py-8 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl mx-4">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700">
          <h3 className="text-2xl font-bold text-white">
            {aluno ? 'Editar Aluno' : 'Novo Aluno'}
          </h3>
          <button onClick={onCancelar} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tabs */}
          <div className="border-b px-6">
            <div className="flex gap-4">
              <button type="button" onClick={() => setAbaSelecionada('principal')}
                className={`px-4 py-3 font-medium border-b-2 ${abaSelecionada === 'principal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>
                📋 Dados Principais
              </button>
              <button type="button" onClick={() => setAbaSelecionada('adicionais')}
                className={`px-4 py-3 font-medium border-b-2 ${abaSelecionada === 'adicionais' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>
                📝 Dados Adicionais
              </button>
              <button type="button" onClick={() => setAbaSelecionada('horarios')}
                className={`px-4 py-3 font-medium border-b-2 ${abaSelecionada === 'horarios' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>
                🕐 Horários
              </button>
              <button type="button" onClick={() => setAbaSelecionada('acesso')}
                className={`px-4 py-3 font-medium border-b-2 ${abaSelecionada === 'acesso' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>
                🔐 Controle de Acesso
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* ABA: DADOS PRINCIPAIS */}
            {abaSelecionada === 'principal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID da Pessoa *</label>
                  <input type="text" required value={formData.pessoaId}
                    onChange={(e) => handleChange('pessoaId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="ID da pessoa (obrigatório)" />
                </div>
              </div>
            )}

            {/* ABA: DADOS ADICIONAIS */}
            {abaSelecionada === 'adicionais' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Validade Exame Médico</label>
                    <input type="date" value={formData.vldExameMedico}
                      onChange={(e) => handleChange('vldExameMedico', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Validade Avaliação Física</label>
                    <input type="date" value={formData.vldAvaliacao}
                      onChange={(e) => handleChange('vldAvaliacao', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo</label>
                  <textarea value={formData.objetivo}
                    onChange={(e) => handleChange('objetivo', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"
                    placeholder="Ex: Ganho de massa muscular" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profissão</label>
                    <input type="text" value={formData.profissao}
                      onChange={(e) => handleChange('profissao', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Digite a profissão" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                    <input type="text" value={formData.empresa}
                      onChange={(e) => handleChange('empresa', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Digite a empresa" />
                  </div>
                </div>
              </div>
            )}

            {/* ABA: HORÁRIOS */}
            {abaSelecionada === 'horarios' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-semibold text-gray-800">Horários de Treino</h5>
                  <button type="button" onClick={adicionarHorario}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                    + Adicionar Horário
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.horarios.map((horario, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <h6 className="font-medium text-gray-800">Horário {index + 1}</h6>
                        <button type="button" onClick={() => removerHorario(index)}
                          className="text-red-600 hover:bg-red-100 p-1 rounded">
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                          <input type="text" value={horario.local}
                            onChange={(e) => handleHorarioChange(index, 'local', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Ex: Academia Central" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Entrada</label>
                          <input type="time" value={horario.horarioEntrada}
                            onChange={(e) => handleHorarioChange(index, 'horarioEntrada', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Saída</label>
                          <input type="time" value={horario.horarioSaida}
                            onChange={(e) => handleHorarioChange(index, 'horarioSaida', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dias da Semana</label>
                        <div className="flex flex-wrap gap-2">
                          {diasSemana.map(dia => (
                            <button key={dia} type="button"
                              onClick={() => toggleDiaSemana(index, dia)}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                horario.diasSemana?.includes(dia)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}>
                              {dia.substring(0, 3)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {formData.horarios.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Nenhum horário cadastrado</p>
                  )}
                </div>
              </div>
            )}

            {/* ABA: CONTROLE DE ACESSO */}
            {abaSelecionada === 'acesso' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha de Acesso *</label>
                  <input type="password" required value={formData.controleAcesso.senha}
                    onChange={(e) => handleNestedChange('controleAcesso', 'senha', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite a senha" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Impressão Digital 1</label>
                  <input type="text" value={formData.controleAcesso.impressaoDigital1}
                    onChange={(e) => handleNestedChange('controleAcesso', 'impressaoDigital1', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Código da digital 1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Impressão Digital 2</label>
                  <input type="text" value={formData.controleAcesso.impressaoDigital2}
                    onChange={(e) => handleNestedChange('controleAcesso', 'impressaoDigital2', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Código da digital 2" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
            <button type="button" onClick={onCancelar}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium">
              Cancelar
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
              <Save size={18} />
              Salvar Aluno
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlunoForm;