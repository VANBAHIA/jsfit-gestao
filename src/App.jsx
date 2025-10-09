import React, { useState } from 'react';
import { X, ChevronDown, Clock } from 'lucide-react';
import { menuConfig } from './config/menuConfig';
import { useClock } from './hooks/useClock';
import { useTabs } from './hooks/useTabs';
import Alunos from './pages/Controle/Alunos/Alunos';

function App() {
  const [openMenus, setOpenMenus] = useState({});
  const { date, time, dayOfWeek } = useClock();
  const { activeTab, openTabs, openTab, closeTab, setActiveTab } = useTabs();

  /**
   * Alterna a visibilidade do dropdown de um menu
   */
  const toggleMenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  /**
   * Abre uma nova aba ao clicar em um submenu
   */
  const handleSubmenuClick = (menu, submenu) => {
    openTab({
      menuId: menu.id,
      submenuId: submenu.id,
      label: submenu.label,
      icon: submenu.icon,
      descricao: submenu.descricao
    });
    toggleMenu(menu.id);
  };

  /**
   * Renderiza o conteúdo de uma aba
   */
  const renderTabContent = (tab) => {
    const IconComponent = tab.icon;
  
  // Se for a aba de Alunos, renderiza o componente específico
  if (tab.submenuId === 'alunos') {
    return <Alunos />;
  }
    
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <IconComponent className="text-blue-600" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{tab.label}</h2>
              <p className="text-gray-600 text-sm">{tab.descricao}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                📋 Módulo em Desenvolvimento
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Este módulo está preparado para receber as funcionalidades de <strong>{tab.label}</strong>.
                A estrutura de pastas e componentes já está criada seguindo as boas práticas.
              </p>
            </div>

            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Recursos Planejados</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Formulários de cadastro completos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Tabelas com paginação e filtros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Validação de dados em tempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Exportação para Excel e PDF</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
              ➕ Novo Cadastro
            </button>
            <button className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              🔍 Pesquisar
            </button>
            <button className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              📊 Relatórios
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header Principal */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-2xl shadow-md">
              JS
            </div>
            <div>
              <h1 className="text-2xl font-bold">FitGestão</h1>
              <p className="text-blue-100 text-sm">Sistema de Gestão para Academias</p>
            </div>
          </div>
          
          {/* Relógio com Data e Hora */}
          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
            <div className="flex items-center gap-3">
              <Clock size={24} />
              <div className="text-right">
                <div className="font-bold text-lg">{time}</div>
                <div className="text-xs text-blue-100 capitalize">
                  {dayOfWeek}, {date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de Menu Horizontal */}
      <nav className="bg-white border-b shadow-sm">
        <div className="flex items-center px-6 py-2">
          {menuConfig.map((menu) => {
            const MenuIcon = menu.icon;
            return (
              <div key={menu.id} className="relative">
                <button
                  onClick={() => toggleMenu(menu.id)}
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium"
                >
                  <MenuIcon size={18} />
                  {menu.label}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${openMenus[menu.id] ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Dropdown do Menu */}
                {openMenus[menu.id] && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[220px]">
                    {menu.submenus.map((submenu) => {
                      const SubmenuIcon = submenu.icon;
                      return (
                        <button
                          key={submenu.id}
                          onClick={() => handleSubmenuClick(menu, submenu)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left text-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          <SubmenuIcon size={16} className="text-gray-500" />
                          <span>{submenu.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sistema de Abas */}
        {openTabs.length > 0 && (
          <div className="flex items-center px-6 border-t bg-gray-50 overflow-x-auto">
            {openTabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 border-r border-gray-200 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 font-semibold border-t-2 border-t-blue-600 -mt-[2px]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <TabIcon size={16} />
                    <span className="text-sm">{tab.label}</span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          closeTab(tab.id);
                        }}
                        className="ml-2 hover:bg-red-100 rounded p-1 transition-colors cursor-pointer"
                        title="Fechar aba"
                        role="button"
                      >
                        <X size={14} />
                      </span>
                    </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {activeTab ? (
          renderTabContent(openTabs.find(tab => tab.id === activeTab))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🏋️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Bem-vindo ao JSFitGestão
              </h2>
              <p className="text-gray-600 mb-6">
                Selecione um módulo no menu acima para começar a gerenciar sua academia
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="font-semibold text-blue-600 mb-1">📊 Dashboard</div>
                  <div className="text-gray-600">Visão geral</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="font-semibold text-green-600 mb-1">👥 Alunos</div>
                  <div className="text-gray-600">Gestão completa</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="font-semibold text-purple-600 mb-1">💰 Financeiro</div>
                  <div className="text-gray-600">Controle total</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="font-semibold text-orange-600 mb-1">📈 Relatórios</div>
                  <div className="text-gray-600">Análises</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white px-6 py-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>© 2024 JSFitGestão v1.0.0</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">Sistema de Gestão para Academias</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-blue-300 transition-colors">
              🛠️ Ferramentas
            </button>
            <button className="hover:text-blue-300 transition-colors">
              📦 Módulos
            </button>
            <button className="hover:text-blue-300 transition-colors">
              🏠 Início
            </button>
            <button className="hover:text-red-300 transition-colors">
              🚪 Sair
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;