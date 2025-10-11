import React, { useState, useEffect } from 'react';
import { X, Save, CreditCard, DollarSign, Calendar, FileText } from 'lucide-react';

function PlanoForm({ plano, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    periodicidade: 'MENSAL',
    numeroMeses: '',
    numeroDias: '',
    valorMensalidade: '',
    descricao: '',
    status: 'ATIVO'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plano) {
      const dadosPlano = plano.data || plano;
      
      setFormData({
        codigo: dadosPlano.codigo || '',
        nome: dadosPlano.nome || '',
        periodicidade: dadosPlano.periodicidade || 'MENSAL',
        numeroMeses: dadosPlano.numeroMeses || '',
        numeroDias: dadosPlano.numeroDias || '',
        valorMensalidade: dadosPlano.valorMensalidade || '',
        descricao: dadosPlano.descricao || '',
        status: dadosPlano.status || 'ATIVO'
      });
    } else {
      // Gera código automático para novo plano
      gerarCodigo();
    }
  }, [plano]);

  const gerarCodigo = () => {
    const timestamp = Date.now().toString().slice(-6);
    const codigo = `PL${timestamp}`;
    setFormData(prev => ({ ...prev, codigo }));
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.codigo.trim()) {
      novosErros.codigo = 'Código é obrigatório';
    }

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome do plano é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.valorMensalidade || formData.valorMensalidade <= 0) {
      novosErros.valorMensalidade = 'Valor deve ser maior que zero';
    }

    // Validação para periodicidade MESES
    if (formData.periodicidade === 'MESES') {
      if (!formData.numeroMeses || formData.numeroMeses <= 0) {
        novosErros.numeroMeses = 'Informe o número de meses';
      } else if (formData.numeroMeses > 120) {
        novosErros.numeroMeses = 'Máximo de 120 meses';
      }
    }

    // Validação para periodicidade DIAS
    if (formData.periodicidade === 'DIAS') {
      if (!formData.numeroDias || formData.numeroDias <= 0) {
        novosErros.numeroDias = 'Informe o número de dias';
      } else if (formData.numeroDias > 3650) {
        novosErros.numeroDias = 'Máximo de 3650 dias (10 anos)';
      }
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const dadosParaSalvar = {
      codigo: formData.codigo.trim(),
      nome: formData.nome.trim(),
      periodicidade: formData.periodicidade,
      valorMensalidade: parseFloat(formData.valorMensalidade),
      status: formData.status,
      descricao: formData.descricao.trim() || undefined
    };

    // Adiciona campos específicos conforme periodicidade
    if (formData.periodicidade === 'MESES') {
      dadosParaSalvar.numeroMeses = parseInt(formData.numeroMeses);
      dadosParaSalvar.numeroDias = null;
    } else if (formData.periodicidade === 'DIAS') {
      dadosParaSalvar.numeroDias = parseInt(formData.numeroDias);
      dadosParaSalvar.numeroMeses = null;
    } else {
      dadosParaSalvar.numeroMeses = null;
      dadosParaSalvar.numeroDias = null;
    }

    onSalvar(dadosParaSalvar);
  };

  const handleChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
    
    if (errors[campo]) {
      setErrors(prev => ({ ...prev, [campo]: null }));
    }

    // Limpa campos não utilizados ao mudar periodicidade
    if (campo === 'periodicidade') {
      if (valor !== 'MESES') {
        setFormData(prev => ({ ...prev, numeroMeses: '' }));
        setErrors(prev => ({ ...prev, numeroMeses: null }));
      }
      if (valor !== 'DIAS') {
        setFormData(prev => ({ ...prev, numeroDias: '' }));
        setErrors(prev => ({ ...prev, numeroDias: null }));
      }
    }
  };

  const formatarValorMonetario = (valor) => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return '';
    return numero.toFixed(2);
  };

  const periodicidades = [
    { value: 'MENSAL', label: 'Mensal' },
    { value: 'BIMESTRAL', label: 'Bimestral (2 meses)' },
    { value: 'TRIMESTRAL', label: 'Trimestral (3 meses)' },
    { value: 'QUADRIMESTRAL', label: 'Quadrimestral (4 meses)' },
    { value: 'SEMESTRAL', label: 'Semestral (6 meses)' },
    { value: 'ANUAL', label: 'Anual (12 meses)' },
    { value: 'MESES', label: 'Personalizado (Meses)' },
    { value: 'DIAS', label: 'Personalizado (Dias)' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 p-6 border-b flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <CreditCard className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {plano ? 'Editar Plano' : 'Novo Plano'}
            </h3>
          </div>
          <button 
            onClick={onCancelar} 
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            title="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-5">
              {/* Código e Nome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.codigo}
                    onChange={(e) => handleChange('codigo', e.target.value.toUpperCase())}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.codigo ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ex: PL001"
                    maxLength={20}
                  />
                  {errors.codigo && (
                    <p className="text-xs text-red-600 mt-1">⚠️ {errors.codigo}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Plano *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.nome ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Plano Mensal Premium"
                    maxLength={100}
                  />
                  {errors.nome && (
                    <p className="text-xs text-red-600 mt-1">⚠️ {errors.nome}</p>
                  )}
                </div>
              </div>

              {/* Periodicidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Periodicidade *
                </label>
                <select
                  value={formData.periodicidade}
                  onChange={(e) => handleChange('periodicidade', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {periodicidades.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Campos Condicionais */}
              {formData.periodicidade === 'MESES' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Meses *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={formData.numeroMeses}
                    onChange={(e) => handleChange('numeroMeses', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.numeroMeses ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Informe a quantidade de meses"
                  />
                  {errors.numeroMeses && (
                    <p className="text-xs text-red-600 mt-1">⚠️ {errors.numeroMeses}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Informe quantos meses o plano terá de duração
                  </p>
                </div>
              )}

              {formData.periodicidade === 'DIAS' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Dias *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="3650"
                    required
                    value={formData.numeroDias}
                    onChange={(e) => handleChange('numeroDias', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.numeroDias ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Informe a quantidade de dias"
                  />
                  {errors.numeroDias && (
                    <p className="text-xs text-red-600 mt-1">⚠️ {errors.numeroDias}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Informe quantos dias o plano terá de duração
                  </p>
                </div>
              )}

              {/* Valor da Mensalidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline mr-2" size={16} />
                  Valor da Mensalidade *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={formData.valorMensalidade}
                    onChange={(e) => handleChange('valorMensalidade', e.target.value)}
                    onBlur={(e) => handleChange('valorMensalidade', formatarValorMonetario(e.target.value))}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.valorMensalidade ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0,00"
                  />
                </div>
                {errors.valorMensalidade && (
                  <p className="text-xs text-red-600 mt-1">⚠️ {errors.valorMensalidade}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Valor mensal que será cobrado do aluno
                </p>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline mr-2" size={16} />
                  Descrição (Opcional)
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="3"
                  placeholder="Descreva os benefícios e características deste plano..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.descricao.length}/500 caracteres
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ATIVO">✅ Ativo</option>
                  <option value="INATIVO">🚫 Inativo</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Planos inativos não estarão disponíveis para novas matrículas
                </p>
              </div>

              {/* Card Informativo */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">💡</div>
                  <div>
                    <h6 className="font-semibold text-blue-900 mb-2">Informações sobre Planos</h6>
                    <div className="text-sm text-blue-800 space-y-2">
                      <p>
                        <strong>Periodicidade:</strong> Define a frequência de cobrança do plano.
                      </p>
                      <p>
                        <strong>Planos Personalizados:</strong> Use "Meses" ou "Dias" para criar planos com durações específicas.
                      </p>
                      <p>
                        <strong>Exemplos:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                        <li>Plano Mensal - R$ 99,90 (renovação mensal)</li>
                        <li>Plano Trimestral - R$ 89,90/mês (cobrado a cada 3 meses)</li>
                        <li>Plano 10 Dias - R$ 50,00 (período experimental)</li>
                        <li>Plano 18 Meses - R$ 79,90/mês (promoção especial)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 p-6 border-t bg-gray-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancelar}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 shadow-md transition-colors"
            >
              <Save size={18} />
              {plano ? 'Atualizar Plano' : 'Salvar Plano'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlanoForm;