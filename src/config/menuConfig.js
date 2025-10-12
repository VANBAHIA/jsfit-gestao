import {
  Users,
  UserCheck,
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
  Percent
} from 'lucide-react';

/**
 * Configuração da estrutura de menus do sistema
 * Seguindo padrão de academias brasileiras
 * Suporta 2 níveis: Menu > Submenu > Sub-submenu
 */
export const menuConfig = [
  {
    id: 'controle',
    label: 'Controle',
    icon: Users,
    submenus: [
      // === PESSOAS ===
      {
        id: 'funcionarios',
        label: 'Funcionários',
        icon: UserCheck,
        rota: '/controle/funcionarios',
        descricao: 'Gestão de funcionários da academia'
      },
      {
        id: 'alunos',
        label: 'Alunos',
        icon: Users,
        rota: '/controle/alunos',
        descricao: 'Cadastro e controle de alunos'
      },
      {
        id: 'matriculas',
        label: 'Matrículas',
        icon: FileText,  // ← Já importado no topo
        rota: '/controle/matriculas',
        descricao: 'Gestão de matrículas de alunos'
      },
      {
        id: 'turmas',
        label: 'Turmas',
        icon: Users,
        descricao: 'Cadastro e gestão de turmas'
      },

      {
        id: 'instrutores',
        label: 'Instrutores',
        icon: GraduationCap,
        rota: '/controle/instrutores',
        descricao: 'Gestão de instrutores e personal trainers'
      },

      // === CADASTROS AUXILIARES (SEGUNDO NÍVEL) ===
      {
        id: 'cadastros-auxiliares',
        label: 'Cadastros Auxiliares',
        icon: FolderOpen,
        hasSubmenus: true,
        submenus: [
          {
            id: 'locais',
            label: 'Empresas - Locais',
            icon: MapPin,
            rota: '/cadastros/locais',
            descricao: 'Cadastro de locais e espaços da academia'
          },
          {
            id: 'funcoes',
            label: 'Funções',
            icon: Briefcase,
            rota: '/cadastros/funcoes',
            descricao: 'Cadastro de funções e cargos'
          },
          {
            id: 'planos',
            label: 'Planos',
            icon: FileText,
            rota: '/cadastros/planos',
            descricao: 'Cadastro de planos e modalidades'
          },
          {
            id: 'descontos',
            label: 'Descontos',
            icon: Percent,
            rota: '/cadastros/descontos',
            descricao: 'Cadastro de descontos e promoções'
          },
          {
            id: 'modalidades',
            label: 'Modalidades',
            icon: Dumbbell,
            rota: '/cadastros/modalidades',
            descricao: 'Tipos de atividades oferecidas'
          },
          {
            id: 'equipamentos',
            label: 'Equipamentos',
            icon: Wrench,
            rota: '/cadastros/equipamentos',
            descricao: 'Controle de equipamentos da academia'
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
        descricao: 'Controle de pagamentos de alunos'
      },
      {
        id: 'contas-pagar',
        label: 'Contas a Pagar',
        icon: TrendingUp,
        rota: '/financeiro/contas-pagar',
        descricao: 'Despesas e fornecedores'
      },
      {
        id: 'contas-receber',
        label: 'Contas a Receber',
        icon: DollarSign,
        rota: '/financeiro/contas-receber',
        descricao: 'Receitas e recebimentos'
      },
      {
      id: 'caixa',  // ✅ Adicionar este item
      label: 'Controle de Caixa',
      icon: CreditCard,
      rota: '/financeiro/caixa',
      descricao: 'Abertura, fechamento e movimentações'
    }
    ]
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: BarChart3,
    submenus: [
      {
        id: 'frequencia',
        label: 'Frequência',
        icon: Calendar,
        rota: '/relatorios/frequencia',
        descricao: 'Relatório de frequência de alunos'
      },
      {
        id: 'financeiro',
        label: 'Financeiro',
        icon: BarChart3,
        rota: '/relatorios/financeiro',
        descricao: 'Relatórios financeiros e dashboards'
      }
    ]
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    submenus: [
      {
        id: 'academia',
        label: 'Dados da Academia',
        icon: Building2,
        rota: '/configuracoes/academia',
        descricao: 'Informações da academia'
      },
      {
        id: 'sistema',
        label: 'Sistema',
        icon: Settings,
        rota: '/configuracoes/sistema',
        descricao: 'Configurações gerais do sistema'
      }
    ]
  }
];