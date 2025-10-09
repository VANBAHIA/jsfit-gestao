import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, MapPin, Phone } from 'lucide-react';

function AlunoForm({ aluno, onSalvar, onCancelar }) {
  const [abaSelecionada, setAbaSelecionada] = useState('principal');
  const [formData, setFormData] = useState({
    pessoaId: '',
    pessoa: {
      nome1: '',
      nome2: '',
      doc1: '',
      doc2: '',
      dataNascimento: '',
      situacao: 'Ativo'
    },
    enderecos: [],
    contatos: [],
    vldExameMedico: '',
    vldAvaliacao: '',
    objetivo: '',
    profissao: '',
    empresa: '',
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
        pessoa: aluno.pessoa || {},
        enderecos: aluno.pessoa?.enderecos || [],
        contatos: aluno.pessoa?.contatos || [],
        vldExameMedico: aluno.vldExameMedico?.split('T')[0] || '',
        vldAvaliacao: aluno.vldAvaliacao?.split('T')[0] || ''
      });
    }
  }, [aluno]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar({
      ...formData,
      pessoa: {
        ...formData.pessoa,
        enderecos: formData.enderecos,
        contatos: formData.contatos
      }
    });
  };

  const handleChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const handlePessoaChange = (campo, valor) => {
    setFormData(prev => ({
      ...prev,
      pessoa: { ...prev.pessoa, [campo]: valor }
    }));
  };

  // ENDEREÇOS
  const adicionarEndereco = () => {
    setFormData(prev => ({
      ...prev,
      enderecos: [...prev.enderecos, {
        tipo: 'Residencial',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        principal: prev.enderecos.length === 0
      }]
    }));
  };

  const removerEndereco = (index) => {
    setFormData(prev => ({
      ...prev,
      enderecos: prev.enderecos.filter((_, i) => i !== index)
    }));
  };

  const handleEnderecoChange = (index, campo, valor) => {
    setFormData(prev => ({
      ...prev,
      enderecos: prev.enderecos.map((end, i) => 
        i === index ? { ...end, [campo]: valor } : end
      )
    }));
  };

  // CONTATOS
  const adicionarContato = () => {
    setFormData(prev => ({
      ...prev,
      contatos: [...prev.contatos, {
        tipo: 'Celular',
        valor: '',
        observacao: '',
        principal: prev.contatos.length === 0
      }]
    }));
  };

  const removerContato = (index) => {
    setFormData(prev => ({
      ...prev,
      contatos: prev.contatos.filter((_, i) => i !== index)
    }));
  };

  const handleContatoChange = (index, campo, valor) => {
    setFormData(prev => ({
      ...prev,
      contatos: prev.contatos.map((cont, i) => 
        i === index ? { ...cont, [campo]: valor } : cont
      )
    }));
  };

  // HORÁRIOS
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

  const diasSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

  const abas = [
    { id: 'principal', label: 'Dados Principais', icon: '📋' },
    { id: 'enderecos', label: 'Endereços', icon: '📍' },
    { id: 'contatos', label: 'Contatos', icon: '📞' },
    { id: 'adicionais', label: 'Dados Adicionais', icon: '📝' },
    { id: 'horarios', label: 'Horários', icon: '🕐' },
    { id: 'acesso', label: 'Controle de Acesso', icon: '🔐' }
  ];

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
          <div className="border-b px-6 bg-gray-50 overflow-x-auto">
            <div className="flex gap-2">
              {abas.map(aba => (
                <button key={aba.id} type="button" 
                  onClick={() => setAbaSelecionada(aba.id)}
                  className={`px-4 py-3 font-medium border-b-2 whitespace-nowrap transition-colors ${
                    abaSelecionada === aba.id 
                      ? 'border-blue-600 text-blue-600 bg-white' 
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}>
                  {aba.icon} {aba.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {/* ABA: DADOS PRINCIPAIS */}
            {abaSelecionada === 'principal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                    <input type="text" required value={formData.pessoa.nome1}
                      onChange={(e) => handlePessoaChange('nome1', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apelido</label>
                    <input type="text" value={formData.pessoa.nome2}
                      onChange={(e) => handlePessoaChange('nome2', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Apelido ou nome social" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                    <input type="text" required value={formData.pessoa.doc1}
                      onChange={(e) => handlePessoaChange('doc1', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="000.000.000-00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RG</label>
                    <input type="text" value={formData.pessoa.doc2}
                      onChange={(e) => handlePessoaChange('doc2', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="00.000.000-0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                    <input type="date" value={formData.pessoa.dataNascimento?.split('T')[0] || ''}
                      onChange={(e) => handlePessoaChange('dataNascimento', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            )}

            {/* ABA: ENDEREÇOS */}
            {abaSelecionada === 'enderecos' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                    <MapPin size={20} className="text-blue-600" />
                    Endereços Cadastrados
                  </h5>
                  <button type="button" onClick={adicionarEndereco}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2">
                    <Plus size={18} />
                    Adicionar Endereço
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.enderecos.map((endereco, index) => (
                    <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <h6 className="font-medium text-gray-800 flex items-center gap-2">
                          📍 Endereço {index + 1}
                          {endereco.principal && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                              Principal
                            </span>
                          )}
                        </h6>
                        <button type="button" onClick={() => removerEndereco(index)}
                          className="text-red-600 hover:bg-red-100 p-1 rounded">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                          <select value={endereco.tipo}
                            onChange={(e) => handleEnderecoChange(index, 'tipo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="Residencial">Residencial</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Outro">Outro</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                          <input type="text" value={endereco.cep}
                            onChange={(e) => handleEnderecoChange(index, 'cep', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="00000-000" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro</label>
                          <input type="text" value={endereco.logradouro}
                            onChange={(e) => handleEnderecoChange(index, 'logradouro', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Rua, Avenida..." />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                          <input type="text" value={endereco.numero}
                            onChange={(e) => handleEnderecoChange(index, 'numero', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Nº" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                          <input type="text" value={endereco.complemento}
                            onChange={(e) => handleEnderecoChange(index, 'complemento', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Apto, Bloco..." />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                          <input type="text" value={endereco.bairro}
                            onChange={(e) => handleEnderecoChange(index, 'bairro', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Bairro" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                          <input type="text" value={endereco.cidade}
                            onChange={(e) => handleEnderecoChange(index, 'cidade', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Cidade" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                          <input type="text" value={endereco.estado}
                            onChange={(e) => handleEnderecoChange(index, 'estado', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="UF" maxLength="2" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {formData.enderecos.length === 0 && (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <MapPin size={48} className="mx-auto mb-3 text-gray-400" />
                      <p className="font-medium">Nenhum endereço cadastrado</p>
                      <p className="text-sm">Clique em "Adicionar Endereço" para começar</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ABA: CONTATOS */}
            {abaSelecionada === 'contatos' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Phone size={20} className="text-blue-600" />
                    Contatos Cadastrados
                  </h5>
                  <button type="button" onClick={adicionarContato}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2">
                    <Plus size={18} />
                    Adicionar Contato
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.contatos.map((contato, index) => (
                    <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <h6 className="font-medium text-gray-800 flex items-center gap-2">
                          📞 Contato {index + 1}
                          {contato.principal && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                              Principal
                            </span>
                          )}
                        </h6>
                        <button type="button" onClick={() => removerContato(index)}
                          className="text-red-600 hover:bg-red-100 p-1 rounded">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                          <select value={contato.tipo}
                            onChange={(e) => handleContatoChange(index, 'tipo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="Celular">Celular</option>
                            <option value="Telefone">Telefone Fixo</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Email">E-mail</option>
                            <option value="Outro">Outro</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {contato.tipo === 'Email' ? 'E-mail' : 'Número/Contato'}
                          </label>
                          <input type={contato.tipo === 'Email' ? 'email' : 'text'}
                            value={contato.valor}
                            onChange={(e) => handleContatoChange(index, 'valor', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder={contato.tipo === 'Email' ? 'email@exemplo.com' : '(00) 00000-0000'} />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Observação</label>
                        <input type="text" value={contato.observacao}
                          onChange={(e) => handleContatoChange(index, 'observacao', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Ex: Contato comercial, recado..." />
                      </div>
                    </div>
                  ))}

                  {formData.contatos.length === 0 && (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <Phone size={48} className="mx-auto mb-3 text-gray-400" />
                      <p className="font-medium">Nenhum contato cadastrado</p>
                      <p className="text-sm">Clique em "Adicionar Contato" para começar</p>
                    </div>
                  )}
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
                    placeholder="Ex: Ganho de massa muscular, emagrecimento..." />
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
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2">
                    <Plus size={18} />
                    Adicionar Horário
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.horarios.map((horario, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <h6 className="font-medium text-gray-800">Horário {index + 1}</h6>
                        <button type="button" onClick={() => removerHorario(index)}
                          className="text-red-600 hover:bg-red-100 p-1 rounded">
                          <Trash2 size={18} />
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
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                horario.diasSemana?.includes(dia)
                                  ? 'bg-blue-600 text-white shadow-md'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}>
                              {dia}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {formData.horarios.length === 0 && (
                    <p className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      Nenhum horário cadastrado
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ABA: CONTROLE DE ACESSO */}
            {abaSelecionada === 'acesso' && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    🔐 <strong>Informações de Segurança:</strong> Estas credenciais serão usadas para controle de acesso à academia.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha de Acesso *</label>
                  <input type="password" required value={formData.controleAcesso.senha}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      controleAcesso: { ...prev.controleAcesso, senha: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite a senha (mínimo 4 dígitos)"
                    minLength="4" />
                  <p className="text-xs text-gray-500 mt-1">Senha numérica para catraca/controle de acesso</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Impressão Digital 1</label>
                    <input type="text" value={formData.controleAcesso.impressaoDigital1}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        controleAcesso: { ...prev.controleAcesso, impressaoDigital1: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Código da digital 1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Impressão Digital 2</label>
                    <input type="text" value={formData.controleAcesso.impressaoDigital2}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        controleAcesso: { ...prev.controleAcesso, impressaoDigital2: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Código da digital 2" />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h6 className="font-semibold text-blue-900 mb-2">💡 Dica de Uso</h6>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• A senha é obrigatória e será usada na catraca</li>
                    <li>• Registre até 2 impressões digitais para backup</li>
                    <li>• Mantenha os dados atualizados para evitar problemas de acesso</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Aba atual:</span> {abas.find(a => a.id === abaSelecionada)?.label}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={onCancelar}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors">
                Cancelar
              </button>
              <button type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 shadow-md transition-colors">
                <Save size={18} />
                Salvar Aluno
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlunoForm;