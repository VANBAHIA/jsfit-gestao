import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Dumbbell, Upload, Image as ImageIcon, Trash2, Eye } from 'lucide-react';
import { exerciciosService } from '../../../services/api/exerciciosService';


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
  const [uploadando, setUploadando] = useState(false);
  const fileInputRef = useRef(null);

  // Lista de músculos sugeridos
  const musculosSugeridos = [
    "Abdutor largo",
    "Adutor longo",
    "Bíceps braquial",
    "Bíceps femoral",
    "Braquial anterior",
    "Braquiorradial",
    "Coracobraquial",
    "Deltoide",
    "Extensor dos dedos",
    "Extensor radial",
    "Extensor ulnar do carpo",
    "Fibular",
    "Flexor longo",
    "Gastrocnêmio",
    "Gêmeo",
    "Glúteo máximo, médio e mínimo",
    "Grande do dorso",
    "Infraespinhal",
    "Latíssimo do dorso",
    "Oblíquo externo",
    "Oblíquo interno",
    "Obturatório",
    "Peitoral maior",
    "Peitoral menor",
    "Piriforme",
    "Quadrado do lombo",
    "Quadrado femoral",
    "Redondo maior",
    "Redondo menor",
    "Reto do abdômen",
    "Reto femoral",
    "Romboide",
    "Semimembranáceo",
    "Semitendíneo",
    "Serrátil anterior",
    "Sóleo",
    "Subescapular",
    "Supraespinhal",
    "Tibial anterior",
    "Tibial posterior",
    "Trapézio",
    "Tríceps braquial",
    "Vasto intermédio",
    "Vasto lateral",
    "Vasto medial"
  ];

  // Mapeamento de músculos para imagens

  const muscleMapping = {
    "Abdutor largo": "quadriceps",
    "Abdutor longo": "quadriceps",
    "Bíceps braquial": "biceps",
    "Bíceps femoral": "posterior-coxa",
    "Braquial anterior": "biceps",
    "Braquiorradial": "antebraco-anterior",
    "Coracobraquial": "biceps",
    "Deltoide": "ombro",
    "Extensor dos dedos": "antebraco-posterior",
    "Extensor radial": "antebraco-anterior",
    "Extensor ulnar do carpo": "antebraco-posterior",
    "Fibular": "panturrilha-anterior",
    "Flexor longo": "panturrilhaposterior",
    "Gastrocnêmio": "panturrilhaposterior",
    "Gêmeo": "gluteo",
    "Glúteo máximo, médio e mínimo": "gluteo",
    "Grande do dorso": "costas",
    "Infraespinhal": "ombro",
    "Latíssimo do dorso": "costas",
    "Oblíquo externo": "abdome-lateral",
    "Oblíquo interno": "abdome-lateral",
    "Obturatório": "gluteo",
    "Peitoral maior": "peito",
    "Peitoral menor": "peito",
    "Piriforme": "gluteo",
    "Quadrado do lombo": "lombar",
    "Quadrado femoral": "gluteo",
    "Redondo maior": "costas",
    "Redondo menor": "costas",
    "Reto do abdômen": "abdome",
    "Reto femoral": "quadriceps",
    "Romboide": "costas",
    "Semimembranáceo": "posterior-coxa",
    "Semitendíneo": "posterior-coxa",
    "Serrátil anterior": "abdome-lateral",
    "Sóleo": "panturrilhaposterior",
    "Subescapular": "ombro",
    "Supraespinhal": "ombro",
    "Tibial anterior": "panturrilha-anterior",
    "Tibial posterior": "panturrilhaposterior",
    "Trapézio": "costas-trapezio",
    "Tríceps braquial": "triceps",
    "Vasto intermédio": "quadriceps",
    "Vasto lateral": "quadriceps",
    "Vasto medial": "quadriceps"
  };


  // Calcular imagens ativas
  const activeImages = [...new Set(
    formData.musculos
      .map(muscle => muscleMapping[muscle])
      .filter(Boolean)
  )];

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

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('📤 Iniciando upload:', file.name);

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem (JPG, PNG, GIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImagem(reader.result);
    };
    reader.readAsDataURL(file);

    if (exercicio?.id) {
      try {
        setUploadando(true);

        const formData = new FormData();
        formData.append('imagem', file);

        console.log('📡 Enviando para:', `/exercicios/${exercicio.id}/imagem`);

        const response = await exerciciosService.uploadImagem(exercicio.id, formData);

        console.log('✅ Upload concluído:', response.data);

        const imagemUrl = response.data.data?.imagemUrl || response.data.imagemUrl;
        handleChange('imagemUrl', imagemUrl);

        alert('Imagem enviada com sucesso!');
      } catch (error) {
        console.error('❌ Erro no upload:', error);
        alert('Erro ao fazer upload: ' + (error.response?.data?.message || error.message));
        setPreviewImagem('');
      } finally {
        setUploadando(false);
      }
    } else {
      alert('Salve o exercício primeiro antes de adicionar a imagem');
      setPreviewImagem('');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${erros.nome ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${erros.descricao ? 'border-red-500' : 'border-gray-300'
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


                  {/* Músculos Sugeridos */}
                  <div>
                    <p className="text-xs text-gray-600 mb-2 font-medium">Clique para adicionar:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {musculosSugeridos.map((musculo) => (
                        <button
                          key={musculo}
                          type="button"
                          onClick={() => handleSelecionarMusculoSugerido(musculo)}
                          disabled={formData.musculos.includes(musculo)}
                          className={`px-2 py-1 text-xs rounded border transition-all ${formData.musculos.includes(musculo)
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




              {/* Coluna Direita - Visualizador + Imagem */}
              <div className="space-y-5">

                {/* Imagem/GIF do Exercício */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagem/GIF do Exercício
                  </label>

                  {/* Preview da Imagem */}
                  <div className="mb-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-[200px] flex items-center justify-center relative overflow-hidden">
                      {previewImagem ? (
                        <>
                          <img
                            src={previewImagem}
                            alt="Preview"
                            className="max-w-full max-h-[180px] object-contain rounded"
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
                          <ImageIcon className="text-gray-300 mx-auto mb-3" size={48} />
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
                        disabled={uploadando}
                      />
                      <label
                        htmlFor="file-upload"
                        className={`flex-1 px-4 py-3 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-400 cursor-pointer flex items-center justify-center gap-2 bg-white hover:bg-purple-50 transition-colors ${uploadando ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                      >
                        {uploadando ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-600 border-t-transparent"></div>
                            <span className="text-sm text-purple-700 font-medium">
                              Enviando...
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload size={20} className="text-gray-600" />
                            <span className="text-sm text-gray-700 font-medium">
                              Selecionar arquivo (JPG, PNG, GIF)
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Tamanho máximo: 5MB • Formatos: JPG, PNG, GIF
                    </p>
                    {uploadando && (
                      <p className="text-xs text-purple-600 mt-2 font-medium animate-pulse">
                        ⏳ Fazendo upload da imagem...
                      </p>
                    )}
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
                </div>
                {/* Visualizador de Músculos */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <Eye size={16} className="text-purple-600" />
                      Visualização Anatômica
                    </h4>
                    {formData.musculos.length > 0 && (
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full font-medium">
                        {formData.musculos.length} selecionado{formData.musculos.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  <div className="relative w-full bg-white rounded-lg p-3" style={{ maxWidth: '280px', margin: '0 auto' }}>
                    {/* Imagem base do corpo */}
                    <img
                      src="/imagens/musculos/corpo.png"
                      alt="Corpo base"
                      className="w-full h-auto"
                    />

                    {/* Camadas de músculos */}
                    <img
                      src="/imagens/musculos/abdome.png"
                      alt="Abdômen"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('abdome') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/abdome-lateral.png"
                      alt="Abdômen lateral"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('abdome-lateral') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/antebraco-anterior.png"
                      alt="Antebraço anterior"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('antebraco-anterior') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/antebraco-posterior.png"
                      alt="Antebraço posterior"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('antebraco-posterior') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/braco-biceps.png"
                      alt="Bíceps"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('biceps') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/braco-triceps.png"
                      alt="Tríceps"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('triceps') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/costas.png"
                      alt="Costas"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('costas') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="./imagens/musculos/costas-lombar.png"
                      alt="Lombar"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('lombar') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/costas-trapezio.png"
                      alt="Trapézio"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('costas-trapezio') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/coxa-biceps.png"
                      alt="Posterior da coxa"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('posterior-coxa') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/coxa-quadriceps.png"
                      alt="Quadríceps"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('quadriceps') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/gluteo.png"
                      alt="Glúteo"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('gluteo') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/ombro.png"
                      alt="Ombro"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('ombro') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/panturrilha-anterior.png"
                      alt="Panturrilha anterior"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('panturrilha-anterior') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/panturrilhaposterior.png"
                      alt="Panturrilha posterior"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('panturrilhaposterior') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                    <img
                      src="/imagens/musculos/peito.png"
                      alt="Peito"
                      className={`absolute top-3 left-3 right-3 bottom-3 w-[calc(100%-24px)] h-auto transition-opacity duration-300 pointer-events-none ${activeImages.includes('peito') ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                  </div>

                  {formData.musculos.length === 0 && (
                    <p className="text-xs text-center text-gray-500 mt-3">
                      Selecione músculos acima para visualizar
                    </p>
                  )}
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