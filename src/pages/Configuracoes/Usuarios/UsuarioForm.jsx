import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Lock, Shield, Phone } from 'lucide-react';

function UsuarioForm({ usuario, onSalvar, onCancelar, empresaId }) {
  const [formData, setFormData] = useState({
    empresaId: empresaId || '',
    nomeUsuario: '',
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    perfil: 'USUARIO',
    permissoes: [],
    telefone: '',
    situacao: 'ATIVO'
  });

  const [erroSenha, setErroSenha] = useState('');

  useEffect(() => {
    if (usuario) {
      const dadosUsuario = usuario.data || usuario;
      setFormData({
        empresaId: dadosUsuario.empresaId || empresaId || '',
        nomeUsuario: dadosUsuario.nomeUsuario || '',
        nome: dadosUsuario.nome || '',
        email: dadosUsuario.email || '',
        senha: '',
        confirmarSenha: '',
        perfil: dadosUsuario.perfil || 'USUARIO',
        permissoes: dadosUsuario.permissoes || [],
        telefone: dadosUsuario.telefone || '',
        situacao: dadosUsuario.situacao || 'ATIVO'
      });
    }
  }, [usuario, empresaId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação de senha (apenas para novos usuários ou quando senha foi preenchida)
    if (!usuario && formData.senha !== formData.confirmarSenha) {
      setErroSenha('As senhas não coincidem');
      return;
    }

    if (!usuario && formData.senha.length < 6) {
      setErroSenha('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    const dadosParaSalvar = {
      empresaId: formData.empresaId,
      nomeUsuario: formData.nomeUsuario.trim(),
      nome: formData.nome.trim(),
      email: formData.email.trim(),
      perfil: formData.perfil,
      permissoes: formData.permissoes,
      telefone: formData.telefone,
      situacao: formData.situacao
    };

    // Só envia senha se for novo usuário ou se foi alterada
    if (!usuario || formData.senha) {
      dadosParaSalvar.senha = formData.senha;
    }

    onSalvar(dadosParaSalvar);
  };

  const handleChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
    if (campo === 'senha' || campo === 'confirmarSenha') {
      setErroSenha('');
    }
  };

  const handlePermissaoChange = (permissao) => {
    setFormData(prev => {
      const permissoes = prev.permissoes.includes(permissao)
        ? prev.permissoes.filter(p => p !== permissao)
        : [...prev.permissoes, permissao];
      return { ...prev, permissoes };
    });
  };

  const perfis = [
    { valor: 'ADMIN', label: 'Administrador', descricao: 'Acesso total ao sistema' },
    { valor: 'GERENTE', label: 'Gerente', descricao: 'Gestão operacional' },
    { valor: 'INSTRUTOR', label: 'Instrutor', descricao: 'Treinos e avaliações' },
    { valor: 'USUARIO', label: 'Usuário', descricao: 'Acesso básico' }
  ];

  const permissoesDisponiveis = [
    { valor: 'ALUNOS', label: 'Gestão de Alunos', icon: '👥' },
    { valor: 'FINANCEIRO', label: 'Gestão Financeira', icon: '💰' },
    { valor: 'TREINOS', label: 'Gestão de Treinos', icon: '🏋️' },
    { valor: 'AVALIACOES', label: 'Avaliações Físicas', icon: '📊' },
    { valor: 'RELATORIOS', label: 'Relatórios Gerenciais', icon: '📈' },
    { valor: 'AGENDA', label: 'Gestão de Agenda', icon: '📅' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl mx-4 my-8">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700">
          <h3 className="text-2xl font-bold text-white">
            {usuario ? 'Editar Usuário' : 'Novo Usuário'}
          </h3>
          <button onClick={onCancelar} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Dados Pessoais */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                Dados Pessoais
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome completo do usuário"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="text"
                      value={formData.telefone}
                      onChange={(e) => handleChange('telefone', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dados de Acesso */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Lock size={20} className="text-blue-600" />
                Dados de Acesso
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome de Usuário *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nomeUsuario}
                    onChange={(e) => handleChange('nomeUsuario', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="usuario.login"
                    disabled={!!usuario}
                  />
                  {usuario && (
                    <p className="text-xs text-gray-500 mt-1">
                      O nome de usuário não pode ser alterado
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="usuario@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {usuario ? 'Nova Senha (deixe em branco para manter)' : 'Senha *'}
                  </label>
                  <input
                    type="password"
                    required={!usuario}
                    value={formData.senha}
                    onChange={(e) => handleChange('senha', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {usuario ? 'Confirmar Nova Senha' : 'Confirmar Senha *'}
                  </label>
                  <input
                    type="password"
                    required={!usuario}
                    value={formData.confirmarSenha}
                    onChange={(e) => handleChange('confirmarSenha', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Repita a senha"
                  />
                </div>
              </div>
              {erroSenha && (
                <p className="text-red-600 text-sm mt-2">{erroSenha}</p>
              )}
            </div>

            {/* Perfil e Permissões */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                Perfil e Permissões
              </h4>
              
              {/* Perfil */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Perfil de Acesso *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {perfis.map((perfil) => (
                    <label
                      key={perfil.valor}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.perfil === perfil.valor
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="perfil"
                        value={perfil.valor}
                        checked={formData.perfil === perfil.valor}
                        onChange={(e) => handleChange('perfil', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.perfil === perfil.valor
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}
                        />
                        <span className="font-semibold text-gray-900">{perfil.label}</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{perfil.descricao}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Permissões Específicas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissões Específicas
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissoesDisponiveis.map((permissao) => (
                    <label
                      key={permissao.valor}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissoes.includes(permissao.valor)}
                        onChange={() => handlePermissaoChange(permissao.valor)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-xl">{permissao.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {permissao.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status do Usuário
              </label>
              <select
                value={formData.situacao}
                onChange={(e) => handleChange('situacao', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
                <option value="BLOQUEADO">Bloqueado</option>
              </select>
            </div>

            {/* Informativo */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h6 className="font-semibold text-blue-900 mb-1">Dicas de Segurança</h6>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use senhas fortes com letras, números e caracteres especiais</li>
                    <li>• Perfil ADMIN tem acesso total ao sistema</li>
                    <li>• Permissões específicas complementam o perfil de acesso</li>
                    <li>• Usuários bloqueados não conseguem fazer login</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
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
              Salvar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsuarioForm;