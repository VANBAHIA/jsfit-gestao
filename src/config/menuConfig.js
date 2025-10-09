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
  Building2
} from 'lucide-react';

/**
 * Configuração da estrutura de menus do sistema
 * Seguindo padrão de academias brasileiras
 */
export const menuConfig = [
  {
    id: 'controle',
    label: 'Controle',
    icon: Users,
    submenus: [
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
        id: 'instrutores',
        label: 'Instrutores',
        icon: GraduationCap,
        rota: '/controle/instrutores',
        descricao: 'Gestão de instrutores e personal trainers'
      }
    ]
  },
  {
    id: 'cadastros',
    label: 'Cadastros',
    icon: FileText,
    submenus: [
      {
        id: 'planos',
        label: 'Planos',
        icon: FileText,
        rota: '/cadastros/planos',
        descricao: 'Cadastro de planos e modalidades'
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