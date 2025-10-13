import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/api/authService';

/**
 * Contexto de Autenticação
 * Gerencia o estado global de autenticação do usuário
 */
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  // Verifica autenticação ao carregar o app
  useEffect(() => {
    verificarAutenticacao();
  }, []);

  /**
   * Verifica se há um usuário autenticado
   */
  const verificarAutenticacao = async () => {
    try {
      const token = authService.getToken();
      console.log('🔑 Token encontrado:', token ? 'SIM' : 'NÃO');
      
      if (token) {
        const usuarioLogado = authService.getUsuarioLogado();
        console.log('👤 Usuário no storage:', usuarioLogado);
        
        // Valida o token no backend
        const tokenValido = await authService.validarToken();
        console.log('✔️ Token válido:', tokenValido);
        
        if (tokenValido && usuarioLogado) {
          setUsuario(usuarioLogado);
          setAutenticado(true);
          console.log('✅ Usuário autenticado:', usuarioLogado.nome);
        } else {
          // Token inválido, faz logout
          console.log('⚠️ Token inválido, fazendo logout');
          authService.logout();
          setUsuario(null);
          setAutenticado(false);
        }
      } else {
        console.log('ℹ️ Nenhum token encontrado');
      }
    } catch (error) {
      console.error('❌ Erro ao verificar autenticação:', error);
      authService.logout();
      setUsuario(null);
      setAutenticado(false);
    } finally {
      setLoading(false);
      console.log('🏁 Verificação de autenticação concluída');
    }
  };

  /**
   * Realiza login
   * @param {Object} credenciais - {nomeUsuario, senha}
   */
  const login = async (credenciais) => {
    try {
      console.log('🔐 Tentando login para:', credenciais.nomeUsuario);
      const resposta = await authService.login(credenciais);
      
      if (resposta.success) {
        setUsuario(resposta.data.usuario);
        setAutenticado(true);
        console.log('✅ Login bem-sucedido:', resposta.data.usuario.nome);
        return { success: true };
      }
      
      console.log('❌ Login falhou');
      return { success: false, message: 'Erro ao fazer login' };
    } catch (error) {
      console.error('❌ Erro no login:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Usuário ou senha incorretos'
      };
    }
  };

  /**
   * Realiza logout
   */
  const logout = () => {
    console.log('🚪 Fazendo logout');
    authService.logout();
    setUsuario(null);
    setAutenticado(false);
  };

  /**
   * Verifica se usuário tem perfil específico
   * @param {string|string[]} perfis
   */
  const temPerfil = (perfis) => {
    return authService.temPerfil(perfis);
  };

  /**
   * Verifica se usuário tem permissão específica
   * @param {string} permissao
   */
  const temPermissao = (permissao) => {
    return authService.temPermissao(permissao);
  };

  /**
   * Verifica se a licença está válida
   */
  const licencaValida = () => {
    return authService.licencaValida();
  };

  /**
   * Atualiza dados do usuário no contexto
   */
  const atualizarUsuario = (dadosAtualizados) => {
    const usuarioAtualizado = { ...usuario, ...dadosAtualizados };
    setUsuario(usuarioAtualizado);
    sessionStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
  };

  const value = {
    usuario,
    autenticado,
    loading,
    login,
    logout,
    temPerfil,
    temPermissao,
    licencaValida,
    atualizarUsuario
  };

  console.log('📦 AuthProvider renderizando com value:', {
    usuario: value.usuario?.nome || 'null',
    autenticado: value.autenticado,
    loading: value.loading
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;