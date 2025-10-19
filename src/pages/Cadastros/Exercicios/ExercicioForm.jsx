import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Dumbbell, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';

function ExercicioForm({ exercicio, grupos, onSalvar, onCancelar, salvando }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    grupoId: '',
    musculos: [],
    imagemUrl: ''
  });

  const [erros, setErros] = useState({});
  const [novoMusculo, setNovoMusculo] = useState('');
  const [previewImagem, setPreviewImagem] = useState('');
  const fileInputRef = useRef(null);

  // Lista de músculos sugeridos
  const musculosSugeridos = [
    'Peitoral Maior', 'Peitoral Menor', 'Deltoide Anterior', 'Deltoide Lateral', 
    'Deltoide Posterior', 'Bíceps', 'Tríceps', 'Antebraço', 'Trapézio',
    'Latíssimo do Dorso', 'Romboides', 'Infraespinal', 'Lombar', 'Abdômen',
    'Oblíquos', 'Quadríceps', 'Isquiotibiais', 'Glúteos', 'Panturrilha', 'Adutores'
  ];

  useEffect(() => {
    if (exercicio) {
      const dadosExercicio = exercicio.data || exercicio;
      
      setFormData({
        nome: dadosExercicio.nome || '',
        descricao: dadosExercicio.descricao || '',
        grupoId: dadosExercicio.grupoId || '',
        musculos: dadosExercicio.musculos || [],
        imagemUrl: dadosExercicio.imagemUrl || ''
      });

      if (dadosExercicio.imagemUrl) {
        setPreviewImagem(dadosExercicio.imagemUrl);
      }
    }
  }, [exercicio]);

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome do exercício é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (formData.descricao && formData.descricao.length > 500) {
      novosErros.descricao = 'Descrição muito longa (máximo 500 caracteres)';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const dadosParaSalvar = {
      nome: formData.nome.trim(),
      descricao: formData.descricao.trim(),
      grupoId: formData.grupoId || null,
      musculos: formData.musculos,
      imagemUrl: formData.imagemUrl
    };

    onSalvar(dadosParaSalvar);
  };

  const handleChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
    
    if (erros[campo]) {
      setErros(prev => {
        const novosErros = { ...prev };
        delete novosErros[campo];
        return novosErros;
      });
    }
  };

  const handleAdicionarMusculo = () => {
    if (novoMusculo.trim() && !formData.musculos.includes(novoMusculo.trim())) {
      handleChange('musculos', [...formData.musculos, novoMusculo.trim()]);
      setNovoMusculo('');
    }
  };

  const handleRemoverMusculo = (musculo) => {
    handleChange('musculos', formData.musculos.filter(m => m !== musculo));
  };

  const handleSelecionarMusculoSugerido = (musculo) => {
    if (!formData.musculos.includes(musculo)) {
      handleChange('musculos', [...formData.musculos, musculo]);
    }
  };

  const handleImagemUrlChange = (e) => {
    const url = e.target.value;
    handleChange('imagemUrl', url);
    setPreviewImagem(url);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem (JPG, PNG, GIF)');
        return;
      }

      // Validar tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB');
        return;
      }

      // Criar preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result);
      };
      reader.readAsDataURL(file);

      // Simular upload - na prática, você enviaria para o servidor
      // e receberia a URL de volta
      const nomeArquivo = `exercicio_${Date.now()}_${file.name}`;
      const urlSimulada = `/imagens/exercicios/${nomeArquivo}`;
      handleChange('imagemUrl', urlSimulada);
      
      // Aqui você faria o upload real:
      // await exerciciosService.uploadImagem(exercicio.id, file);
    }
  };

  const handleRemoverImagem = () => {
    setPreviewImagem('');
    handleChange('imagemUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 sticky top-0 z-10">
          <h3 className="text-2xl font-bold text-white">
            {exercicio ? 'Editar Exercício' : 'Novo Exercício'}
          </h3>
          <button 
            onClick={onCancelar} 
            disabled={salvando}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna Esquerda - Dados Básicos */}
              <div className="space-y-5">
                {/* Nome do Exercício */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Exercício *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      erros.nome ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Supino Reto, Agachamento Livre"
                    maxLength={100}
                  />
                  {erros.nome && (
                    <p className="text-red-500 text-xs mt-1">{erros.nome}</p>
                  )}
                </div>

                {/* Grupo Muscular */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grupo Muscular Principal
                  </label>
                  <select
                    value={formData.grupoId}
                    onChange={(e) => handleChange('grupoId', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Selecione um grupo</option>
                    {grupos.map(grupo => (
                      <option key={grupo.id} value={grupo.id}>{grupo.nome}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Grupo principal que o exercício trabalha
                  </p>
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => handleChange('descricao', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                      erros.descricao ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Descreva como executar o exercício..."
                    rows={4}
                    maxLength={500}
                  />
                  {erros.descricao && (
                    <p className="text-red-500 text-xs mt-1">{erros.descricao}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.descricao.length}/500 caracteres
                  </p>
                </div>

                {/* Músculos Trabalhados */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Músculos Trabalhados
                  </label>
                  
                  {/* Músculos Adicionados */}
                  {formData.musculos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      {formData.musculos.map((musculo, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {musculo}
                          <button
                            type="button"
                            onClick={() => handleRemoverMusculo(musculo)}
                            className="hover:bg-purple-200 rounded-full p-0.5"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Adicionar Músculo */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={novoMusculo}
                      onChange={(e) => setNovoMusculo(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdicionarMusculo())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="Digite um músculo e pressione Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAdicionarMusculo}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                    >
                      Adicionar
                    </button>
                  </div>

                  {/* Músculos Sugeridos */}
                  <div>
                    <p className="text-xs text-gray-600 mb-2 font-medium">Sugestões (clique para adicionar):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {musculosSugeridos.map((musculo) => (
                        <button
                          key={musculo}
                          type="button"
                          onClick={() => handleSelecionarMusculoSugerido(musculo)}
                          disabled={formData.musculos.includes(musculo)}
                          className={`px-2 py-1 text-xs rounded border transition-all ${
                            formData.musculos.includes(musculo)
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                        >
                          {musculo}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Imagem/GIF */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagem/GIF do Exercício
                  </label>

                  {/* Preview da Imagem */}
                  <div className="mb-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                      {previewImagem ? (
                        <>
                          <img
                            src={previewImagem}
                            alt="Preview"
                            className="max-w-full max-h-[280px] object-contain rounded"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.querySelector('.error-message').style.display = 'block';
                            }}
                          />
                          <div className="error-message hidden text-center">
                            <ImageIcon className="text-gray-300 mx-auto mb-2" size={48} />
                            <p className="text-sm text-gray-500">Erro ao carregar imagem</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoverImagem}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                            title="Remover imagem"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="text-gray-300 mx-auto mb-3" size={64} />
                          <p className="text-sm text-gray-500">Nenhuma imagem selecionada</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Opção 1: Upload de Arquivo */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📁 Opção 1: Upload de Arquivo
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-400 cursor-pointer flex items-center justify-center gap-2 bg-white hover:bg-purple-50 transition-colors"
                      >
                        <Upload size={20} className="text-gray-600" />
                        <span className="text-sm text-gray-700 font-medium">
                          Selecionar arquivo (JPG, PNG, GIF)
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Tamanho máximo: 5MB • Formatos: JPG, PNG, GIF
                    </p>
                  </div>

                  {/* Opção 2: URL da Imagem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🔗 Opção 2: URL da Imagem
                    </label>
                    <input
                      type="text"
                      value={formData.imagemUrl}
                      onChange={handleImagemUrlChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://exemplo.com/exercicio.gif"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Cole a URL de uma imagem ou GIF da internet
                    </p>
                  </div>

                  {/* Dicas sobre Imagens */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <h6 className="font-semibold text-blue-900 mb-1">Dicas para Imagens</h6>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• GIFs animados ajudam a demonstrar o movimento</li>
                          <li>• Prefira imagens em fundo neutro</li>
                          <li>• A imagem deve mostrar claramente a execução</li>
                          <li>• Mantenha proporção adequada (preferencialmente quadrada)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview do Exercício */}
            {formData.nome && (
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <h6 className="font-semibold text-gray-800 mb-3">📋 Preview do Exercício</h6>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-4">
                    {previewImagem && (
                      <div className="flex-shrink-0">
                        <img
                          src={previewImagem}
                          alt={formData.nome}
                          className="w-24 h-24 object-cover rounded-lg border-2 border-purple-200"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-800 mb-1">{formData.nome}</h4>
                      {formData.grupoId && (
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold mb-2">
                          {grupos.find(g => g.id === formData.grupoId)?.nome}
                        </span>
                      )}
                      {formData.descricao && (
                        <p className="text-sm text-gray-600 mb-2">{formData.descricao}</p>
                      )}
                      {formData.musculos.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {formData.musculos.map((musculo, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                              {musculo}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 sticky bottom-0">
            <button
              type="button"
              onClick={onCancelar}
              disabled={salvando}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2 shadow-md transition-colors disabled:opacity-50"
            >
              {salvando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {exercicio ? 'Atualizar' : 'Salvar'} Exercício
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExercicioForm;