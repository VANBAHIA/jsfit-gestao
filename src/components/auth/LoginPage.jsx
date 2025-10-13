import React, { useState } from 'react';
import { LogIn, User, Lock, Eye, EyeOff, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nomeUsuario: '',
    senha: ''
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const resultado = await login(formData);

      if (!resultado.success) {
        setErro(resultado.message || 'Erro ao fazer login');
      }
      // Se sucesso, o App.jsx vai redirecionar automaticamente
    } catch (error) {
      setErro('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
    setErro('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 flex items-center justify-center p-4">
      {/* Animação de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Card de Login */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JS
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FitGestão</h1>
          <p className="text-blue-100 text-sm">Sistema de Gestão para Academias</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h2>
            <p className="text-gray-600 text-sm">Faça login para acessar o sistema</p>
          </div>

          {/* Mensagem de Erro */}
          {erro && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm text-red-800 font-medium">{erro}</p>
              </div>
            </div>
          )}

          {/* Campo Nome de Usuário */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome de Usuário
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                required
                value={formData.nomeUsuario}
                onChange={(e) => handleChange('nomeUsuario', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Digite seu usuário"
                disabled={loading}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type={mostrarSenha ? 'text' : 'password'}
                required
                value={formData.senha}
                onChange={(e) => handleChange('senha', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Digite sua senha"
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Entrando...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Entrar no Sistema
              </>
            )}
          </button>

          {/* Informações Adicionais */}
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              onClick={() => alert('Entre em contato com o administrador do sistema')}
            >
              Esqueceu sua senha?
            </button>
          </div>
        </form>

        {/* Dicas de Uso */}
        <div className="px-8 pb-8">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <p className="text-xs text-blue-900 font-semibold mb-1">Credenciais Padrão:</p>
                <p className="text-xs text-blue-800">
                  <strong>Usuário:</strong> admin<br />
                  <strong>Senha:</strong> admin123
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t text-center">
          <p className="text-xs text-gray-600">
            © 2024 JSFitGestão - Versão 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;