// src/config/menuConfig.js

import {
  Users,
  UserCheck,
  UserCog,
  GraduationCap,
  FileText,
  Dumbbell,
  Wrench,
  DollarSign,
  CreditCard,
  TrendingUp,
  BarChart3,
  Calendar,
  Settings,
  Building2,
  Briefcase,
  MapPin,
  FolderOpen,
  Percent,
  UserPlus,
  Key
} from 'lucide-react';

/**
 * Configuração da estrutura de menus do sistema com permissões integradas
 * Seguindo padrão de academias brasileiras
 * Suporta 2 níveis: Menu > Submenu > Sub-submenu
 * 
 * Estrutura de Permissões:
 * - permissao: { modulo: 'nome_modulo', acao: 'acao_especifica' }
 * - Se não tiver permissão definida, o item é visível para todos
 */
export const menuConfig = [
  {
    id: 'controle',
    label: 'Controle',
    icon: Users,
    // Menu pai sem permissão - visibilidade baseada nos submenus
    submenus: [
      // === PESSOAS ===
      {
        id: 'alunos',
        label: 'Alunos',
        icon: Users,
        rota: '/controle/alunos',
        descricao: 'Cadastro e controle de alunos',
        permissao: { modulo: 'alunos', acao: 'acessar' }
      },
      {
        id: 'funcionarios',
        label: 'Funcionários',
        icon: UserCheck,
        rota: '/controle/funcionarios',
        descricao: 'Gestão de funcionários da academia',
        permissao: { modulo: 'funcionarios', acao: 'acessar' }
      },
      {
        id: 'matriculas',
        label: 'Matrículas',
        icon: FileText,
        rota: '/controle/matriculas',
        descricao: 'Gestão de matrículas de alunos',
        permissao: { modulo: 'matriculas', acao: 'acessar' }
      },
      {
        id: 'turmas',
        label: 'Turmas',
        icon: Users,
        rota: '/controle/turmas',
        descricao: 'Cadastro e gestão de turmas',
        permissao: { modulo: 'turmas', acao: 'acessar' }
      },
      {
        id: 'frequencia',
        label: 'Frequência',
        icon: Calendar,
        rota: '/controle/frequencia',
        descricao: 'Controle de frequência dos alunos',
        permissao: { modulo: 'frequencia', acao: 'acessar' }
      },
      {
        id: 'visitantes',
        label: 'Visitantes',
        icon: UserPlus,
        rota: '/controle/visitantes',
        descricao: 'Controle de visitantes da academia',
        permissao: { modulo: 'visitantes', acao: 'acessar' }
      },
      {
        id: 'instrutores',
        label: 'Instrutores',
        icon: GraduationCap,
        rota: '/controle/instrutores',
        descricao: 'Gestão de instrutores e personal trainers',
        permissao: { modulo: 'instrutores', acao: 'acessar' }
      },

      // === CADASTROS AUXILIARES (SEGUNDO NÍVEL) ===
      {
        id: 'cadastros-auxiliares',
        label: 'Cadastros Auxiliares',
        icon: FolderOpen,
        hasSubmenus: true,
        // Submenu visível se tiver acesso a pelo menos um item interno
        submenus: [
          {
            id: 'locais',
            label: 'Locais',
            icon: MapPin,
            rota: '/cadastros/locais',
            descricao: 'Cadastro de locais e espaços da academia',
            permissao: { modulo: 'locais', acao: 'acessar' }
          },
          {
            id: 'funcoes',
            label: 'Funções',
            icon: Briefcase,
            rota: '/cadastros/funcoes',
            descricao: 'Cadastro de funções e cargos',
            permissao: { modulo: 'funcoes', acao: 'acessar' }
          },
          {
            id: 'planos',
            label: 'Planos',
            icon: FileText,
            rota: '/cadastros/planos',
            descricao: 'Cadastro de planos e modalidades',
            permissao: { modulo: 'planos', acao: 'acessar' }
          },
          {
            id: 'descontos',
            label: 'Descontos',
            icon: Percent,
            rota: '/cadastros/descontos',
            descricao: 'Cadastro de descontos e promoções',
            permissao: { modulo: 'descontos', acao: 'acessar' }
          },
          {
            id: 'modalidades',
            label: 'Modalidades',
            icon: Dumbbell,
            rota: '/cadastros/modalidades',
            descricao: 'Tipos de atividades oferecidas',
            permissao: { modulo: 'modalidades', acao: 'acessar' }
          },
          {
            id: 'equipamentos',
            label: 'Equipamentos',
            icon: Wrench,
            rota: '/cadastros/equipamentos',
            descricao: 'Controle de equipamentos da academia',
            permissao: { modulo: 'equipamentos', acao: 'acessar' }
          }
        ]
      }
    ]
  },
  
  {
    id: 'financeiro',
    label: 'Financeiro',
    icon: DollarSign,
    submenus: [
      {
        id: 'mensalidades',
        label: 'Mensalidades',
        icon: CreditCard,
        rota: '/financeiro/mensalidades',
        descricao: 'Controle de pagamentos de alunos',
        permissao: { modulo: 'mensalidades', acao: 'acessar' }
      },
      {
        id: 'contas-receber',
        label: 'Contas a Receber',
        icon: DollarSign,
        rota: '/financeiro/contas-receber',
        descricao: 'Receitas e recebimentos',
        permissao: { modulo: 'contasReceber', acao: 'acessar' }
      },
      {
        id: 'contas-pagar',
        label: 'Contas a Pagar',
        icon: TrendingUp,
        rota: '/financeiro/contas-pagar',
        descricao: 'Despesas e fornecedores',
        permissao: { modulo: 'contasPagar', acao: 'acessar' }
      },
      {
        id: 'caixa',
        label: 'Controle de Caixa',
        icon: CreditCard,
        rota: '/financeiro/caixa',
        descricao: 'Abertura, fechamento e movimentações',
        permissao: { modulo: 'caixa', acao: 'acessar' }
      }
    ]
  },
  
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: BarChart3,
    submenus: [
      {
        id: 'frequencia-relatorio',
        label: 'Frequência',
        icon: Calendar,
        rota: '/relatorios/frequencia',
        descricao: 'Relatório de frequência de alunos',
        permissao: { modulo: 'relatorioFrequencia', acao: 'acessar' }
      },
      {
        id: 'financeiro-relatorio',
        label: 'Financeiro',
        icon: BarChart3,
        rota: '/relatorios/financeiro',
        descricao: 'Relatórios financeiros e dashboards',
        permissao: { modulo: 'relatorioFinanceiro', acao: 'acessar' }
      }
    ]
  },
  
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    submenus: [
      {
        id: 'dados-academia',
        label: 'Dados da Academia',
        icon: Building2,
        rota: '/configuracoes/empresa',
        descricao: 'Informações cadastrais da academia',
        permissao: { modulo: 'dadosAcademia', acao: 'acessar' }
      },
      {
        id: 'usuarios',
        label: 'Usuários do Sistema',
        icon: UserCog,
        rota: '/configuracoes/usuarios',
        descricao: 'Gestão de usuários e permissões',
        permissao: { modulo: 'usuarios', acao: 'acessar' }
      },
      {
        id: 'licencas',
        label: 'Controle de Licenças',
        icon: Key,
        rota: '/configuracoes/licencas',
        descricao: 'Gestão de licenças do sistema',
        permissao: { modulo: 'licencas', acao: 'acessar' }
      },
      {
        id: 'sistema',
        label: 'Sistema',
        icon: Settings,
        rota: '/configuracoes/sistema',
        descricao: 'Configurações gerais do sistema',
        permissao: { modulo: 'sistema', acao: 'acessar' }
      }
    ]
  }
];

/**
 * Função para filtrar menus baseado nas permissões do usuário
 * @param {Array} menus - Array de menus
 * @param {Function} verificarPermissao - Função para verificar permissão (temPermissao)
 * @returns {Array} Menus filtrados
 */
export const filtrarMenusPorPermissao = (menus, verificarPermissao) => {
  return menus
    .map(menu => {
      // Filtrar submenus
      const submenusPermitidos = menu.submenus
        .filter(submenu => {
          // Se não tem permissão definida, mostra para todos
          if (!submenu.permissao) return true;
          
          // Se tem submenus (segundo nível)
          if (submenu.hasSubmenus && submenu.submenus) {
            // Verifica se tem pelo menos um sub-submenu permitido
            const subSubmenusPermitidos = submenu.submenus.filter(subSub => {
              if (!subSub.permissao) return true;
              return verificarPermissao(subSub.permissao.modulo, subSub.permissao.acao);
            });
            return subSubmenusPermitidos.length > 0;
          }
          
          // Verifica permissão do submenu
          return verificarPermissao(submenu.permissao.modulo, submenu.permissao.acao);
        })
        .map(submenu => {
          // Se tem submenus (segundo nível), filtra eles também
          if (submenu.hasSubmenus && submenu.submenus) {
            return {
              ...submenu,
              submenus: submenu.submenus.filter(subSub => {
                if (!subSub.permissao) return true;
                return verificarPermissao(subSub.permissao.modulo, subSub.permissao.acao);
              })
            };
          }
          return submenu;
        });

      return {
        ...menu,
        submenus: submenusPermitidos
      };
    })
    // Remove menus que ficaram sem submenus
    .filter(menu => menu.submenus.length > 0);
};

/**
 * Mapeamento de IDs de submenu para nome do módulo de permissão
 * Útil para verificações rápidas
 */
export const MAPA_SUBMENU_MODULO = {
  'alunos': 'alunos',
  'funcionarios': 'funcionarios',
  'matriculas': 'matriculas',
  'turmas': 'turmas',
  'frequencia': 'frequencia',
  'visitantes': 'visitantes',
  'instrutores': 'instrutores',
  'locais': 'locais',
  'funcoes': 'funcoes',
  'planos': 'planos',
  'descontos': 'descontos',
  'modalidades': 'modalidades',
  'equipamentos': 'equipamentos',
  'mensalidades': 'mensalidades',
  'contas-receber': 'contasReceber',
  'contas-pagar': 'contasPagar',
  'caixa': 'caixa',
  'frequencia-relatorio': 'relatorioFrequencia',
  'financeiro-relatorio': 'relatorioFinanceiro',
  'dados-academia': 'dadosAcademia',
  'usuarios': 'usuarios',
  'licencas': 'licencas',
  'sistema': 'sistema'
};

export default menuConfig;